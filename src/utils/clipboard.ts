import { useToast } from "@/hooks/use-toast";

/**
 * 通用的复制到剪贴板函数
 * 兼容PC和移动端，处理了不同浏览器的兼容性问题
 */
export const copyToClipboard = (text: string, toastOptions?: {
  title?: string;
  description?: string;
  successTitle?: string;
  successDescription?: string;
  errorTitle?: string;
  errorDescription?: string;
  toast?: any;
}) => {
  const toast = toastOptions?.toast || useToast().toast;
  
  // 默认的提示信息
  const {
    successTitle = "复制成功",
    successDescription = "内容已复制到剪贴板",
    errorTitle = "复制失败",
    errorDescription = "请手动复制内容"
  } = toastOptions || {};

  // 尝试使用现代Clipboard API
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast({
          title: successTitle,
          description: successDescription,
        });
      })
      .catch(() => {
        // 如果Clipboard API失败，使用备选方法
        fallbackCopyToClipboard(text, {
          successTitle,
          successDescription,
          errorTitle,
          errorDescription,
          toast
        });
      });
  } else {
    // 如果Clipboard API不可用，使用备选方法
    fallbackCopyToClipboard(text, {
      successTitle,
      successDescription,
      errorTitle,
      errorDescription,
      toast
    });
  }
};

/**
 * 备选的复制到剪贴板方法
 * 使用copy event和document.execCommand("copy")结合实现
 * 参考MDN文档：https://developer.mozilla.org/en-US/docs/Web/API/Element/copy_event
 */
const fallbackCopyToClipboard = (text: string, options: {
  successTitle: string;
  successDescription: string;
  errorTitle: string;
  errorDescription: string;
  toast: any;
}) => {
  const { successTitle, successDescription, errorTitle, errorDescription, toast } = options;
  
  try {
    // 创建一个临时的textarea元素
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // 设置样式使其不可见
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    
    // 添加copy事件监听器
    const listener = (e: ClipboardEvent) => {
      // 阻止默认行为
      e.preventDefault();
      // 设置剪贴板数据
      if (e.clipboardData) {
        e.clipboardData.setData("text/plain", text);
      }
      // 移除事件监听器
      document.removeEventListener("copy", listener);
    };
    
    // 添加事件监听器
    document.addEventListener("copy", listener);
    
    // 选中文本并触发复制命令
    textArea.focus();
    textArea.select();
    
    const successful = document.execCommand("copy");
    
    // 清理DOM
    document.body.removeChild(textArea);
    
    if (successful) {
      toast({
        title: successTitle,
        description: successDescription,
      });
    } else {
      toast({
        title: errorTitle,
        description: errorDescription,
        variant: "destructive",
      });
    }
  } catch (err) {
    toast({
      title: errorTitle,
      description: errorDescription,
      variant: "destructive",
    });
  }
};

/**
 * 复制分享链接的钩子函数
 */
export const useCopyToClipboard = () => {
  const { toast } = useToast();
  
  const copy = (text: string, options?: {
    successTitle?: string;
    successDescription?: string;
    errorTitle?: string;
    errorDescription?: string;
  }) => {
    copyToClipboard(text, {
      ...options,
      toast
    });
  };
  
  return { copy };
};