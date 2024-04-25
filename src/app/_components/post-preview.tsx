import Link from "next/link";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { ISearchParams } from '@/interfaces/common'

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  id: string;
  searchParams: ISearchParams;
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  id,
  searchParams,
}: Props) {
  return (
    <div>
      <div className="mb-5 overflow-hidden" style={{ height: 214 }}>
        <CoverImage searchParams={searchParams} id={id} title={title} src={coverImage} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link
          as={`/posts/${id}?lan=${searchParams.lan}`}
          href="/posts/[id]"
          className="hover:underline"
        >
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
    </div>
  );
}
