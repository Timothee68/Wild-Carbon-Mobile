import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Constants from "expo-constants";
import { Logs } from "expo";
import { getUserTokenFromLocalStorage } from "../src/hooks/useLoginContext/localStorage";

Logs.enableExpoCliLogging();

const { manifest2 } = Constants;

const http = "http://";

const ip = "192.168.0.0";

const api =
  typeof manifest2?.extra?.expoGo?.packagerOpts === `object` &&
  manifest2.extra.expoGo.packagerOpts.dev
    ? http +
      manifest2.extra.expoGo.debuggerHost
        ?.split(`:`)
        ?.shift()
        ?.concat(`:4000/graphql`)
    : `http://${ip}:4000/graphql`;

const httpLink = createHttpLink({
  uri: api,
});

const authLink = setContext(async (_, { headers }) => {
  const userDataFromLocalStorage = await getUserTokenFromLocalStorage();
  return {
    headers: {
      ...headers,
      authorization: userDataFromLocalStorage
        ? `Bearer ${userDataFromLocalStorage.userToken}`
        : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
