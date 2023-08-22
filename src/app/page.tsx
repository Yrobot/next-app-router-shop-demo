import db from "@/db";
import List from "./List";

const fetchList = async ({ offset }: { offset?: number } = {}) => {
  "use server";
  const list = await db.list({ offset });
  return list;
};

export default async function Home() {
  const list = await fetchList();
  const size = await db.size();
  return (
    <main className="p-4">
      <List initialItems={list} fetch={fetchList} size={size} />
    </main>
  );
}
