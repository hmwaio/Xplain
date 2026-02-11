import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import type { SignupInput } from "../../types/type.js";
import { LabeledInput } from "../reuse/Input.js";

function Registration() {
  const navigate = useNavigate();
  const { registration, loading, error } = useAuth();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    password: "",
  });

  async function loginRequest() {
    try {
      await registration(postInputs);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="border-2 w-full h-full">
        <div className="border-2 flex flex-col justify-center items-center">
          <h3 className="text-2xl font-bold text-blue-700">Register</h3>
          { error && <p className="text-red-500">{error}</p> }
          <div className="border w-2/3 flex flex-col gap-6 items-center">
            <LabeledInput
              label="Name"
              placeholder="Email your full name"
              onchange={(e) => setPostInputs({...postInputs, name: e.target.value})}
            />
            <LabeledInput
              label="Password"
              placeholder="Enter your password"
              onchange={(e) => setPostInputs({...postInputs, password: e.target.value})}
            />
            <button
              className="rounded-full w-full h-10 bg-blue-600 text-white hover:bg-blue-800 hover:cursor-pointer"
              onClick={loginRequest}
              disabled={loading}
            >
              { loading ? "Creating..." : "Create Account" }
            </button>
          </div>
        </div>
      </div>
    </>
  );
}


export default Registration;