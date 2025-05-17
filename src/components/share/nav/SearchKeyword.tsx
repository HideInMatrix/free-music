import { Input } from "@/components/ui/input";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const SearchKeyword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [inputValue, setInputValue] = useState(searchParams.get("keyword") || "");
  const [isComposing, setIsComposing] = useState(false);

  // 当 URL 参数变化时更新输入框值
  useEffect(() => {
    setInputValue(searchParams.get("keyword") || "");
  }, [searchParams]);

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("keyword", value);
    } else {
      params.delete("keyword");
    }
    navigate(`${pathname}?${params.toString()}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    // 只有在不是中文输入状态时才触发搜索
    if (!isComposing) {
      handleSearch(value);
    }
  };

  // 开始中文输入
  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  // 结束中文输入
  const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    setIsComposing(false);
    // 中文输入完成后触发一次搜索
    handleSearch((e.target as HTMLInputElement).value);
  };

  return (
    <>
      {pathname.startsWith("/search") ? (
        <div className="ml-2">
          <Input
            onChange={handleInputChange}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            value={inputValue}
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
