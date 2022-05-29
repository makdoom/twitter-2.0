import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import Widget from "../components/Widget";
import { selectedUser } from "../features/auth/authSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectedUser);

  useEffect(() => {
    // if user authenticated
    if (!currentUser.isAuthenticated) return navigate("/");
  }, [currentUser, navigate]);

  return (
    <main className="bg-primaryBackground relative min-h-screen  max-w-[1500px] flex mx-auto">
      <Sidebar />
      {/* Feed */}

      <Feed />

      {/* Widget */}
      <Widget />

      {/* Modal */}
    </main>
  );
};
export default Home;
