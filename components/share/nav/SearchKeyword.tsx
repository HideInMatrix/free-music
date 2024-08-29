"use client";
import { Input } from "@/components/ui/input";
import { debounce } from "@/lib/utils";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

type Props = {};

const SearchKeyword = (props: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = debounce((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("keyword", value);
    } else {
      params.delete("keyword");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 250);
  return (
    <div className="m-2 ml-auto">
      <Input
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("keyword")?.toString()}
        name="searchValue"
        placeholder="关键字"
        className="focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
};

export default SearchKeyword;
