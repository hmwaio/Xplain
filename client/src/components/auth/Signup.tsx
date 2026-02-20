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
      
    </>
  );
}

export default Signup;
