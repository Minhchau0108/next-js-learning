import { useRouter } from "next/router";
export default function ClientProjectsPage() {
  const router = useRouter();
  console.log(router.query);
  const loadProjectHandler = () => {
    // load data
    //...
    // navigating
    router.push({
      pathname: "/clients/[id]/[clientprojectid]",
      query: { id: "max", clientprojectid: "projecta" },
    });
  };
  return (
    <div>
      <h1>The Projects of a given client</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
}
