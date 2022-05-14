const SidebarLink = ({ text, Icon, active }) => {
  return (
    <div className={`flex mb-3`}>
      <a
        href=""
        className={`flex justify-start items-center space-x-4 py-2 px-3 cursor-pointer rounded-xl hover:bg-hoverBackground hover:text-primaryColor transition duration-200 ease-linear ${
          active && "text-primaryColor font-extrabold"
        } `}
      >
        <Icon className="text-[1.6rem]" />
        <h4 className="text-[1.2rem] tracking-wide hidden xl:inline">{text}</h4>
      </a>
    </div>
  );
};
export default SidebarLink;
