import { HTMLProps, ReactNode } from "react";

interface StopPropagationProps extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
}

const StopPropagation = ({
  children,
  onClick,
  ...rest
}: StopPropagationProps) => {
  const handleClick = (event: any) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    if (onClick) {
      onClick(event); // 调用传递的 onClick 函数
    }
  };

  return (
    <div onClick={handleClick} {...rest}>
      {children}
    </div>
  );
};

export default StopPropagation;
