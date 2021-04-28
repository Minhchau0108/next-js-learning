import { useRouter } from "next/router";
export default function SelectedClientProjectPage() {
  const router = useRouter();
  console.log(router.query);
  return (
    <div>
      <h1>The project page for a specific project for a specific client</h1>
    </div>
  );
}
