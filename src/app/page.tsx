import LikeButton from "@/components/LikeButton";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">Hello from the starter app</h1>
      <div className="mt-4">
        <LikeButton />
      </div>
    </main>
  );
}
