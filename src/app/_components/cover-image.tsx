import cn from "classnames";
import type { RefObject } from 'react'
import Link from "next/link";
import Image from "next/image";
import { CSSRuleObject } from "tailwindcss/types/config";
import { ISearchParams } from '@/interfaces/common'

type Props = {
  title: string;
  src: string;
  id?: string;
  style?: CSSRuleObject;
  rootRef?: RefObject<HTMLImageElement>;
  searchParams: ISearchParams;
};

const CoverImage = ({ title, src, id, style, rootRef, searchParams }: Props) => {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn("shadow-sm w-full", {
        "hover:shadow-lg transition-shadow duration-200": id,
      })}
      width={1300}
      height={630}
    />
  );

  return (
    <div className="sm:mx-0" style={style} ref={rootRef}>
      {id ? (
        <Link as={`/posts/${id}?lan=${searchParams.lan}`} href="/posts/[id]" aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
