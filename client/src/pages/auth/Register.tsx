import Otp from "../../components/auth/Otp";
import Registration from "../../components/auth/Registration";
import Signup from "../../components/auth/Signup";

function Register() {
  return (
    <>
      <Signup />
      <Otp />
      <Registration />
    </>
  );
}

export default Register;
