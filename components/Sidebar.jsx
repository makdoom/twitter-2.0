import Image from "next/image";
import SidebarLink from "./SidebarLink";
import { CgHomeAlt } from "react-icons/cg";
import { HiOutlineHashtag } from "react-icons/hi";
import { BsBell, BsBookmark, BsCardList } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { BiUser } from "react-icons/bi";
import { CgMoreO } from "react-icons/cg";

const Sidebar = () => {
  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
      <div className="flex justify-center items-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
        <Image src="https://rb.gy/ogau5a" width={30} height={30} />
      </div>
      <div className="space-y-2 mt-4 mb-2.5 xl:ml-24">
        <SidebarLink text="Home" Icon={CgHomeAlt} active />
        <SidebarLink text="Explore" Icon={HiOutlineHashtag} />
        <SidebarLink text="Notifications" Icon={BsBell} />
        <SidebarLink text="Messages" Icon={HiOutlineMail} />
        <SidebarLink text="Bookmarks" Icon={BsBookmark} />
        <SidebarLink text="Lists" Icon={BsCardList} />
        <SidebarLink text="Profile" Icon={BiUser} />
        <SidebarLink text="More" Icon={CgMoreO} />
      </div>
    </div>
  );
};
export default Sidebar;
