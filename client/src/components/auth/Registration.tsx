import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import type { SignupInput } from "../../types/type.js";
import { LabeledInput } from "../ui/Input.js";

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
      
    </>
  );
}

export default Registration;
