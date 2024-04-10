import { remark } from "remark";
import html from "remark-html";

export default async function markdownToHtml(markdown: string) {
  // TODO: enable html in markdown
  const result = await remark().use(html).process(markdown);
  return result.toString();
}
