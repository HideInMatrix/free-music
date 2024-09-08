import { ReactNode } from "react";

const StopPropagation = ({ children }: { children: ReactNode }) => {
  const handleClick = (event: any) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  };

  return (
    <div onClick={handleClick} className="">
      {children}
    </div>
  );
};

export default StopPropagation;
