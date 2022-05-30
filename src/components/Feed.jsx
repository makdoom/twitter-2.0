import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { HiOutlineSparkles } from "react-icons/hi";
import { db } from "../firebase";
import InputTweet from "./InputTweet";
import Post from "./Post";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  // Fetch all posts
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => setPosts(snapshot.docs)
      ),
    []
  );

  return (
    <div className="flex-grow sm:ml-[65px] xl:ml-[340px] max-w-3xl">
      <div className="bg-primaryBackground text-primaryText flex justify-between items-center py-3 px-3 sticky top-0 z-50 ">
        <p className="font-bold text-lg  sm:text-xl">Home</p>
        <HiOutlineSparkles fontSize={20} className="font-bold cursor-pointer" />
      </div>

      {/* Input Tweet  */}
      <InputTweet />

      {/* Posts  */}
      {posts.map((post) => (
        <Post key={post.id} id={post.id} post={post.data()} />
      ))}
      {/* <Post />
      <Post image />
      <Post />
      <Post />
      <Post image />
      <Post /> */}
    </div>
  );
};
export default Feed;
