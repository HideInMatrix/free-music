import UserName from "./_components/user-name";
export default function Page({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <div>
      <UserName></UserName>
    </div>
  );
}
