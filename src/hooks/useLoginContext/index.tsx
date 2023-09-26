import {
  Dispatch,
  FC,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getUserTokenFromLocalStorage,
  removeUserTokenFromLocalStorage,
} from "./localStorage";

interface LoginContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  userToken: string;
  setUserToken: Dispatch<SetStateAction<string>>;
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
}

export const LoginContext = createContext<LoginContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userToken: "",
  setUserToken: () => {},
  userId: "",
  setUserId: () => {},
});

export const LoginContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    (async () => {
      const userToken = await getUserTokenFromLocalStorage();
      if (userToken?.userToken) {
        setUserToken(userToken.userToken);
        setIsLoggedIn(true);
      }
    })();
  }, []);

  const providerValue = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
      userToken,
      setUserToken,
      userId,
      setUserId,
    }),
    [isLoggedIn, setIsLoggedIn]
  );

  return (
    <LoginContext.Provider value={providerValue}>
      {children}
    </LoginContext.Provider>
  );
};

const useLoginContext = () => {
  return useContext(LoginContext);
};

export default useLoginContext;
