import './loading.css';

export interface LoadingRef {
  open: (msg: string) => void;
  close: () => void;
}

export const Loading = ({visible,message}:{visible:boolean,message:string}) => {
    return (
    <div className={`fixed inset-0 w-full h-full bg-[rgba(230,253,260)] 
      flex flex-col items-center justify-center z-[1000] 
      ${visible ? 'fade-enter-active' : 'fade-leave-active'}`}>
      <svg className="w-[200px] h-[50px]" viewBox="0 0 200 50">
        <text x="10" y="35" className="text-[#333333] animate-stroke">
          {message}
        </text>
      </svg>
    </div>
  );
}

Loading.displayName = 'Loading';