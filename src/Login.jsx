import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSclice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./utils/constants";

const Login = () => {
  const [email,setEmail] = useState('test5@gmail.com')
  const [password,setPassword] = useState('Suraj@1208')
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async () => {
   try {
    const res = await axios.post(BASE_URL+"/login", {
      emailId:email,
      password: password,
    },{
      withCredentials:true
    });
    dispatch(addUser(res.data))
    return navigate('/')
   } catch (error) {
    setError(error?.response?.data)
    console.error(error);
   }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="card bg-black text-primary-content w-96">
        <div className="card-body">
          <h2 className="card-title label-text justify-center">  {isLoginForm ? "Login" : "Sign Up"}</h2>
          {!isLoginForm && (
              <>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
               </>
            )}
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Enter Email Address</span>
              </div>
              <input
                type="text"
                value={email}
                className="input input-bordered w-full max-w-xs"
                onChange={(e)=>setEmail(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Enter Password</span>
              </div>
              <input
                type="Password"
                value={password}
                className="input input-bordered w-full max-w-xs"
                onChange={(e)=>setPassword(e.target.value)}
              />
            </label>
          </div>
          <p className="text-red-700">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn"  onClick={isLoginForm ? handleLogin : handleSignUp}>{isLoginForm ? "Login" : "Sign Up"}</button>
          </div>
          <p
            className="m-auto cursor-pointer py-2 text-white"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New User? Signup Here"
              : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
