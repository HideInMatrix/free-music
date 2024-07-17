import { CarouselPlugin } from "./_components/production-carousel";
import "./globals.css";
export default function Page() {
  return (
    <div className="h-full w-full flex flex-col">
      <CarouselPlugin></CarouselPlugin>
    </div>
  );
}
