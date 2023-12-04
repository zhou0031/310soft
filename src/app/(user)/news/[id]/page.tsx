import axios from "axios";
/*
export async function generateStaticParams() {
  const posts = await fetch("https://jsonplaceholder.typicode.com/posts/").then(
    (res) => res.json()
  );

  return posts.map((p) => {
    id: p.id.toString();
  });
}
*/
export async function generateStaticParams(params) {
  const news_token = await getToken();
  const res = await axios.get(
    `https://cfnews.310soft.com/findNews/${params.id}`,
    { headers: { Authorization: `Bearer ${news_token}` } }
  );

  const news = await res.data;

  return news;
}
async function getToken() {
  const respons = await axios.get("https://token.310soft.com/getToken");
  return respons.data;
}
/*
async function getNews(params) {
  const news_token = await getToken();
  const res = await axios.get(
    `https://cfnews.310soft.com/findNews/${params.id}`,
    { headers: { Authorization: `Bearer ${news_token}` } }
  );

  const news = await res.data;

  return news;
}
*/
export default async function Page({ params }) {
  const { id } = params;
  return <>{JSON.stringify(id)}</>;
}
