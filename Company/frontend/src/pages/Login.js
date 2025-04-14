import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../features/auth/authAPI";
import { setCredentials } from "../features/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      dispatch(
        setCredentials({
          user: data.user,
          access: data.access,
          refresh: data.refresh,
        })
      );
      navigate("/");
    },
    onError: (error) => {
      alert("Login failed: " + (error.response?.data?.detail || "Unknown error"));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ display: "block", width: "100%", marginBottom: "10px" }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ display: "block", width: "100%", marginBottom: "10px" }}
      />

      <button
        type="submit"
        disabled={mutation.isLoading}
        style={{ width: "100%", padding: "10px" }}
      >
        {mutation.isLoading ? "Logging in..." : "Login"}
      </button>

      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </form>
  );
};

export default Login;
