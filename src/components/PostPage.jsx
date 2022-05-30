import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { HiArrowNarrowLeft } from "react-icons/hi";
import Post from "./Post";
import Comment from "./Comment";

const PostPage = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);

  useEffect(
    () =>
      onSnapshot(doc(db, "posts", postId), (snapshot) => {
        setPost(snapshot.data());
      }),
    [db]
  );

  // Fetch comments
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", postId, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, postId]
  );

  console.log("postpage", post);

  return (
    <div className="flex-grow sm:ml-[65px] xl:ml-[340px] max-w-3xl">
      <div className="bg-primaryBackground text-primaryText flex items-center p-2 sticky top-0 z-50 ">
        <HiArrowNarrowLeft
          fontSize={20}
          className="font-bold cursor-pointer icon w-8 h-8 ml-0"
          onClick={() => navigate("/")}
        />
        <p className="font-bold text-lg  sm:text-xl">Tweet</p>
      </div>
      <Post id={postId} post={post} postPage />
      {comments.length > 0 && (
        <div className="bg-secondaryBackground mt-4 p-1 rounded-xl">
          <p className="p-3 font-semibold">Comments</p>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              id={comment.id}
              comment={comment.data()}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default PostPage;
