import { useContext, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";
import SocialLogin from "./SocialLogin";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { signIn, resetPassword, logOut } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    signIn(email, password)
      .then((res) => {
        // No way login if not verified
        if (!res.user.emailVerified) {
          logOut().then().catch();
          toast.error("Verify your Email first please!");
          return;
          // No way login if not verified end
        } else {
          toast("logged in success");
          navigate(location?.state ? location.state : "/");
        }
      })
      .catch((err) => toast(err.message));
  };

  const getEmail = useRef(null);
  const handleForgotPassword = () => {
    const email = getEmail.current.value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Give me a valid email address");
      return;
    } else {
      resetPassword(email)
        .then(toast("reset email sent!"))
        .catch((err) => toast(err.message));
    }
  };

  return (
    <div className="bg-green-50 p-5 rounded-lg">
      <Helmet>
        <title>BookHaven | Login</title>
      </Helmet>
      <h2 className="text-3xl font-bold italic text-center">Please Login</h2>
      <form onSubmit={handleLogin} className=" md:w-3/4 lg:w-1/2 mx-auto">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Email</span>
          </label>
          <input
            type="email"
            ref={getEmail}
            required
            name="email"
            placeholder="Email"
            className="input input-bordered border-green-500"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Password</span>
          </label>
          <input
            type="password"
            required
            name="password"
            placeholder="Password"
            className="input input-bordered border-green-500"
          />
          <label className="label">
            <button
              onClick={handleForgotPassword}
              type="button"
              className="label-text-alt link link-hover"
            >
              Forgot password?
            </button>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-success btn-outline">Login</button>
        </div>
      </form>
      <p className="text-center mt-4">
        Do not have an account{" "}
        <Link
          state={location.state}
          className="text-green-400 font-bold"
          to="/register"
        >
          Register
        </Link>
      </p>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
