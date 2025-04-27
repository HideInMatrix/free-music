import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";




import { useNavigate } from "react-router-dom";


export function SearchCommand() {


  const navigate = useNavigate();


  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="lg:mr-4 ml-1"
        onClick={() => navigate('/search')}>
        <Search />
      </Button>

    </>
  );
}
