import NewsLayout from "./(public)/news/layout";
import News from "./(public)/news/page";

export default function Home() {
  return (
    <>
      <NewsLayout>
        <News />
      </NewsLayout>
    </>
  );
}
