import { ImGoogle } from "react-icons/im";
const Login = () => {
  return (
    <div className="h-screen w-screen flex flex-col  justify-center items-center">
      <img src="logo.svg" alt="" className="w-[50%] sm:w-[15%]" />
      <button className="mt-20 flex items-center  bg-secondaryBackground p-4 px-8 shadow-lg rounded-xl transition duration-200 ease-linear border-2 border-ternaryBackground hover:bg-ternaryBackground ">
        <ImGoogle className="mr-3" />
        <span className="font-semibold text-base tracking-wide">
          Sign in with Google
        </span>
      </button>
    </div>
  );
};
export default Login;
