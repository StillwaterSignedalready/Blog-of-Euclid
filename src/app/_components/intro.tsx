import Avatar from "@/app/_components/avatar";
import { CMS_NAME } from "@/lib/constants";

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
      <img src="/assets/blog/authors/wayne.jpg" className="w-24 h-24 rounded-full mr-4 inline" />
      Wayne's Blog
      </h1>
    </section>
  );
}
