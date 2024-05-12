const { db } = require('@vercel/postgres');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path')
const matter = require('gray-matter');

// 指定加载 .env.development.local 文件
dotenv.config({ path: '.env.development.local' });

const postsDirectory = path.join(process.cwd(), "_posts");

function getPostSlugs() {
  return fs.readdirSync(postsDirectory).filter(str => str.slice(-6) != '.cn.md');
}

function getPostBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const cnFullPath = path.join(postsDirectory, `${realSlug}.cn.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const cnFileContents = fs.readFileSync(cnFullPath, "utf8");

  const { data, content } = matter(fileContents);
  const { data: cnData, content: contentCn } = matter(cnFileContents);
  return {
    data: { ...data, titleCn: cnData.title, excerptCn: cnData.excerpt },
    slug: realSlug, content, contentCn
  };
}

function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
  return posts;
}

async function seedArticles(client) {
  try {
    // await client.sql`DROP TABLE IF EXISTS Articles;`

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS Articles (
        id SERIAL PRIMARY KEY,
        title_cn TEXT,
        title_en TEXT NOT NULL,
        excerpt_cn TEXT,
        excerpt_en TEXT NOT NULL,
        content_cn TEXT,
        content_en TEXT NOT NULL,
        cover_image VARCHAR(80),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log(`Created "articles" table`);

    /** @type {{title: string, excerpt: string, coverImage: string, date: string, author: string, ogImage: string, slug: string, content: string}[]} */
    const allPosts = []
    // TODO: 判断已存在的 title 不 insert
    // const allPosts = getAllPosts()

    const insertedPosts = await Promise.all(
      allPosts.map(
        ({ data: { title, excerpt, coverImage, date, titleCn, excerptCn }, content, contentCn }) => client.sql`
        INSERT INTO Articles (title_en, excerpt_en, content_en, title_cn, excerpt_cn, content_cn, cover_image, created_at)
        VALUES (${title}, ${excerpt}, ${content}, ${titleCn}, ${excerptCn}, ${contentCn}, ${coverImage}, ${date});
      `,
      ),
    );

    console.log(`Seeded ${insertedPosts.length} post`);
    return {
      createTable,
      insertedPosts
    };
  } catch (error) {
    console.error('Error seeding articles:', error);
    throw error;
  }
}

async function seedComments(client) {
  // await client.sql`DROP TABLE IF EXISTS Comments;`
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS Comments (
        id SERIAL PRIMARY KEY,
        article_id INTEGER REFERENCES Articles(id),
        article_title_en TEXT,
        user_name VARCHAR(20),
        user_email VARCHAR(50),
        user_image VARCHAR(80),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log(`Created "comments" table`);
    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding comments:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedArticles(client);
  await seedComments(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
