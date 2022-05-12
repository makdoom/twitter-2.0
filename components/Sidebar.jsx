import Image from "next/image";
import SidebarLink from "./SidebarLink";
import { CgHomeAlt, CgMoreO } from "react-icons/cg";
import {
  HiOutlineHashtag,
  HiOutlineBookmark,
  HiOutlineUser,
  HiOutlineDotsHorizontal,
} from "react-icons/hi";
import { VscBell } from "react-icons/vsc";
import { IoMailOutline } from "react-icons/io5";
import { BsCardList } from "react-icons/bs";
import { GiFeather } from "react-icons/gi";

const Sidebar = () => {
  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[300px] p-2 h-full fixed">
      {/* Logo */}
      <div className=" flex justify-center items-center cursor-pointer hover:bg-primaryText h-12 w-12 rounded-full transition duration-200 ease-linear hover:bg-opacity-20 ">
        <Image src="https://rb.gy/ogau5a" width={30} height={30} />
      </div>

      {/* Links */}
      <div className=" mt-3 space-y-3 ">
        <SidebarLink text="Home" Icon={CgHomeAlt} active />
        <SidebarLink text="Explore" Icon={HiOutlineHashtag} />
        <SidebarLink text="Notifications" Icon={VscBell} />
        <SidebarLink text="Messages" Icon={IoMailOutline} />
        <SidebarLink text="Bookmarks" Icon={HiOutlineBookmark} />
        <SidebarLink text="Lists" Icon={BsCardList} />
        <SidebarLink text="Profile" Icon={HiOutlineUser} />
        <SidebarLink text="More" Icon={CgMoreO} />
      </div>

      {/* Tweet Button */}
      <button className="mt-6 flex justify-center items-center bg-primary rounded-full w-[80%] p-3 xl:py-3.5 hover:bg-[#1a8cd8] transition duration-200 ease-linear">
        <GiFeather className="xl:hidden text-white text-lg font-bold" />
        <span className="hidden xl:inline text-lg font-semibold tracking-wide">
          Tweet
        </span>
      </button>

      {/* User Profile */}
      <div className="w-full mt-auto cursor-pointer xl:py-2 xl:px-3 hoverAnimation flex justify-center items-center">
        <img
          src="https://lh3.googleusercontent.com/ogw/ADea4I6K2Iff2mb3KD9xK-vNjlz6HALyQO8g5G_4x_KlHmk=s32-c-mo"
          alt="user-profile"
          className="h-10 w-10 rounded-full xl:mr-2.5"
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
