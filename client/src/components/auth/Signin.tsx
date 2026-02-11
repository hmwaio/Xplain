import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import type { LoginInput } from "../../types/type.js";
import { LabeledInput } from "../reuse/Input.js";

function Signin() {
  const navigate = useNavigate();
  const { signin, loading, error } = useAuth();
  const [postInputs, setPostInputs] = useState<LoginInput>({
    email: "",
    password: "",
  });

  async function loginRequest() {
    try {
      await signin(postInputs);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }
  async function signupHandler() {
    navigate("/signup");
  }

  return (
    <>
      <div className="w-full h-full">
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-2xl  font-bold text-blue-700">Login</h3>
          { error && <p className="text-red-500">{error}</p> }
          <div className="border w-2/3 flex flex-col gap-6 items-center">
            <LabeledInput
              label="Email"
              placeholder="Email your email"
              onchange={(e) => setPostInputs({...postInputs, email: e.target.value})}
            />
            <LabeledInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              onchange={(e) => setPostInputs({...postInputs, password: e.target.value})}
            />
            <button
              className="rounded-full w-full h-10 bg-blue-600 text-white hover:bg-blue-800 hover:cursor-pointer"
              onClick={loginRequest}
              disabled={loading}
            >
              { loading ? "Logging in..." : "Login" }
            </button>
            <button
              className="border rounded-full w-full h-10 hover:bg-blue-600 hover:text-white hover:cursor-pointer"
              onClick={signupHandler}
            >
              Don't have account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
