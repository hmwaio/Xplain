import { Facebook, Github } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../api/auth.api";
import { LabeledInput } from "../../components/ui/Input";
import { useAuth } from "../../context/auth";

type Step = "email" | "otp" | "registration";

function Register() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [tempToken, setTempToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUser } = useAuth();
  const navigate = useNavigate();

  /* Send OTP */
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authAPI.sendOtp({ email });
      setStep("otp");
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to send otp");
    } finally {
      setLoading(false);
    }
  };

  /* Verify OTP */
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authAPI.verifyOtp({ email, otp });
      setTempToken(response.data.tempToken);
      setStep("registration");
    } catch (err: any) {
      setError(err.response?.data?.error || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  /* Complete Registration */
  const handleCompleteSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authAPI.completeRegistration({ name, password }, tempToken);
      // setUser(response.data.user);
      const me = await authAPI.getMe();
      setUser(me.data);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const signinHandler = async () => {
    navigate("/login");
  };

  return (
    <>
      <div className=" w-full h-full">
        <div className=" font-bold flex flex-col justify-center items-center">
          <div className="mb-20 mt-5">
            <h2 className="text-3xl font-bold text-center">Create Account</h2>
            <p className="mt-2 text-4xl text-center text-gray-600">
              Join <span className="text-orange-500">XPlain</span> Now
            </p>
          </div>
          <div className="w-xs md:w-3/4 flex items-center justify-center">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded">{error}</div>
            )}

            {/* Step 1: Email */}
            {step === "email" && (
              <form onSubmit={handleSendOTP} className="w-full md:w-1/2">
                <div className="w-full flex flex-col gap-6 items-center justify-center">
                  <LabeledInput
                    type="email"
                    value={email}
                    label="Email"
                    placeholder="Enter your email address"
                    onchange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="text-lg font-semibold rounded-full w-full h-12 bg-orange-500/95 text-white hover:bg-orange-500 hover:cursor-pointer"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Continue with email"}
                  </button>
                  <button
                    className="mb-10 text-lg font-semibold text-orange-600 border rounded-full w-full h-12 hover:bg-gray-200 hover:cursor-pointer"
                    onClick={signinHandler}
                  >
                    Already have an account
                  </button>
                  <button
                    type="button"
                    className="flex justify-center items-center gap-3 text-lg font-semibold rounded-full w-full h-12 bg-black text-white hover:bg-orange-500 hover:cursor-pointer"
                    disabled={loading}
                  >
                    Continue with{" "}
                    <span className="">
                      <Github />
                    </span>
                  </button>
                  <button
                    type="button"
                    className="relative overflow-hidden h-12 w-full rounded-full font-semibold text-white text-lg google-colors"
                    disabled={loading}
                  >
                    Continue with G
                  </button>
                  <button
                    type="submit"
                    className="flex justify-center items-center gap-2 text-lg font-semibold rounded-full w-full h-12 bg-blue-500/95 text-white hover:bg-orange-500 hover:cursor-pointer"
                    disabled={loading}
                  >
                    Continue with{" "}
                    <span>
                      <Facebook />
                    </span>
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: OTP */}
            {step === "otp" && (
              <form onSubmit={handleVerifyOTP} className="w-1/2">
                <div className="w-full flex flex-col gap-6 items-center justify-center">
                  <LabeledInput
                    label={`Enter OTP sent to ${email}`}
                    value={otp}
                    placeholder="Enter OTP"
                    onchange={(e) => setOtp(e.target.value)}
                    maxlength={6}
                  />
                  <button
                    type="submit"
                    className="rounded-full w-full h-10 bg-blue-600 text-white hover:bg-blue-800 hover:cursor-pointer"
                    disabled={loading}
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep("email")}
                    className="w-full text-sm text-gray-600 hover:underline"
                  >
                    Change email
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Registration */}
            {step === "registration" && (
              <form onSubmit={handleCompleteSignup} className="w-1/2">
                <div className="w-full flex flex-col gap-6 items-center justify-center">
                  <LabeledInput
                    label="Name"
                    value={name}
                    placeholder="Enter your full name"
                    onchange={(e) => setName(e.target.value)}
                  />
                  <LabeledInput
                    type="password"
                    label="Password"
                    value={password}
                    placeholder="Enter your password"
                    onchange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="rounded-full w-full h-10 bg-blue-600 text-white hover:bg-blue-800 hover:cursor-pointer"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Account"}
                  </button>
                  <button
                    className="border rounded-full w-full h-10 hover:bg-blue-600 hover:text-white hover:cursor-pointer"
                    onClick={signinHandler}
                  >
                    I already have an account
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
