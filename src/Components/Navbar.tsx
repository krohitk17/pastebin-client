import { useEffect, useState } from "react";
import { SiPastebin } from "react-icons/si";
import { BsGithub } from "react-icons/bs";
import { useAuth } from "../Contexts/AuthContext";
import { logoutHandler } from "../Routes/authRoute";
import {
  deleteUserPasteHandler,
  getUserPastesHandler,
  UserPasteSummary,
} from "../Routes/userPasteRoute";

export default function Navbar() {
  const { isAuthenticated, accessToken, clearTokens } = useAuth();
  const [showOverlay, setShowOverlay] = useState(false);
  const [isLoadingPastes, setIsLoadingPastes] = useState(false);
  const [deletingUrl, setDeletingUrl] = useState("");
  const [pastesError, setPastesError] = useState("");
  const [userPastes, setUserPastes] = useState<UserPasteSummary[]>([]);

  useEffect(() => {
    const fetchUserPastes = async () => {
      if (!showOverlay || !isAuthenticated || !accessToken) {
        return;
      }

      setIsLoadingPastes(true);
      setPastesError("");

      const res = await getUserPastesHandler(accessToken);
      if (res.status === 200 && Array.isArray(res.data)) {
        setUserPastes(res.data);
      } else {
        if (res.status === 401) {
          clearTokens();
          setShowOverlay(false);
          return;
        }
        setPastesError(res?.data?.message || "Unable to load pastes");
      }

      setIsLoadingPastes(false);
    };

    fetchUserPastes();
  }, [showOverlay, isAuthenticated, accessToken]);

  const handleLogout = async () => {
    if (accessToken) {
      await logoutHandler(accessToken);
    }
    clearTokens();
    setShowOverlay(false);
    window.location.href = "/";
  };

  const handleDeletePaste = async (url: string) => {
    if (!accessToken || deletingUrl) {
      return;
    }

    setDeletingUrl(url);
    setPastesError("");

    const res = await deleteUserPasteHandler(accessToken, url);
    if (res.status === 200 && res.data?.success) {
      setUserPastes((prev) => prev.filter((paste) => paste.url !== url));
    } else if (res.status === 401) {
      clearTokens();
      setShowOverlay(false);
    } else {
      setPastesError(res?.data?.message || "Unable to delete paste");
    }

    setDeletingUrl("");
  };

  return (
    <div className="w-[100%] bg-red-100 sticky top-0 z-50 mb-2">
      <div className="container mx-auto flex flex-row py-5 justify-between items-center">
        <a
          href={process.env.REACT_APP_URL}
          className="flex items-center text-2xl"
        >
          <SiPastebin />
          <div className="pl-2">PASTEBIN</div>
        </a>
        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <div className="relative">
              <button
                type="button"
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                onClick={() => setShowOverlay(!showOverlay)}
              >
                My Account
              </button>

              {showOverlay && (
                <div className="absolute right-0 mt-2 w-[22rem] bg-white border border-gray-200 rounded shadow-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-semibold">My Pastes</p>
                    <button
                      type="button"
                      className="text-sm text-gray-600 hover:text-black"
                      onClick={() => setShowOverlay(false)}
                    >
                      Close
                    </button>
                  </div>

                  {isLoadingPastes && <p className="text-sm">Loading...</p>}

                  {!isLoadingPastes && pastesError && (
                    <p className="text-sm text-red-600">{pastesError}</p>
                  )}

                  {!isLoadingPastes && !pastesError && userPastes.length === 0 && (
                    <p className="text-sm text-gray-600">No pastes found.</p>
                  )}

                  {!isLoadingPastes && !pastesError && userPastes.length > 0 && (
                    <div className="max-h-64 overflow-auto space-y-2">
                      {userPastes.map((paste) => (
                        <div
                          key={paste.url}
                          className="p-2 border border-gray-100 rounded"
                        >
                          <a href={`/${paste.url}`} className="block hover:bg-gray-50 rounded">
                            <p className="font-medium truncate">{paste.title || "Untitled"}</p>
                            <p className="text-xs text-gray-600 truncate">/{paste.url}</p>
                          </a>
                          <div className="mt-2 flex justify-end">
                            <a
                              href={`/edit/${paste.url}`}
                              className="text-xs px-2 py-1 mr-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                              Update
                            </a>
                            <button
                              type="button"
                              className="text-xs px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-60"
                              disabled={deletingUrl === paste.url}
                              onClick={() => handleDeletePaste(paste.url)}
                            >
                              {deletingUrl === paste.url ? "Deleting..." : "Delete"}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    type="button"
                    className="mt-4 w-full px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {!isAuthenticated && (
            <>
              <a href="/login" className="px-4 py-2 text-blue-600 hover:underline">
                Login
              </a>
              <a
                href="/register"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Register
              </a>
            </>
          )}
          <a href={"https://github.com/servatom"}>
            <BsGithub size={30} />
          </a>
        </div>
      </div>
    </div>
  );
}
