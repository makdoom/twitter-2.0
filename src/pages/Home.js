import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import Feed from "../components/Feed";
import Modal from "../components/Modal";
import PostPage from "../components/PostPage";
import Sidebar from "../components/Sidebar";
import Widget from "../components/Widget";
import { selectedUser } from "../features/auth/authSlice";
import { selectedModal } from "../features/modal/modalSlice";

const Home = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectedUser);
  const modalState = useSelector(selectedModal);

  useEffect(() => {
    // if user authenticated
    if (!currentUser.isAuthenticated) return navigate("/");
  }, [currentUser, navigate]);

  return (
    <main className="bg-primaryBackground relative min-h-screen  max-w-[1500px] flex mx-auto">
      <Sidebar />
      {/* Feed */}
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/postpage/:postId" element={<PostPage />} />
      </Routes>

      {/* Widget */}
      <Widget />

      {/* Modal */}
      {modalState.isModalOpen && <Modal />}
    </main>
  );
};
export default Home;
