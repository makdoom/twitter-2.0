import { signInWithPopup } from "firebase/auth";
import { useEffect } from "react";
import { ImGoogle } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectedUser, setActiveUser } from "../features/auth/authSlice";
import { auth, provider } from "../firebase";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectedUser);

  // Sign in with google
  const handleSignIn = async () => {
    try {
      const response = await signInWithPopup(auth, provider);

      const authenticatedUser = {
        user: {
          name: response.user.displayName,
          email: response.user.email,
          image: response.user.photoURL,
        },
        userAuthenticated: true,
      };

      // Set user in localstorage
      localStorage.setItem("authUser", JSON.stringify(authenticatedUser));
      dispatch(setActiveUser(authenticatedUser));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // if user authenticated
    if (currentUser.userAuthenticated) return navigate("/home");
  }, [currentUser, navigate]);

  return (
    <div className="h-screen w-screen flex flex-col  justify-center items-center">
      <img src="logo.svg" alt="" className="w-[50%] sm:w-[15%]" />
      <button
        onClick={handleSignIn}
        className="mt-20 flex items-center  bg-secondaryBackground p-4 px-8 shadow-lg rounded-xl transition duration-200 ease-linear border-2 border-ternaryBackground hover:bg-ternaryBackground "
      >
        <ImGoogle className="mr-3" />
        <span className="font-semibold text-base tracking-wide">
          Sign in with Google
        </span>
      </button>
    </div>
  );
};
export default Login;
