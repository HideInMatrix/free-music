import Header from "./nav/Header";

type Props = React.PropsWithChildren<{}>;
export default function HeaderBarWrapper({ children }: Props) {
  return (
    <div className="h-full w-full flex flex-col">
      <Header />
      <main className="h-full w-full gap-2 mt-12 flex flex-col">
        {children}
      </main>
    </div>
  );
}
