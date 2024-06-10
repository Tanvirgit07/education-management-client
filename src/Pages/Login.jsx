import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { toast } from "sonner";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const [registerError, setRegisterError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const login = {
      email,
      password,
    };
    console.log(login);
    setRegisterError("");

    loginUser(email, password)
      .then((result) => {
        console.log(result.user);
        // navigate(location?.state ? location?.state : "/");
        toast.success("Login Successfully!");
        setTimeout(() => {
          // navigate(location?.state ? location.state : "/");
        }, 2000);
      })
      .catch((error) => {
        console.log(error.message);
        setRegisterError(error.message);
      });
  };

  const handleGoogleIn = () => {
    googleLogin()
      .then((result) => {
        console.log(result.user);
        toast.success("Login Successfully!");
        setTimeout(() => {
          // navigate(location?.state ? location.state : "/");
        }, 2000);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div
      className="hero min-h-[95vh] max-w-4xl mx-auto mt-5 mb-3"
      style={{
        backgroundImage:
          "url(https://i.ibb.co/6tSBKYN/triangles-1430105-1280.png)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
        <form onSubmit={handleLogin} className="card-body">
          <div className="form-control">
            <p className="mb-1 ml-1">Email</p>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="email"
                name="email"
                className="grow"
                placeholder="Email"
              />
            </label>
          </div>
          <div className="form-control mt-4 relative">
            <p className="ml-1 mb-1">Password</p>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type={showPass ? "text" : "password"}
                name="password"
                className="grow"
                placeholder="*******"
              />
            </label>
          </div>
          <span
            className="absolute right-[43px] mt-[143px] text-xl"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </span>
          {registerError && <p className="text-red-600">{registerError}</p>}
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
          <div>
            <p>
              You have not an account?
              <Link to="/register" className="link link-primary">
                Register
              </Link>
            </p>
          </div>
        </form>
        <div className="divider divider-secondary">Login with</div>
        <div
          onClick={handleGoogleIn}
          className="w-9/12 mx-auto flex justify-center"
        >
          <button className="btn w-full mb-8 mt-4">
            <img
              className="w-10 h-10"
              src="https://i.ibb.co/Jz90snM/google.png"
              alt=""
            />
            Google Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
