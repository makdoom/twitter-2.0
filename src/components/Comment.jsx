import {
  HiDotsHorizontal,
  HiOutlineUpload,
  HiOutlineSwitchHorizontal,
} from "react-icons/hi";
import { IoChatbubbleOutline } from "react-icons/io5";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
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

const Comment = ({ id, comment }) => {
  console.log(comment);
  const currentUser = useSelector(selectedUser);

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  //   const [comments, setComments] = useState([]);

  // Fetch post comments
  //   useEffect(
  //     () =>
  //       onSnapshot(
  //         query(
  //           collection(db, "posts", id, "comments"),
  //           orderBy("timestamp", "desc")
  //         ),
  //         (snapshot) => setComments(snapshot.docs)
  //       ),
  //     [id]
  //   );

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
    <div className="flex p-3 cursor-pointer border-b border-ternaryBackground">
      <img
        src={comment?.userImage}
        alt="user-profile"
        className="h-11 w-11 rounded-full mr-4"
      />

      <div className="flex flex-col space-y-2 w-full">
        <div className="flex justify-between ">
          <div className="">
            <div className="inline-block group">
              <h4 className="font-bold text-[#d9d9d9] text-[15px] sm:text-base inline-block ">
                {comment?.name}
              </h4>
              <span className="ml-1.5 text-sm sm:text-[15px] text-secondaryText">
                @{comment?.userName}{" "}
              </span>
            </div>{" "}
            ·{" "}
            <span className=" text-sm sm:text-[15px] text-secondaryText">
              <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
            </span>
            <p className=" mt-0.5 max-w-lg overflow-scroll text-[15px] sm:text-base">
              {comment?.comment}
            </p>
          </div>
          <div className="group flex-shrink-0">
            <HiDotsHorizontal className="icon h-8 w-8 p-2 mt-1.5 text-base text-secondaryText" />
          </div>
        </div>
        <div className=" mt-3 flex justify-between items-center w-[90%]">
          <div
            className="p-3 hover:bg-opacity-80 justify-center mr-4 text-sm flex items-center rounded-lg bg-ternaryBackground"
            onClick={(e) => {
              e.stopPropagation();
              likePost();
            }}
          >
            {liked ? (
              <BsHeartFill className="text-red-500 text-[1rem]" />
            ) : (
              <BsHeart className="text-[1rem]" />
            )}
            {likes.length > 0 && (
              <p className=" ml-2 text-[.79rem]">{likes.length}</p>
            )}{" "}
          </div>
          <div className="p-3 hover:bg-opacity-80  justify-center mr-4  text-sm flex items-center  rounded-lg bg-ternaryBackground">
            <IoChatbubbleOutline className="text-[1rem]" />
          </div>
          <div className="p-3 hover:bg-opacity-80  justify-center mr-4  text-sm flex items-center  rounded-lg bg-ternaryBackground">
            <HiOutlineSwitchHorizontal className="text-[1rem]" />
          </div>
          <div className="p-3 hover:bg-opacity-80  justify-center mr-4  text-sm flex items-center  rounded-lg bg-ternaryBackground">
            <HiOutlineUpload className="text-[1rem]" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Comment;
