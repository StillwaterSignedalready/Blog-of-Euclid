import Link from "next/link";
import { ISearchParams } from '@/interfaces/common'

const Header = ({ searchParams }: { searchParams: ISearchParams }) => {
  return (
    <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
      <Link href={`/?lan=${searchParams.lan}`} className="hover:underline">
        Blog
        <span className="text-slate-200">{` <-`}</span>
      </Link>
    </h2>
  );
};

export default Header;
