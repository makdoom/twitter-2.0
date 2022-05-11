const SidebarLink = ({ text, Icon, active }) => {
  return (
    <div
      className={`text-[#d9d9d9] p-2 flex justify-center items-center xl:justify-start text-xl space-x-3 hoverAnimation`}
    >
      <Icon />
      <span className="hidden xl:inline">{text}</span>
    </div>
  );
};
export default SidebarLink;
