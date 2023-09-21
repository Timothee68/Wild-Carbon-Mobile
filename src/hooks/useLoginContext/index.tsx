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
import { getUserTokenFromLocalStorage } from "./localStorage";

interface LoginContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  userToken: string | undefined;
  setUserToken: Dispatch<SetStateAction<string | undefined>>;
}

export const LoginContext = createContext<LoginContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userToken: undefined,
  setUserToken: () => {},
});

export const LoginContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const userToken = await getUserTokenFromLocalStorage();
      setUserToken(userToken?.userToken);
      setIsLoggedIn(!!userToken?.userToken);
    })();
  }, []);

  const providerValue = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
      userToken,
      setUserToken,
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
