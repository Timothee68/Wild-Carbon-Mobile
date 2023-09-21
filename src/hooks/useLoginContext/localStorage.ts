import AsyncStorage from "@react-native-async-storage/async-storage";
import localStorageObjectSchema from "../../helpers/localStorageObjectSchema";
import { z } from "zod";

interface LocalStorageUserToken {
  userToken?: string;
}

const LocalStorageUserTokenSchema = z.object({
  userToken: z.string(),
});

const USER_TOKEN_LOCAL_STORAGE_KEY = "userTokenData";

export const getUserTokenFromLocalStorage =
  async (): Promise<LocalStorageUserToken | null> => {
    const userTokenData = localStorageObjectSchema
      .pipe(LocalStorageUserTokenSchema)
      .safeParse(await AsyncStorage.getItem(USER_TOKEN_LOCAL_STORAGE_KEY));
    console.log("userTokenData", userTokenData);
    if (userTokenData.success) {
      return userTokenData.data;
    }

    return null;
  };

export const saveUserTokenInLocalStorage = async (
  userTokenObj: LocalStorageUserToken
) => {
  await AsyncStorage.setItem(
    USER_TOKEN_LOCAL_STORAGE_KEY,
    JSON.stringify(userTokenObj)
  );
};

export const removeUserTokenFromLocalStorage = async () => {
  await AsyncStorage.removeItem(USER_TOKEN_LOCAL_STORAGE_KEY);
};
