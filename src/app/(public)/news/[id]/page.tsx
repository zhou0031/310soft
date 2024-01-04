/*
export async function generateStaticParams() {
  const response = await fetch("http://localhost:3000/api/news");

  const json = await response.json();
  const news = json?.body?.data;

  return news.map((item) => ({
    id: item.id,
  }));
}
/*
async function getNewsById(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/news/${id}`);
    return await response.json();
  } catch (e) {
    console.log(e);
  }
}
*/
export default async function Page({ params }) {
  const { id } = params;
  /*
  const data = await getNewsById(id);
  return (
    <>
      <div className="">{data.content}</div>
    </>
  );
  */
  return <></>;
}
