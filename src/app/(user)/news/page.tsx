import Link from "next/link";
import axios from "axios";

async function getToken() {
  const respons = await axios.get("https://token.310soft.com/getToken");
  return respons.data;
}

export async function getNews() {
  const news_token = await getToken();
  const response = await axios.get("https://cfnews.310soft.com/latestNews", {
    headers: { Authorization: `Bearer ${news_token}` },
  });
  return response.data;
}

export default async function News() {
  const news = await getNews();
  return (
    <>
      <ul>
        {news.map((p) => (
          <li key={p.news_id}>
            <Link href={`/news/${p.news_id}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
