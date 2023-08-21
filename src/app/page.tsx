import db from "@/db";

export default async function Home() {
  const ids = await db.ids();
  return (
    <main className="">
      <ol>
        {ids.map((id) => (
          <li>{id}</li>
        ))}
      </ol>
    </main>
  );
}
