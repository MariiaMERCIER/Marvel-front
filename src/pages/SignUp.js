import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "../components/Input";

const SignUp = ({ handleTokenUsername }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleChangeSignUp = async (event) => {
    event.preventDefault();
    try {
      if (!name || !email || !password) {
        toast.error("Missing element of the form");
        return;
      }

      const response = await axios.post("http://localhost:4000/user/signup", {
        name: name,
        email: email,
        password: password,
      });

      handleTokenUsername(
        response.data.token,
        response.data.name,
        response.data.email
      );

      navigate("/");
      toast.success("You've juste created your account");
    } catch ({ error }) {
      console.log("errorSingIn >>", error.response.data.error);
    }
  };

  return (
    <div className="signup">
      <div className="container">
        <form onSubmit={handleChangeSignUp}>
          <Input
            type="text"
            placeholder="John John"
            value={name}
            setFunction={setName}
          />
          <Input
            type="email"
            placeholder="john@mail.ru"
            value={email}
            setFunction={setEmail}
          />
          <Input
            type="password"
            placeholder="azerty"
            value={password}
            setFunction={setPassword}
          />

          <button>JOIN US</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
