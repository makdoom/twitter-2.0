import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogoutUser } from "../features/auth/authSlice";

const SidebarLink = ({ text, Icon, active, logout }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    if (logout) {
      dispatch(setLogoutUser());
      navigate("/");
    }
  };
  return (
    <div className={`flex mb-3`}>
      <button
        onClick={logoutUser}
        className={`flex justify-start items-center space-x-4 py-2 px-3 cursor-pointer rounded-xl hover:bg-hoverBackground hover:text-primaryColor transition duration-200 ease-linear ${
          active && "text-primaryColor font-extrabold"
        } `}
      >
        <Icon className="text-[1.6rem]" />
        <h4 className="text-[1.2rem] tracking-wide hidden xl:inline">{text}</h4>
      </button>
    </div>
  );
};
export default SidebarLink;
