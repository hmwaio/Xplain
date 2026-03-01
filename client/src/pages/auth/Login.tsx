import { Github } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroImage1Copy from "../../assets/HeroImage1.png";
import { LabeledInput } from "../../components/ui/Input.js";
import { useAuth } from "../../context/auth.js";
import type { LoginInputType } from "../../types/auth.types.js";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  // const { login } = useAuth();
  const [postInputs, setPostInputs] = useState<LoginInputType>({
    email: "",
    password: "",
  });

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(postInputs);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  const signupHandler = async () => {
    await navigate("/signup");
  };
  const forgotAccountHandler = async () => {
    await navigate("/forgot-password");
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <h2 className="text-4xl mt-5 mb-8 md:mb-0 font-bold text-center">
          Welcome To <span className="text-orange-600">XPlain</span>
        </h2>
        <div className="h-full w-full md:flex justify-center items-center bg-white">
          <section className="hidden md:block md:w-1/2 ">
            <img src={HeroImage1Copy} alt="" />
          </section>

          <section className="h-full w-full md:w-1/2">
            <form
              onSubmit={loginHandler}
              className="flex justify-center items-center "
            >
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded">
                  {error}
                </div>
              )}
              <div className="w-xs md:w-lg flex flex-col items-center gap-6">
                <div className="w-full flex flex-col items-center gap-6 ">
                  <LabeledInput
                    label="Email"
                    value={postInputs.email}
                    placeholder="Enter your email address"
                    onchange={(e) =>
                      setPostInputs({ ...postInputs, email: e.target.value })
                    }
                  />
                  <LabeledInput
                    label="Password"
                    value={postInputs.password}
                    type="password"
                    placeholder="Enter your password"
                    onchange={(e) =>
                      setPostInputs({ ...postInputs, password: e.target.value })
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="text-lg font-semibold rounded-full w-full h-12 bg-orange-500/95 text-white hover:bg-orange-500 hover:cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Log in"}
                </button>
                <button
                  onClick={forgotAccountHandler}
                  className="text-lg font-semibold text-orange-600 hover:bg-gray-200 rounded-full w-full h-12 hover:cursor-pointer"
                >
                  Forgotten account?
                </button>
                <button
                  className="text-lg font-semibold text-orange-600 border rounded-full w-full h-12 hover:bg-gray-200 hover:cursor-pointer"
                  onClick={signupHandler}
                >
                  Don't have account
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
                  className="text-lg font-semibold rounded-full w-full h-12 bg-orange-500/95 text-white hover:bg-orange-500 hover:cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Continue with Google"}
                </button>
              </div>
            </form>
            <div className="mt-4 text-center text-2xl font-extrabold text-orange-600">
              <span className="text-3xl">X</span>Plain
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Login;
