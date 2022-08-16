import React, { useRef } from "react";
import Navbar from "../components/Navbar";

const CreatePost = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  /**
   * Create a post
   * @params FormEvent Object
   * @return void
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!titleRef.current || !bodyRef.current) {
      return;
    }

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: titleRef.current!.value,
        body: bodyRef.current!.value,
      }),
    })
      .then((response) => response.json())
      .then((result) => console.log("RESULT:", result))
      .catch((error) => console.log("ERROR:", error));
  };

  return (
    <>
      <Navbar />
      <div className="p-5 space-y-12 flex flex-col justify-between items-center">
        <form onSubmit={handleSubmit} className="space-y-6 border-2 p-5 rounded-lg shadow-lg">
          <div className="flex">
            <input
              id="title"
              type="text"
              className="border-2 rounded focus:bg-slate-200 w-96 px-4 py-2"
              ref={titleRef}
              placeholder="Enter a title"
            />
          </div>
          <div className="flex">
            <textarea
              id="body"
              className="border-2 rounded focus:bg-slate-200 w-96 px-4 py-2"
              ref={bodyRef}
              placeholder="Enter the post content"
            />
          </div>
          <button
            type="submit"
            className="border-2 rounded-lg bg-indigo-900 text-white px-4 py-2 w-96 hover:bg-indigo-700"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
