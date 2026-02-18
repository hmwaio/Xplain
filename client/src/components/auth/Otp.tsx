import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import type { OTPInput } from "../../types/type.js";
import { LabeledInput } from "../ui/Input.js";

function Otp() {
  const navigate = useNavigate();
  const { otpinput, loading, error } = useAuth();
  const [postInputs, setPostInputs] = useState<OTPInput>({
    otp: "",
  });

  async function loginRequest() {
    try {
      await otpinput(postInputs);
      navigate("/registration");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="border w-full h-full">
        <div className="border flex flex-col justify-center items-center">
          {error && <p className="text-red-500">{error}</p>}
          <div className="border w-2/3 flex flex-col gap-6 items-center">
            <LabeledInput
              label="One Time Password"
              placeholder="Enter OTP"
              onchange={(e) =>
                setPostInputs({ ...postInputs, otp: e.target.value })
              }
            />
            <button
              className="rounded-full w-full h-10 bg-blue-600 text-white hover:bg-blue-800 hover:cursor-pointer"
              onClick={loginRequest}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Otp;
