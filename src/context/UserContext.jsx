import { useEffect, useState } from "react";
import { createContext } from "react";
import { API } from "../utility/constant";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [prozVerify, setProzVerify] = useState(
    localStorage.getItem("prozverify")
  );
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("demo")) {
      setProzVerify(searchParams.get("demo"));
      searchParams.delete("demo");
    }
  }, []);

  useEffect(() => {
    async function getProfile() {
      const res = await fetch(`${API}/user/getloggedInUser`, {
        headers: {
          authorization: `Bearer ${prozVerify}`,
          "Access-Control-Allow-Origin": "*",
        },
      });

      if (res.status === 200) {
        const data = await res.json();
        setUser(data.data);
        setProzVerify(localStorage.getItem("prozverify"));
      } else {
        const data = await res.json();
        toast.error(data.message);
        localStorage.clear("prozverify");
        setUser({});
        navigate("/", { replace: true });
      }
    }

    if (prozVerify) {
      getProfile();
    }
  }, [prozVerify]);

  function handleLogout() {
    localStorage.clear("prozverify");
    setUser(null);
    navigate("/", { replace: true });
  }
  return (
    <UserContext.Provider value={{ user, setUser, prozVerify, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
}
