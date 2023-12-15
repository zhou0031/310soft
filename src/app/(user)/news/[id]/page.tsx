import { prisma } from "../../../../prismaDB";

async function getNewsById(id) {
  const result = await prisma.news.findUnique({
    where: { id: id },
  });
  return result;
}

export default async function Page({ params }) {
  const { id } = params;
  const data = await getNewsById(id);
  return <>{data.content}</>;
}
