import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  const handleChangeLogIn = async (event) => {
    event.preventDefault();

    try {
      if (!email || !password) {
        toast.error("Missing element of the form");
        return;
      }

      const response = await axios.post("http://localhost:4000/user/login", {
        email: email,
        password: password,
      });

      setToken(token);

      navigate("/");

      console.log(response.data);
    } catch ({ error }) {
      console.log(error.response.message);
    }
  };

  return (
    <div className="signin">
      <div className="container">
        <form onSubmit={handleChangeLogIn}>
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

export default LogIn;
