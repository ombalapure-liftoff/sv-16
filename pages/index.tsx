import type { NextPage } from "next";
import Head from "next/head";
import SinglePostCard from "../components/SingleCard";
import Navbar from "../components/Navbar";
import { AppContextObject, AppContext } from "../context";
import { useContext } from "react";

const Home: NextPage = () => {
  // const { posts } = useGlobalContext() as AppContextObject;
  const { posts } = useContext(AppContext) as AppContextObject;

  return (
    <div>
      <Head>
        <title>Post App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="https://www.nicepng.com/maxp/u2w7r5t4y3o0i1q8" />
      </Head>
      <Navbar />
      <div className="mt-4">
        <div className="flex flex-col m-5">
          {posts.map((post) => {
            return <SinglePostCard key={post.id} post={post} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
