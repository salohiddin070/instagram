import { createContext, useContext, useEffect, useState } from "react";

const InfoContext = createContext();

export const useInfoContext = () => useContext(InfoContext);

export default function InfoContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isPostChange, setIsPostChange] = useState(false);

  useEffect(() => {
    let currentUser = localStorage.getItem("user");
    if (currentUser) {
      currentUser = JSON.parse(currentUser);
      setUser(currentUser);
    }
  }, []);
  return (
    <InfoContext.Provider
      value={{ user, setUser, isPostChange, setIsPostChange }}
    >
      <InfoContext.Consumer>{() => children}</InfoContext.Consumer>
    </InfoContext.Provider>
  );
}
