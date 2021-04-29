### App HomeMed Events

---

### File-based

| Option          | Description                                | Rendering |
| --------------- | ------------------------------------------ | --------- |
| /               | Starting Page                              | Static    |
| /events         | Events Page (show all event)               | Static    |
| /events/[id]    | Event Detail Page (show selected Event)    | Static    |
| /events/...slug | Filtered Event Page (show filtered events) | Client    |

---

### When should use `getStaticProps`?

---

- The data required to render the page is available at build time ahead of a user’s request.
- The data comes from a headless CMS.
- The data can be publicly cached (not user-specific).
- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

### When should use `getStaticPath`?

---

You should use `getStaticPaths` if you’re statically pre-rendering pages that use dynamic routes.

### When should use `getServerProps`?

---

You should use getServerSideProps only if you need to pre-render a page whose data must be fetched at request time. Time to first byte (TTFB) will be slower than `getStaticProps` because the server must compute the result on every request, and the result cannot be cached by a CDN without extra configuration.

!!!!! If you don’t need to pre-render the data, then you should consider fetching data on the client side
