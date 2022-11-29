import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const LogIn = ({ handleTokenUsername }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

      handleTokenUsername(
        response.data.token,
        response.data.name,
        response.data.email
      );

      navigate("/");
      toast.success("Welcome in the world MARVEL");
    } catch ({ error }) {
      console.log("catchLogin >>", error.response.message);
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
