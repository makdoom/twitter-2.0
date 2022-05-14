import SidebarLink from "./SidebarLink";
import { CgHomeAlt } from "react-icons/cg";
import {
  HiOutlineHashtag,
  HiOutlineBookmark,
  HiOutlineUser,
  HiOutlineDotsHorizontal,
} from "react-icons/hi";
import { VscBell } from "react-icons/vsc";
import { IoMailOutline } from "react-icons/io5";
import { BsTwitter } from "react-icons/bs";
import { GiFeather } from "react-icons/gi";

const Sidebar = () => {
  return (
    <div className="hidden sm:flex flex-col items-center justify-between xl:items-start xl:w-[300px] p-2 h-full fixed">
      {/* Logo */}
      <div className="flex items-center  cursor-pointer mt-4">
        <BsTwitter fontSize={28} className="text-primaryColor" />
        <span className="ml-3 text-2xl font-bold tracking-wide">
          Twitter 2.0
        </span>
      </div>
      {/* Links */}
      <div className="w-full flex flex-col justify-start">
        <SidebarLink text="Home" Icon={CgHomeAlt} active />
        <SidebarLink text="Explore" Icon={HiOutlineHashtag} />
        <SidebarLink text="Notifications" Icon={VscBell} />
        <SidebarLink text="Messages" Icon={IoMailOutline} />
        <SidebarLink text="Bookmarks" Icon={HiOutlineBookmark} />
        <SidebarLink text="Profile" Icon={HiOutlineUser} />

        {/* Tweet Button */}
        <button
          type="button"
          className="mt-5 ml-3 w-[80%] rounded-xl p-3 bg-primaryColor text-white hover:bg-hoverPrimary transition duration-200 ease-linear"
        >
          <GiFeather className="xl:hidden text-white text-lg font-bold" />
          <span className="hidden xl:inline text-lg font-semibold tracking-wide">
            Tweet
          </span>
        </button>
      </div>

      {/* User Profile */}
      <div className="w-full cursor-pointer xl:py-2 xl:px-3 flex justify-center items-center hover:bg-secondaryBackground rounded-full hover:text-primaryColor transition duration-200 ease-linear">
        <img
          src="https://lh3.googleusercontent.com/ogw/ADea4I6K2Iff2mb3KD9xK-vNjlz6HALyQO8g5G_4x_KlHmk=s32-c-mo"
          alt="user-profile"
          className="h-10 w-10 rounded-full xl:mr-2.5 border-2 border-primaryColor"
        />
        <div className="hidden xl:inline flex-1">
          <h4 className="font-semibold">Makdoom Shaikh</h4>
          <p className="text-secondaryText">@shaikh_makdoom</p>
        </div>
        <HiOutlineDotsHorizontal className=" xl:inline hidden" fontSize={25} />
      </div>
    </div>
  );
};
export default Sidebar;
