import { useState, useRef } from "react";
import {
  HiOutlineX,
  HiOutlinePhotograph,
  HiOutlineCalendar,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { BsBarChartLine, BsEmojiSmile } from "react-icons/bs";

const InputTweet = () => {
  const [tweetInput, setTweetInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef();
  const [showEmoji, setShowEmoji] = useState(false);

  const addImageToPost = () => {};

  return (
    <div
      className={`border-b border-gray-800 p-3 space-x-3 flex overflow-y-scroll`}
    >
      <img
        src="https://lh3.googleusercontent.com/ogw/ADea4I6K2Iff2mb3KD9xK-vNjlz6HALyQO8g5G_4x_KlHmk=s32-c-mo"
        alt="user-profile"
        className="h-12 w-12 rounded-full xl:mr-2.5"
      />
      <div className="w-full divide-y divide-gray-800">
        <div>
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
                className="flex justify-center items-center text-xl rounded-full cursor-pointer asbolute w-8 h-8 bg-gray-600 transition duration-200 ease-linear top-1 left-1 hover:bg-secondaryText"
                onClick={() => setSelectedFile(null)}
              >
                <HiOutlineX />
              </div>
              <img
                src={selectedFile}
                alt="select-tweet-image"
                className="rounded-2xl max-h-80 object-contain"
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center mt-2.5">
            <div className="icon" onClick={() => filePickerRef.current.click()}>
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
            <div className="icon" onClick={() => setShowEmoji(!showEmoji)}>
              <BsEmojiSmile className=" text-xl text-primary" />
            </div>
            <div className="icon">
              <HiOutlineCalendar className=" text-xl text-primary" />
            </div>
            <div className="icon">
              <HiOutlineLocationMarker className=" text-xl text-primary" />
            </div>
          </div>
          <button> Tweet </button>
        </div>
      </div>
    </div>
  );
};
export default InputTweet;
