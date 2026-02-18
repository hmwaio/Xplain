import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import type { SendOTPInput } from "../../types/type.js";
import { LabeledInput } from "../ui/Input.js";

function Signup() {
  const navigate = useNavigate();
  const { signup, loading, error } = useAuth();
  const [postInputs, setPostInputs] = useState<SendOTPInput>({
    email: "",
  });

  async function loginRequest() {
    try {
      await signup(postInputs);
      // navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }
  async function signinHandler() {
    navigate("/login");
  }

  return (
    <>
      <div className="border-2 w-full h-full">
        <div className="border-2 flex flex-col justify-center items-center">
          <h3 className="text-2xl font-bold text-blue-700">Create Account</h3>
          {error && <p className="text-red-500">{error}</p>}
          <div className="border w-2/3 flex flex-col gap-6 items-center">
            <LabeledInput
              label="Email"
              placeholder="Email your email"
              onchange={(e) =>
                setPostInputs({ ...postInputs, email: e.target.value })
              }
            />
            <button
              className="rounded-full w-full h-10 bg-blue-600 text-white hover:bg-blue-800 hover:cursor-pointer"
              onClick={loginRequest}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Code"}
            </button>
            <button
              className="border rounded-full w-full h-10 hover:bg-blue-600 hover:text-white hover:cursor-pointer"
              onClick={signinHandler}
            >
              Already have an account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
