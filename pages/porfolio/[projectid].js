import { useRouter } from "next/router";
export default function PorfolioProjectPage() {
  const router = useRouter();
  console.log(router.pathname);
  console.log(router.query);
  return (
    <div>
      <h1>Porfolio Project Page</h1>
    </div>
  );
}
