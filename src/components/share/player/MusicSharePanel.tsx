import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Song } from "@/entity/interface/song";
import { QrCode, Copy } from "lucide-react";
import { isMobile } from "@/lib/utils";
import { useCopyToClipboard } from "@/utils/clipboard";

type MusicSharePanelProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  songInfo: Song;
};

export default function MusicSharePanel({ isOpen, onOpenChange, songInfo }: MusicSharePanelProps) {
  const { copy } = useCopyToClipboard();
  const [activeTab, setActiveTab] = useState<"wechat" | "qq" | "url">(isMobile() ? "wechat" : "url");
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  
  useEffect(() => {
    setIsMobileDevice(isMobile());
  }, []);
  
  const shareUrl = `${location.origin}/share/song/${songInfo?.id}`;
  
  const copyShareUrl = () => {
    copy(shareUrl, {
      successTitle: "链接已复制",
      successDescription: "分享链接已复制到剪贴板",
      errorTitle: "复制失败",
      errorDescription: "请手动复制链接"
    });
  };

  
  const shareToWechat = () => {
    if (isMobileDevice) {
      // 微信分享链接格式
      const wechatShareUrl = `weixin://dl/posts?link=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(songInfo?.name || '分享歌曲')}`;
      copyShareUrl();
      window.location.href = wechatShareUrl;
    }
  };
  
  const shareToQQ = () => {
    if (isMobileDevice) {
      // QQ分享链接格式 - 更新参数确保内容显示在聊天记录中
      const qqShareUrl = `mqqapi://share/to_fri?src_type=web&version=1&file_type=news&title=${encodeURIComponent(songInfo?.name || '分享歌曲')}&desc=${encodeURIComponent(`来自自由音乐的分享，点击收听：${songInfo?.name}`)}&url=${encodeURIComponent(shareUrl)}&image_url=${encodeURIComponent(songInfo?.image || '')}&app_name=${encodeURIComponent('自由音乐')}`;
      window.location.href = qqShareUrl;
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>分享歌曲</DrawerTitle>
          <DrawerDescription>
            将 {songInfo?.name} 分享给你的朋友
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <div className="flex space-x-4 mb-4">
            {isMobileDevice && (
              <>
                <Button 
                  variant={activeTab === "wechat" ? "default" : "outline"}
                  onClick={() => setActiveTab("wechat")}
                  className="flex-1"
                >
                  微信
                </Button>
                <Button 
                  variant={activeTab === "qq" ? "default" : "outline"}
                  onClick={() => setActiveTab("qq")}
                  className="flex-1"
                >
                  QQ
                </Button>
              </>
            )}
            <Button 
              variant={activeTab === "url" ? "default" : "outline"}
              onClick={() => setActiveTab("url")}
              className="flex-1"
            >
              链接
            </Button>
          </div>
          
          <div className="flex flex-col items-center justify-center py-6">
            {activeTab === "wechat" && (
              <div className="text-center">
                {isMobileDevice ? (
                  <Button 
                    onClick={shareToWechat} 
                    className="w-full py-6 mb-4"
                  >
                    打开微信分享给朋友
                  </Button>
                ) : (
                  <div className="bg-gray-100 p-8 rounded-lg mb-4">
                    <QrCode className="w-32 h-32 mx-auto" />
                    <p className="mt-2 text-sm text-gray-500">微信扫码分享</p>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === "qq" && (
              <div className="text-center">
                {isMobileDevice ? (
                  <Button 
                    onClick={shareToQQ} 
                    className="w-full py-6 mb-4"
                  >
                    打开QQ分享给朋友
                  </Button>
                ) : (
                  <div className="bg-gray-100 p-8 rounded-lg mb-4">
                    <QrCode className="w-32 h-32 mx-auto" />
                    <p className="mt-2 text-sm text-gray-500">QQ扫码分享</p>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === "url" && (
              <div className="w-full">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex-1 p-3 border rounded-md overflow-hidden text-sm">
                    {shareUrl}
                  </div>
                  <Button size="icon" onClick={copyShareUrl}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500 text-center">复制链接分享给好友</p>
              </div>
            )}
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">关闭</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}