import { cn } from "@/lib/utils";

interface PlayerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const PlayerDrawer = ({ isOpen, onClose, children }: PlayerDrawerProps) => {
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-y-0" : "translate-y-full"
      )}
    >
      {/* 遮罩层 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 transition-opacity"
          onClick={onClose}
        />
      )}
      
      {/* 抽屉内容 */}
      <div className="relative bg-background border-t border-border">
        {/* 抽屉头部 */}
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <h3 className="text-lg font-medium">正在播放</h3>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-accent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="m18 6-12 12" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* 播放器容器 */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PlayerDrawer;