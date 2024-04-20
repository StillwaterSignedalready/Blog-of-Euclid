import { useEffect, useRef, useState } from 'react'
import type { LegacyRef } from 'react'
import { throttle } from 'lodash';

function isContentOutWrapper(wrapper: HTMLElement, content: HTMLElement, offset: number, start: number = 0): boolean {
  const wrapperClientTop = wrapper.offsetTop
  const contentClientTop = content.offsetTop
  if (offset > 0) return start + content.clientTop + offset > wrapper.clientTop
  const wrapperBottom = wrapperClientTop + wrapper.clientHeight
  const contentBottom = contentClientTop + content.clientHeight
  return start + contentBottom + offset < wrapperBottom
}

function useImgCursorOffset(offsetFactor: number, start: number): [number, LegacyRef<HTMLDivElement>, LegacyRef<HTMLElement>] {
  const imgContainerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLElement>(null)
  const isCursorInImgContainer = useRef<boolean>(false)
  const shouldFirstClientYSet = useRef<boolean>(false)
  const originY = useRef<number|null>(null)
  const [offset, setOffset] = useState<number>(start)

  // TODO: 二维移动

  useEffect(() => {
    const imgContainer = imgContainerRef.current;
    const enterHandler = () => {
      isCursorInImgContainer.current = true
      shouldFirstClientYSet.current = true
    }
    const leaveHandler = () => {
      // 清空y坐标
      isCursorInImgContainer.current = false
      setOffset(start)
    }
    const moveHandler = throttle((event: MouseEvent) => {
      if (isCursorInImgContainer.current) {
        const { clientY } = event;

        // if 初次进入 then 记录 orginY
        if (shouldFirstClientYSet.current) {
          originY.current = clientY
          shouldFirstClientYSet.current = false
        } else {
          const result = (Number(originY.current) - clientY) / offsetFactor;
          if (imgContainer && imgRef.current && isContentOutWrapper(imgContainer, imgRef.current, result, start)) return
          setOffset(result + start)
        }
        // clientY - originY -> offset
      }
    }, 100)
    if (imgContainer) {
      imgContainer.addEventListener('mouseenter', enterHandler)
      imgContainer.addEventListener('mousemove', moveHandler)
      imgContainer.addEventListener('mouseleave', leaveHandler)
      return () => {
        imgContainer.removeEventListener('mouseenter', enterHandler)
        imgContainer.removeEventListener('mousemove', moveHandler)
        imgContainer.removeEventListener('mouseleave', leaveHandler)
      }
    }
    
    
  }, [])

  return [offset, imgContainerRef, imgRef]
}


export default useImgCursorOffset;