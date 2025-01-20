import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
  const [login, setLogin] = useState(true);
  const { setShowLogin, backendUrl, setToken, setUser } =
    useContext(AppContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (login === true) {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", data.user.name);
          setShowLogin(false);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0.2, y: 0 }}
        transition={{ duration: 0.4 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-white p-10 rounded-xl text-slate-500 w-96"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium -mt-5 mb-3">
          {login ? "Login" : "Sign up"}
        </h1>
        <p className="text-sm">Welcome back! Please sign in to continue</p>
        {!login && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            <input
              className="outline-none text-base"
              type="text"
              placeholder="Full Name"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
        )}

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
          <img src={assets.email_icon} alt="" />
          <input
            className="outline-none text-base"
            type="email"
            placeholder="Email ID"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5 mb-4">
          <img src={assets.lock_icon} alt="" />
          <input
            className="outline-none text-base"
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        {!login && (
          <p className="text-sm text-blue-600 cursor-pointer">
            Forgot Password?
          </p>
        )}
        <button className="bg-blue-600 w-full text-white mt-4 py-2 rounded-full">
          {login ? "Login" : "Create Account"}
        </button>

        {login && (
          <p className="mt-5 text-center">
            Don&apos;t have an Account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setLogin(false)}
            >
              Sign up
            </span>
          </p>
        )}

        {!login && (
          <p className="mt-5 text-center">
            Already have an Account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setLogin(true)}
            >
              Login
            </span>
          </p>
        )}
        <img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          alt=""
          className="absolute top-5 right-5 cursor-pointer"
        />
      </motion.form>
    </div>
  );
}
