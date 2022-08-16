import React, { useContext } from "react";
import axios from "axios";
import Post from "../../../models/Post";
import Comment from "../../../models/Comment";
import Navbar from "../../../components/Navbar";
import SinglePostCard from "../../../components/SinglePostCard";
import { AppContextObject, AppContext } from "../../../context";

const SinglePost: React.FC<{ post: Post; comments: Comment[] }> = (props) => {
  return (
    <React.Fragment>
      <Navbar />
      <SinglePostCard post={props.post} comments={props.comments} />
    </React.Fragment>
  );
};

/**
 * Get all possible post paths
 * @params none
 * @return Post Ids
 */
export async function getStaticPaths() {
  try {
    // Using ContextAPI data
    // const { posts } = useGlobalContext() as AppContextObject;
    const { posts } = useContext(AppContext) as AppContextObject;

    return {
      fallback: "blocking",
      paths: posts.map((post: Post) => ({
        params: { id: post.id.toString() },
      })),
    };
  } catch (error) {
    // Refer for details: https://stackoverflow.com/questions/65491601/undefined-paths-in-getstaticpaths-next-js
    console.log(`Error while fetching paths: ${error}`);
    return { paths: [], fallback: "blocking" };
  }
}

/**
 * Get blog details
 * @param context
 * @returns Single Post Details
 */
export async function getStaticProps(context: any) {
  try {
    const id = context.params.id;
    const postReponse = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );

    const commentResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    );

    return {
      props: {
        post: postReponse.data,
        comments: commentResponse.data,
      },
    };
  } catch (error) {
    console.log(`Error while fetching post details: ${error}`);
  }
}

export default SinglePost;
