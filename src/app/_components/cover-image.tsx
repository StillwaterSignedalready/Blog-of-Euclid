import cn from "classnames";
import type { RefObject } from 'react'
import Link from "next/link";
import Image from "next/image";
import { CSSRuleObject } from "tailwindcss/types/config";

type Props = {
  title: string;
  src: string;
  slug?: string;
  style?: CSSRuleObject;
  rootRef?: RefObject<HTMLImageElement>;
};

const CoverImage = ({ title, src, slug, style, rootRef }: Props) => {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn("shadow-sm w-full", {
        "hover:shadow-lg transition-shadow duration-200": slug,
      })}
      width={1300}
      height={630}
    />
  );

  return (
    <div className="sm:mx-0" style={style} ref={rootRef}>
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]" aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
