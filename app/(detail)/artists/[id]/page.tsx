type PageProps = {
  params: {
    id: string;
  };
};
export default function DetailPage({ params }: PageProps) {
  console.log(params.id);

  return <></>;
}
