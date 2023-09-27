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
import { useQuery } from "@apollo/client";

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
			//This forces to login every reload, comment if needed
			await removeUserTokenFromLocalStorage();

			const userDataFromLocalStorage = await getUserTokenFromLocalStorage();
			if (
				userDataFromLocalStorage?.userToken &&
				userDataFromLocalStorage?.userId
			) {
				setUserToken(userDataFromLocalStorage.userToken);
				setUserId(userDataFromLocalStorage.userId);
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
