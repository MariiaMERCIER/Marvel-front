import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

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
          <div>
            <button>JOIN US</button>
            <Link to="/user/login">
              <p className="link">You have already an account?</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
