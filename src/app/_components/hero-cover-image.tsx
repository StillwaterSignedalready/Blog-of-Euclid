import CoverImage from "@/app/_components/cover-image";
import { ISearchParams } from '@/interfaces/common'
import useImgCursorOffset from '@/lib/useImgCursorOffset'
import { type RefObject } from 'react'


interface IProps {
  searchParams: ISearchParams;
  title: string;
  src: string;
  id: string;
}

export function HeroCoverImage({ searchParams, title, src, id }: IProps) {
  const [offset, imgContainerRef, imgRef] = useImgCursorOffset(3, -150);
  return (
    <div className="mb-8 md:mb-16 overflow-hidden" style={{ maxHeight: 400 }} ref={imgContainerRef}>
      <CoverImage searchParams={searchParams} rootRef={imgRef as RefObject<HTMLImageElement>} title={title} src={src} id={id} style={{ transform: `translate(0, ${offset}px)` }} />
    </div>
  )
}