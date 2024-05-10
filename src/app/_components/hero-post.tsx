'use client'
import { useEffect, useState } from 'react'
import Link from "next/link";
import DateFormatter from "./date-formatter";
import { ISearchParams } from '@/interfaces/common'
import { PostSkeleton } from '@/app/_components/skeleton'
import { HeroCoverImage } from './hero-cover-image'

type IProps = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  slug: string;
  searchParams: ISearchParams
};

export function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  slug,
  searchParams,
}: IProps) {
  const [showImg, setShowImg] = useState(false)
  useEffect(() => {
    setShowImg(true)    
  }, [])
  
  if (!showImg) return <PostSkeleton />
  
  return (
    <section>
      <HeroCoverImage searchParams={searchParams} title={title} src={coverImage} id={slug} />
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
            <Link
              as={`/posts/${slug}?lan=${searchParams.lan}`}
              href="/posts/[slug]"
              className="hover:underline"
            >
              {title}
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <DateFormatter dateString={date} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          {/* <Avatar name={author.name} picture={author.picture} /> */}
        </div>
      </div>
    </section>
  );
}
