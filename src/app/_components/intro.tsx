'use client'
import { Button, Modal, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import { LanguageIcon } from '@/app/_components/icons'
import { ISearchParams, LanEnum } from '@/interfaces/common'

interface IProps {
  searchParams: ISearchParams;
}

export function Intro({ searchParams }: IProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const onSwitchLanBtnClick = () => {
    const currentUrl = new URL(location.href)
    const currentLanIsCn = currentUrl.searchParams.get('lan') === 'cn'
    currentUrl.searchParams.set('lan', currentLanIsCn ? 'en' : 'cn')
    window.open(String(currentUrl), '_blank')
  }

  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-6 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        <img src="/assets/blog/authors/wayne.jpg" className="w-24 h-24 rounded-full mr-4 inline" />
        Wayne's Blog
      </h1>
      <div className="flex-1 h-full text-right">
        <Button isIconOnly onClick={onSwitchLanBtnClick} variant="light" className="relative top-1">
          <LanguageIcon />
        </Button>
        <Button onClick={onOpen} variant="light">
          {searchParams.lan === LanEnum.CN ? '关于' : 'About'}
        </Button>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          {searchParams.lan === LanEnum.CN ?
            <>
              <ModalHeader className="flex flex-col gap-1">关于我</ModalHeader>
              <div className="px-6 pb-6">
                <p>邮箱: doublecross@yeah.net</p>
                <p>微信: dwmzjgt</p>
              </div>
            </>:
            <>
              <ModalHeader className="flex flex-col gap-1">About Me</ModalHeader>
              <div className="px-6 pb-6">
                <ul>
                  <li>
                    With over 5 years of experience, I've designed and developed products for several mid-sized companies.
                  </li>
                  <li>
                    I meet deadlines, suggest innovative ideas to improve projects and keep up to date with the latest trends and technologies.
                  </li>
                  <li>
                    My character is very steady, patient and good at communication.
                  </li>
                  <li>
                    I dare to face challenges, enjoy overcoming difficulties, and have a strong sense of responsibility.
                  </li>
                </ul>
                My technical skills include:
                <div>☑️ JavaScript, TypeScript</div>
                <div>☑️ React, Redux</div>
                <div>☑️ Next.js</div>
                <div>☑️ Linux</div>
                <div>☑️ Mysql</div>
                <div>☑️ Golang, Gin</div>
                <div>☑️ Git, GitHub, Gitlab</div>
                <div>☑️ HTML, CSS</div>
                <div>☑️ CSS Preprocessors</div>
                <div>☑️ And much more</div>
                🤝 If you're interested in connecting or discussing potential projects, please feel free to reach out to me ✉️waynediamond339@gmail.com
              </div>
            </>}
        </ModalContent>
      </Modal>
    </section>
  );
}
