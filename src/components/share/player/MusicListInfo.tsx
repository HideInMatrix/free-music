import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const MusicListInfo = () => {
  return (
    <div className="flex items-center">
      <span>共8首</span>
      <Button variant="ghost" size="icon" className="ml-auto">
        <MapPin size={18} />
      </Button>
      <Button variant="ghost">清空列表</Button>
    </div>
  );
};

export default MusicListInfo;
