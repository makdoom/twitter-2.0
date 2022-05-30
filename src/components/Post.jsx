import {
  HiDotsHorizontal,
  HiOutlineSwitchHorizontal,
  HiOutlineTrash,
} from "react-icons/hi";
import { IoChatbubbleOutline } from "react-icons/io5";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setModalOpen } from "../features/modal/modalSlice";
import Moment from "react-moment";
import { selectedUser } from "../features/auth/authSlice";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Post = ({ id, post, postPage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectedUser);

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);

  // Fetch post comments
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [id]
  );

  // Fetching post likes
  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(snapshot.docs);
    });
  }, [id]);

  // Setting liked flag
  useEffect(() => {
    setLiked(
      likes.findIndex((like) => like.id === currentUser?.user?.id) !== -1
    );
  }, [likes, currentUser]);

  // Like post
  const likePost = async () => {
    if (liked) {
      await deleteDoc(doc(db, "posts", id, "likes", currentUser?.user?.id));
    } else {
      await setDoc(doc(db, "posts", id, "likes", currentUser?.user?.id), {
        name: currentUser?.user?.name,
      });
    }
  };

  return (
    <div
      className="rounded-xl p-4 mt-4 bg-secondaryBackground cursor-pointer"
      onClick={() => navigate(`/home/postpage/${id}`)}
    >
      <div className="flex">
        <img
          src={post?.userImage}
          alt="user-profile"
          className="h-11 w-11 rounded-full mr-4"
        />
        <div className="flex justify-between w-full ">
          <div className="flex flex-col flex-grow w-full">
            <div className="flex items-center">
              <h4 className="text-[17px] font-bold mr-2 capitalize">
                {post?.name}
              </h4>
              <span className="text-secondaryText text-[14px]">
                @{post?.userName}
              </span>
            </div>
            <span className="text-secondaryText text-sm">
              <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
            </span>

            <p className={`mt-4 ${postPage && "text-lg"}`}>{post?.text}</p>
            {post?.image && (
              <div className="w-[90%]">
                <img
                  src={post?.image}
                  className="max-h-[20rem] rounded-xl mt-4 object-cover"
                  alt="tweetimg"
                />
              </div>
            )}

            <div className="mt-6 flex w-full">
              <div
                className="p-3 hover:bg-opacity-80 w-full justify-center mr-4  text-sm flex items-center rounded-lg bg-ternaryBackground"
                onClick={(e) => {
                  e.stopPropagation();
                  likePost();
                }}
              >
                {liked ? <BsHeartFill className="text-red-500" /> : <BsHeart />}

                <span className=" ml-2 text-[.79rem] ">
                  {likes.length > 0 && likes.length}{" "}
                  <span className="hidden sm:inline-block">Likes</span>
                </span>
              </div>
              <div
                className="p-3 hover:bg-opacity-80 w-full justify-center mr-4  text-sm flex items-center  rounded-lg bg-ternaryBackground"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(setModalOpen(id));
                }}
              >
                <IoChatbubbleOutline />

                <span className="ml-2 text-[.79rem]">
                  {comments.length > 0 && comments.length}{" "}
                  <span className="hidden sm:inline-block">Comment</span>
                </span>
              </div>

              <div className="p-3 hover:bg-opacity-80 w-full justify-center mr-4  text-sm flex items-center  rounded-lg bg-ternaryBackground">
                <HiOutlineSwitchHorizontal className="text-xl" />
                <span className="ml-2 text-[.79rem] hidden sm:inline-block">
                  Retweet
                </span>
              </div>
              <div className="p-3 hover:bg-opacity-80 w-full justify-center mr-4  text-sm flex items-center  rounded-lg bg-ternaryBackground">
                <HiOutlineSwitchHorizontal className="text-xl" />
                <span className="ml-2 text-[.79rem] hidden sm:inline-block">
                  Share
                </span>
              </div>
              {post?.id === currentUser?.user.id && (
                <div
                  className="p-3 px-4 hover:text-red-500 transition duration-200 ease-linear  justify-center mr-4  text-lg flex items-center  rounded-lg border-2 border-ternaryBackground"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteDoc(doc(db, "posts", id));
                    navigate("/");
                  }}
                >
                  <HiOutlineTrash />
                </div>
              )}
            </div>
          </div>
        </div>
        <HiDotsHorizontal className=" icon h-8 w-8 p-2 mt-1.5 text-base text-secondaryText" />
      </div>
    </div>
  );
};
export default Post;
