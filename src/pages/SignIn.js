import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

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

      setToken(token);

      navigate("/");
      toast.success("You've juste created your account");
      console.log(response.data);
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
