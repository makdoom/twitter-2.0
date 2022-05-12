const SidebarLink = ({ text, Icon, active }) => {
  return (
    <div
      className={`flex justify-start items-center space-x-3 py-2 px-2.5 cursor-pointer  rounded-full hover:bg-primaryText transition duration-200 ease-linear hover:bg-opacity-20 ${
        active && "font-bold"
      }`}
    >
      <Icon className="text-2xl" />
      <h4 className="text-lg hidden xl:inline">{text}</h4>
    </div>
  );
};
export default SidebarLink;
