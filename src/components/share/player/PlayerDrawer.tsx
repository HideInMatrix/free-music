import { cn } from "@/lib/utils";
import { CircleX } from "lucide-react";

interface PlayerDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const PlayerDrawer = ({ isOpen, onClose, children }: PlayerDrawerProps) => {
    return (
        <div
            className={cn(
                "fixed inset-x-0 bottom-0 z-50 transform transition-transform duration-300 ease-in-out w-screen h-screen flex flex-col",
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
            <div className="relative bg-background border-t border-border mt-auto max-h-[80vh]">
                {/* 抽屉头部 */}
                <div className="flex items-center justify-between px-4 py-2 border-b">
                    <h3 className="text-lg font-medium">正在播放</h3>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 hover:bg-accent"
                    >
                        <CircleX />
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