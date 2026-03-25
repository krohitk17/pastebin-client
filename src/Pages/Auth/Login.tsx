import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormItem from "../../Components/FormItem";
import SubmitButton from "../../Components/Button";
import { useAuth } from "../../Contexts/AuthContext";
import { getAuthErrorMessage, loginHandler } from "../../Routes/authRoute";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setTokens, clearTokens } = useAuth();

  const handleSubmit = async () => {
    if (loading) {
      return;
    }

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);
    setError("");

    const res = await loginHandler({ email, password });
    const accessToken = res?.data?.accessToken;
    const refreshToken = res?.data?.refreshToken;
    const isSuccessStatus = res?.status === 200 || res?.status === 201;

    if (isSuccessStatus && accessToken && refreshToken) {
      setTokens(accessToken, refreshToken);
      navigate("/");
    } else {
      clearTokens();
      setError(getAuthErrorMessage(res, "Login failed"));
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Login</h1>

      <FormItem label="Email">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </FormItem>

      <FormItem label="Password">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </FormItem>

      {error && <p style={{ color: "red", margin: "1rem 0" }}>{error}</p>}

      <FormItem label="">
        <SubmitButton onClick={() => handleSubmit()}>
          {loading ? "Logging in..." : "Login"}
        </SubmitButton>
      </FormItem>

      <p style={{ marginTop: "1rem" }}>
        Don't have an account?{" "}
        <a href="/register" style={{ color: "blue", cursor: "pointer" }}>
          Register here
        </a>
      </p>
    </div>
  );
}
