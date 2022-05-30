import { useState, useRef } from "react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import {
  HiOutlineX,
  HiOutlinePhotograph,
  HiOutlineCalendar,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { BsBarChartLine, BsEmojiSmile } from "react-icons/bs";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useSelector } from "react-redux";
import { selectedUser } from "../features/auth/authSlice";

const InputTweet = () => {
  const currentUser = useSelector(selectedUser);

  const filePickerRef = useRef();
  const [tweetInput, setTweetInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);

  //  TODO: IMPLENT ADD VIDEO FUNCTIONALITY

  // Send Tweet
  const sendTweet = async () => {
    if (loading) return;
    setLoading(true);

    try {
      // Adding tweet post
      const docRef = await addDoc(collection(db, "posts"), {
        id: currentUser?.user.id,
        name: currentUser?.user.name,
        userImage: currentUser?.user.image,
        userName: currentUser?.user.userName,
        text: tweetInput,
        timestamp: serverTimestamp(),
      });
      console.log("Document added", docRef.id);
      console.log("Document added", currentUser);

      // Tweet image reference
      const imageRef = ref(storage, `posts/${docRef.id}/image`);

      // If any image exist in tweet
      if (selectedFile) {
        await uploadString(imageRef, selectedFile, "data_url").then(
          async () => {
            const downloadURL = await getDownloadURL(imageRef);
            // Update document with download image url
            await updateDoc(doc(db, "posts", docRef.id), {
              image: downloadURL,
            });
          }
        );
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    setLoading(false);
    setTweetInput("");
    setSelectedFile(null);
    setShowEmojis(false);
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
    setTweetInput(tweetInput + emoji);
  };

  return (
    <div
      className={`p-3 space-x-3 flex overflow-y-scroll bg-secondaryBackground rounded-xl ${
        loading && "opacity-60"
      }`}
    >
      <img
        src={currentUser?.user?.image}
        alt="user-profile"
        className="h-12 w-12 rounded-full xl:mr-2.5 "
        referrerPolicy="no-referrer"
      />
      <div className="w-full">
        <div
          className={`${selectedFile && "pb-3"} ${
            tweetInput && "space-y-2.5"
          } `}
        >
          <textarea
            value={tweetInput}
            onChange={(e) => setTweetInput(e.target.value)}
            rows="2"
            placeholder="What's happening ?"
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
        </div>

        {!loading && (
          <div className="flex items-center justify-between">
            <div className="flex items-center mt-2.5">
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
              <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
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
                  }}
                  theme="dark"
                />
              )}
            </div>
            <button
              className="rounded-xl px-4 py-2 text-base font-semibold bg-primaryColor text-white hover:bg-hoverPrimary transition duration-200 ease-linear disabled:bg-disabledBg disabled:opacity-70"
              disabled={!tweetInput.trim() && !selectedFile}
              onClick={sendTweet}
            >
              Tweet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default InputTweet;
