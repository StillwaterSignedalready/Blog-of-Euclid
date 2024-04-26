import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import { ISearchParams } from '@/interfaces/common'

type IProps = {
  title: string;
  coverImage: string;
  date: string;
  searchParams: ISearchParams
};

export function PostHeader({ title, coverImage, date, searchParams }: IProps) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        {/* <Avatar name={author.name} picture={author.picture} /> */}
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0 overflow-hidden" style={{ maxHeight: 400 }}>
        <CoverImage searchParams={searchParams} title={title} src={coverImage} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          {/* <Avatar name={author.name} picture={author.picture} /> */}
        </div>
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  );
}
