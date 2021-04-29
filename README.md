## Pre-render

## Static Rendering

---

- That means in production, the page HTML is generated when you run next build .
- This HTML will then be reused on each request. It can be cached by a CDN.

1. Static Generation without data

---

In cases like this, Next.js generates a single HTML file per page during build time.

```
function About() {
  return <div>About</div>
}

export default About
```

2. Static Generation with data

---

Scenario 1: only use `getStaticProps`

```
function Blog({ posts }) {
  // Render posts...
}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  }
}

export default Blog
```

```
export async function getStaticProps(context) {
  const { params } = context;
  return {
    props: {}, // will be passed to the page component as props
  }
}
```

`context` : is parameter

- `params` contains the route parameters for pages using dynamic routes. For example, if the page name is [id].js , then params will look like { id: ... }.

`getStaticProps` should return an object with:

- `props` - A **_required_** object with the props that will be received by the page component.
- `revalidate` - An **_optional_** amount in seconds after which a page re-generation can occur.

```
function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  )
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  return {
    props: {
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  }
}
```

- `notFound` - An optional boolean value to allow the page to return a 404 status and page.

```
export async function getStaticProps(context) {
  const res = await fetch(`https://.../data`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data }, // will be passed to the page component as props
  }
}
```

- `redirect` - An optional redirect value to allow redirecting to internal and external resources.

```

 if (!data) {
   return {
     redirect: {
       destination: '/',
       permanent: false,
     },
   }
 }
```

Scenario 2: use `getStaticProps` and `getStaticPath`

Next.js allows you to create pages with dynamic routes. For example, you can create a file called `pages/posts/[id].js` to show a single blog post based on id. This will allow you to show a blog post with `id: 1` when you access `posts/1`.
However, which id you want to pre-render at build time might depend on external data.
So function `getStaticPaths` from a dynamic page (pages/posts/[id].js in this case) to handle this. This function gets called at build time and lets you specify which paths you want to pre-render.

```
// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}
```

Also in `pages/posts/[id].js`, you need to export `getStaticProps` so that you can fetch the data about the post with this id and use it to pre-render the page:

```
function Post({ post }) {
  // Render post...
}

export async function getStaticPaths() {
  // ...
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`https://.../posts/${params.id}`)
  const post = await res.json()

  // Pass post data to the page via props
  return { props: { post } }
}

export default Post
```

### `fallback`

The object returned by getStaticPaths must contain a boolean `fallback` key.

`fallback: false`

---

- any paths not returned by getStaticPaths will result in a 404 page.
- You can do this if you have a small number of paths to pre-render -> so they are all statically generated during build time.

```
export async function getStaticPaths() {
  return {
    // Only `/posts/1` and `/posts/2` are generated at build time
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    fallback: false,
  }
} // `posts/3` return 404 page


```

`fallback: true`

---

- The paths returned from getStaticPaths will be rendered to HTML at build time by getStaticProps.
- Next.js will serve a “fallback” version of the page on the first request to such a path
- When that’s done, the browser receives the JSON for the generated path. This will be used to automatically render the page with the required props. From the user’s perspective, the page will be swapped from the fallback page to the full page.

```
// This function gets called at build time
export async function getStaticPaths() {
  return {
    // Only `/posts/1` and `/posts/2` are generated at build time
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    // Enable statically generating additional pages
    // For example: `/posts/3`
    fallback: true,
  }
}

```

When is `falseback: true` useful?

- your app has a very large number of static pages that depend on data (e-commerce site).
- You want to pre-render all product pages, but then your builds would take forever.
- Instead, you may statically generate a small subset of pages and use fallback: true for the rest. When someone requests a page that’s not generated yet, the user will see the page with a loading indicator. Shortly after, getStaticProps finishes and the page will be rendered with the requested data. From now on, everyone who requests the same page will get the statically pre-rendered page.
- This ensures that users always have a fast experience while preserving fast builds and the benefits of Static Generation.

`fallback: 'blocking'`

- If fallback is 'blocking', new paths not returned by getStaticPaths will wait for the HTML to be generated, identical to SSR (hence why blocking), and then be cached for future requests so it only happens once per path.

`getStaticProps` will behave as follows:

- The paths returned from getStaticPaths will be rendered to HTML at build time by getStaticProps.
- The paths that have not been generated at build time will not result in a 404 page. Instead, Next.js will SSR on the first request and return the generated HTML.
- When that’s done, the browser receives the HTML for the generated path. From the user’s perspective, it will transition from "the browser is requesting the page" to "the full page is loaded". There is no flash of loading/fallback state.
- At the same time, Next.js adds this path to the list of pre-rendered pages. Subsequent requests to the same path will serve the generated page, just like other pages pre-rendered at build time.

## Server-side Rendering

If a page uses Server-side Rendering, the page HTML is generated on each request.

```
function Page({ data }) {
  // Render data...
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://.../data`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

```

## Combine Pre-fetching with client-side fetching

---

```
import { useState, useEffect } from "react";

function LastSales(props) {
  const [data, setData] = useState(props.sales);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(
        "https://nextjs-course-1-c35f3-default-rtdb.firebaseio.com/Sales.json"
      );
      const data = await response.json();
      setData(Object.values(data));
      setLoading(false);
    };
    fetchData();
  }, []);
  console.log("sales", data);
  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item.username}>
              {item.username} - ${item.value}{" "}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
export default LastSales;

export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-course-1-c35f3-default-rtdb.firebaseio.com/Sales.json"
  );
  const data = await response.json();
  const transformData = Object.values(data);
  return {
    props: {
      sales: transformData,
    },
    revalidate: 10,
  };
}

```
