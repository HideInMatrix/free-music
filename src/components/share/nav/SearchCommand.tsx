import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate,useSearchParams } from "react-router-dom";


export function SearchCommand() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const type = searchParams.get("type") || "songs";
  const handleSearch = () => {
    navigate(`/search/${type}?keyword=${keyword}&type=${type}`);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="lg:mr-4 ml-1"
        onClick={handleSearch}>
        <Search />
      </Button>
    </>
  );
}
