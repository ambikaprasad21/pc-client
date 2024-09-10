import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { API } from "../utility/constant";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [prozVerify, setProzVerify] = useState(
    localStorage.getItem("prozverify")
  );
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (searchParams.get("demo")) {
      setProzVerify(searchParams.get("demo"));
      localStorage.setItem("prozverify", searchParams.get("demo"));
    }
  }, []);

  useEffect(() => {
    async function getProfile() {
      const res = await fetch(`${API}/user/getloggedInUser`, {
        headers: {
          Authorization: `Bearer ${prozVerify}`,
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
    queryClient.clear();
    localStorage.clear("prozverify");
    setUser(null);
    navigate("/", { replace: true });
    window.location.reload(true);
  }
  return (
    <UserContext.Provider
      value={{ user, setUser, prozVerify, setProzVerify, handleLogout }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("UserContext used outside the UserProvider");
  }

  return context;
}

export { UserContext, useUser };
