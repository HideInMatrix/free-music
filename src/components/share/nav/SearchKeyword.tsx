"use client";
import { Input } from "@/components/ui/input";
import { debounce } from "@/lib/utils";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";

const SearchKeyword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleSearch = debounce((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("keyword", value);
    } else {
      params.delete("keyword");
    }

    navigate(`${pathname}?${params.toString()}`);
  }, 250);

  return (
    <>
      {pathname.startsWith("/search") ? (
        <div className="ml-2">
          <Input
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            defaultValue={searchParams.get("keyword")?.toString()}
            name="searchValue"
            placeholder="关键字"
            className="focus-visible:ring-0 focus-visible:ring-offset-0 border-white w-20"
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default SearchKeyword;
