import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  HiOutlineX,
  HiOutlinePhotograph,
  HiOutlineCalendar,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { BsBarChartLine, BsEmojiSmile } from "react-icons/bs";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { selectedModal, setModalClose } from "../features/modal/modalSlice";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { selectedUser } from "../features/auth/authSlice";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { useNavigate } from "react-router-dom";

const Modal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalState = useSelector(selectedModal);
  const currentUser = useSelector(selectedUser);
  const postId = modalState?.postId;
  const [post, setPost] = useState();
  const [comment, setComment] = useState("");
  const filePickerRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);

  const closeModal = () => dispatch(setModalClose());

  //  TODO: IMPLENT ADD VIDEO FUNCTIONALITY

  // fetching particular tweet and comments
  useEffect(
    () =>
      onSnapshot(doc(db, "posts", postId), (snapshot) => {
        setPost(snapshot.data());
      }),
    [postId]
  );

  // Senc comment
  const sendComment = async (e) => {
    e.preventDefault();
    // TODO: ADD IMAGE FUNCTIONALITY
    await addDoc(collection(db, "posts", postId, "comments"), {
      comment: comment,
      name: currentUser?.user?.name,
      userName: currentUser?.user?.userName,
      userImage: currentUser?.user?.image,
      timestamp: serverTimestamp(),
    });

    dispatch(setModalClose());
    setComment("");
    navigate(`/home/postPage/${postId}`);
  };

  // Select image and render
  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  // Add emoji to input
  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setComment(comment + emoji);
  };

  return (
    <Transition.Root show={modalState.isModalOpen} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 pt-8" onClose={closeModal}>
        <div className="flex relative items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-[#5b7083] bg-opacity-40 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-linear duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-primaryBackground rounded-2xl text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
              <div className="flex items-center px-1.5 py-2 border-b border-gray-700">
                <div
                  className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                  onClick={() => dispatch(setModalClose())}
                >
                  <HiOutlineX className="h-[22px] text-white" />
                </div>
              </div>
              <div className="flex px-4 pt-5 pb-2.5 sm:px-6">
                <div className="w-full">
                  <div className="text-[#6e767d] flex gap-x-3 relative">
                    <span className="w-0.5 h-full z-[-1] absolute left-5 top-11 bg-gray-600" />
                    <img
                      src={post?.userImage}
                      alt=""
                      className="h-11 w-11 rounded-full"
                    />
                    <div>
                      <div className="inline-block ">
                        <h4 className="font-bold text-[#d9d9d9] inline-block text-[15px] sm:text-base">
                          {post?.name}
                        </h4>
                        <span className="ml-1.5 text-sm sm:text-[15px]">
                          @{post?.userName}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm sm:text-[14px]">
                          <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                        </span>
                        <p className="text-[#d9d9d9] text-[15px] sm:text-base mt-2">
                          {post?.text}
                        </p>

                        {post?.image && (
                          <div className="w-[90%]">
                            <img
                              src={post?.image}
                              className="max-h-[15rem] rounded-xl mt-4 object-cover"
                              alt="tweetimg"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-7 flex space-x-3 w-full">
                    <img
                      src={currentUser?.user?.image}
                      alt=""
                      className="h-11 w-11 rounded-full"
                    />
                    <div className="flex-grow mt-2">
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Tweet your reply"
                        rows="2"
                        className="bg-transparent w-full outline-none resize-none text-lg text-primaryText  placeholder-gray-500 min-h-[50px]"
                      />

                      {selectedFile && (
                        <div className="relative">
                          <div
                            className="flex justify-center items-center absolute  text-xl rounded-full cursor-pointer asbolute w-8 h-8 bg-primaryBackground transition duration-200 ease-linear top-2 left-2 hover:text-primaryColor"
                            onClick={() => setSelectedFile(null)}
                          >
                            <HiOutlineX />
                          </div>
                          <img
                            src={selectedFile}
                            alt="select-tweet"
                            className="rounded-2xl max-h-80 object-contain"
                          />
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center mt-3">
                          <div
                            className="icon"
                            onClick={() => filePickerRef.current.click()}
                          >
                            <HiOutlinePhotograph className="text-2xl text-primary" />
                            <input
                              type="file"
                              className="hidden"
                              onChange={addImageToPost}
                              ref={filePickerRef}
                            />
                          </div>

                          <div className="icon">
                            <BsBarChartLine className="rotate-90 text-xl text-primary" />
                          </div>
                          <div
                            className="icon"
                            onClick={() => setShowEmojis(!showEmojis)}
                          >
                            <BsEmojiSmile className=" text-xl text-primary" />
                          </div>
                          <div className="icon">
                            <HiOutlineCalendar className=" text-xl text-primary" />
                          </div>
                          <div className="icon">
                            <HiOutlineLocationMarker className=" text-xl text-primary" />
                          </div>

                          {showEmojis && (
                            <Picker
                              onSelect={addEmoji}
                              style={{
                                position: "absolute",
                                marginTop: "465px",
                                marginLeft: -60,
                                maxWidth: "320px",
                                borderRadius: "20px",
                                zIndex: 1000,
                              }}
                              theme="dark"
                            />
                          )}
                        </div>
                        <button
                          className="rounded-xl px-4 py-2 text-base font-semibold bg-primaryColor text-white hover:bg-hoverPrimary transition duration-200 ease-linear disabled:bg-disabledBg disabled:opacity-70"
                          disabled={!comment.trim() && !selectedFile}
                          onClick={sendComment}
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default Modal;
