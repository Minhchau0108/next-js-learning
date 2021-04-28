## File-based Routing

### Navigation with Link

```
import Link from 'next/link';

function HomePage() {
  return (
    <div>
      <h1>The Home Page</h1>
      <ul>
          <li>
              <Link href="/portfolio">Portfolio</Link>
          </li>
          <li>
              <Link href="/clients">Clients</Link>
          </li>
      </ul>
    </div>
  );
}

export default HomePage;
```

### Programatic Navigation

```
import { useRouter } from "next/router";
export default function ClientProjectsPage() {
  const router = useRouter();

  const loadProjectHandler = () => {
    // load data
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

```

### Catch all routes

File folder name `[...slug].js`

```
import { useRouter } from "next/router";

function BlogPostsPage() {
  const router = useRouter();
  console.log(router.query); // Array
  return (
    <div>
      <h1>The Blog Posts</h1>
    </div>
  );
}

export default BlogPostsPage;
```
