import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormItem from "../../Components/FormItem";
import SubmitButton from "../../Components/Button";
import { useAuth } from "../../Contexts/AuthContext";
import { getAuthErrorMessage, registerHandler } from "../../Routes/authRoute";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setTokens, clearTokens } = useAuth();

  const handleSubmit = async () => {
    if (loading) {
      return;
    }

    if (!email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    const res = await registerHandler({ email, password });
    const accessToken = res?.data?.accessToken;
    const refreshToken = res?.data?.refreshToken;
    const isSuccessStatus = res?.status === 200 || res?.status === 201;

    if (isSuccessStatus && accessToken && refreshToken) {
      setTokens(accessToken, refreshToken);
      navigate("/");
    } else {
      clearTokens();
      setError(getAuthErrorMessage(res, "Registration failed"));
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Register</h1>

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

      <FormItem label="Confirm Password">
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </FormItem>

      {error && <p style={{ color: "red", margin: "1rem 0" }}>{error}</p>}

      <FormItem label="">
        <SubmitButton onClick={() => handleSubmit()}>
          {loading ? "Registering..." : "Register"}
        </SubmitButton>
      </FormItem>

      <p style={{ marginTop: "1rem" }}>
        Already have an account?{" "}
        <a href="/login" style={{ color: "blue", cursor: "pointer" }}>
          Login here
        </a>
      </p>
    </div>
  );
}
