import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const SocialLogin = () => {
  const navigateTo = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const { googleLogin } = useAuth();

  const handleSocialLogin = async () => {
    try {
      const res = await googleLogin();
      const userData = {
        name: res?.user?.displayName,
        email: res?.user?.email.toLowerCase(),
        role: "guest",
      };

      try {
        await axiosSecure.put("/add-user", userData);
        toast.success("User logged in successfully");
        navigateTo(location?.state || "/");
      } catch (apiError) {
        toast.error(
          `Failed to add user: ${
            apiError.response?.data?.message || apiError.message
          }`
        );
      }
    } catch (err) {
      toast.error(`Login failed: ${err.message}`);
    }
  };

  return (
    <>
      <div className="divider max-w-2xl mx-auto italic">or</div>
      <div className="flex justify-around">
        <button
          className="flex items-center gap-2 bg-green-200 text-black px-4 py-2 rounded-lg"
          onClick={handleSocialLogin}
        >
          <FcGoogle className="text-2xl"></FcGoogle>{" "}
          <span>Continue with Google</span>
        </button>
      </div>
    </>
  );
};

export default SocialLogin;
