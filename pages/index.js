import Head from "next/head";
import FeaturedPosts from "../components/home-page/featured-posts";

import Hero from "../components/home-page/hero";
import { getFeaturedPosts } from "../lib/posts-util";

function HomePage(props) {
  return (
    <>
      <Head>
        <title>XiuXiu 's Blog</title>
        <meta name='description' content='I blog about web development.' />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </>
  );
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
  };
}

export default HomePage;
