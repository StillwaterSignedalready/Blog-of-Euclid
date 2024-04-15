'use client'
import CoverImage from "@/app/_components/cover-image";
import type { RefObject } from 'react'
import Link from "next/link";
import DateFormatter from "./date-formatter";
import useImgCursorOffset from '@/lib/useImgCursorOffset'
import { transform } from "lodash";


type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  slug: string;
};

export function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  slug,
}: Props) {
  const [offset, imgContainerRef, imgRef] = useImgCursorOffset(3, -150);

  return (
    <section>
      <div className="mb-8 md:mb-16 overflow-hidden" style={{ maxHeight: 400 }} ref={imgContainerRef}>
        <CoverImage rootRef={imgRef as RefObject<HTMLImageElement>} title={title} src={coverImage} slug={slug} style={{ transform: `translate(0, ${offset}px)` }} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
            <Link
              as={`/posts/${slug}`}
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
