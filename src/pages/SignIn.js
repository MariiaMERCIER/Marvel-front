import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignUp = ({ handleUserName, handleToken }) => {
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
      // console.log(name, email, password);
      const response = await axios.post("http://localhost:4000/user/signup", {
        name: name,
        email: email,
        password: password,
      });

      handleToken(response.data.token);
      handleUserName(response.data.name);
      // console.log(token);
      // console.log(response.data);
      navigate("/");
      toast.success("You've juste created your account");
    } catch ({ error }) {
      console.log(error.response.data.error);
    }
  };

  return (
    <div className="signin">
      <div className="container">
        <form onSubmit={handleChangeSignUp}>
          <input
            type="text"
            placeholder="John John"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <input
            type="email"
            placeholder="john@mail.ru"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="azerty"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <button>JOIN US</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
