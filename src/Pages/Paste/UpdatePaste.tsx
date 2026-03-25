import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormItem from "../../Components/FormItem";
import SubmitButton from "../../Components/Button";
import { useAuth } from "../../Contexts/AuthContext";
import { BodyContextProvider, bodyContext } from "../../Contexts/BodyContext";
import {
  SyntaxContextProvider,
  syntaxContext,
} from "../../Contexts/SyntaxContext";
import TextArea from "../Home/TextArea";
import {
  getUserPasteHandler,
  UpdateUserPasteData,
  updateUserPasteHandler,
} from "../../Routes/userPasteRoute";

function UpdatePasteForm() {
  const { url } = useParams();
  const navigate = useNavigate();
  const { accessToken, clearTokens } = useAuth();
  const bodyData = useContext(bodyContext);
  const syntaxContextData = useContext(syntaxContext);

  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [clearPassword, setClearPassword] = useState(false);
  const [expiresAt, setExpiresAt] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFetchingExisting, setIsFetchingExisting] = useState(true);
  const effectiveAccessToken = accessToken || localStorage.getItem("accessToken");

  useEffect(() => {
    const loadPaste = async () => {
      if (!url) {
        setError("Invalid paste URL");
        setIsFetchingExisting(false);
        return;
      }

      if (!effectiveAccessToken) {
        setError("Please login again");
        setIsFetchingExisting(false);
        return;
      }

      const res = await getUserPasteHandler(effectiveAccessToken, url);
      if (res.status === 200 || res.status === 201) {
        setTitle(res.data?.title || "");
        bodyData.setBody(res.data?.body || "");
        syntaxContextData.setSyntax(res.data?.syntax || "text");
      } else if (res.status === 401) {
        clearTokens();
        navigate("/login");
        return;
      } else {
        setError(res?.data?.message || "Unable to load paste");
      }

      setIsFetchingExisting(false);
    };

    loadPaste();
  }, [url, accessToken]);

  const buildUpdatePayload = (): UpdateUserPasteData => {
    const payload: UpdateUserPasteData = {};

    if (title.trim() !== "") {
      payload.title = title.trim();
    }
    if (bodyData.body.trim() !== "") {
      payload.body = bodyData.body;
    }
    payload.syntax = syntaxContextData.syntax;

    if (clearPassword) {
      payload.clearPassword = true;
    } else if (password.trim() !== "") {
      payload.password = password;
    }

    if (expiresAt !== "") {
      payload.expiresAt = expiresAt;
    }

    return payload;
  };

  const handleUpdate = async () => {
    if (!url) {
      setError("Invalid paste URL");
      return;
    }

    if (!effectiveAccessToken) {
      setError("Please login again");
      navigate("/login");
      return;
    }

    const payload = buildUpdatePayload();
    if (Object.keys(payload).length === 0) {
      setError("Please fill at least one field to update");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    const res = await updateUserPasteHandler(effectiveAccessToken, url, payload);

    if (res.status === 200 || res.status === 201) {
      setSuccess("Paste updated successfully");
    } else if (res.status === 401) {
      clearTokens();
      navigate("/login");
    } else {
      setError(res?.data?.message || "Unable to update paste");
    }

    setLoading(false);
  };

  return (
    <div>
      {isFetchingExisting && (
        <p className="text-sm text-gray-600 my-2">Loading existing paste...</p>
      )}

      <h1 className="pb-1 border-black border-b-2 font-bold">Update Settings</h1>

      <FormItem label="Syntax Highlighting">
        <input
          type="checkbox"
          checked={syntaxContextData.isHighlighted}
          onChange={(e) => syntaxContextData.setisHighlighted(e.target.checked)}
        />
      </FormItem>

      <FormItem label="Syntax">
        <select
          value={syntaxContextData.syntax}
          onChange={(e) => syntaxContextData.setSyntax(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="text">Text</option>
          <option value="javascript">JavaScript</option>
          <option value="css">CSS</option>
          <option value="html">HTML</option>
          <option value="typescript">TypeScript</option>
          <option value="json">JSON</option>
          <option value="jsx">JSX</option>
          <option value="tsx">TSX</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="c">C</option>
        </select>
      </FormItem>

      <FormItem label="Expires In" id="expiry-select">
        <select
          value={expiresAt}
          onChange={(e) => setExpiresAt(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Keep unchanged</option>
          <option value="0">Burn On Read</option>
          <option value="10m">10 Minutes</option>
          <option value="1h">1 Hour</option>
          <option value="6h">6 Hours</option>
          <option value="1d">1 Day</option>
          <option value="1w">1 Week</option>
          <option value="1M">1 Month</option>
        </select>
      </FormItem>

      <FormItem label="Password">
        <input
          placeholder="Set new password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={clearPassword}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </FormItem>

      <FormItem label="Clear Password">
        <input
          type="checkbox"
          checked={clearPassword}
          onChange={(e) => setClearPassword(e.target.checked)}
        />
      </FormItem>

      <FormItem label="Paste Name/ Title">
        <input
          placeholder="Paste title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </FormItem>

      <p className="text-sm text-gray-600 mt-2">Paste URL: {url}</p>

      {error && <p className="text-red-600 my-3">{error}</p>}
      {success && <p className="text-green-600 my-3">{success}</p>}

      <div className="flex flex-row items-center gap-3 my-5">
        <SubmitButton onClick={handleUpdate}>
          {loading ? "Updating..." : "Update Paste"}
        </SubmitButton>
        <a
          href={url ? `/${url}` : "/"}
          className="px-4 py-2 border border-gray-300 rounded"
        >
          Back
        </a>
      </div>
    </div>
  );
}

export default function UpdatePaste() {
  return (
    <BodyContextProvider>
      <SyntaxContextProvider>
        <TextArea />
        <UpdatePasteForm />
      </SyntaxContextProvider>
    </BodyContextProvider>
  );
}
