import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from "expo-constants";
import { Logs } from "expo";

Logs.enableExpoCliLogging();

const { manifest2 } = Constants;

const ip = "192.168.0.1";

const api = (typeof manifest2?.extra?.expoGo?.packagerOpts === `object`) && manifest2.extra.expoGo.packagerOpts.dev
  ? manifest2.extra.expoGo.debuggerHost?.split(`:`)?.shift()?.concat(`:4000`)
  : `http://${ip}:4000`;
  
console.log("api",api);

const httpLink = createHttpLink({
  uri: api,
});

console.log("http",httpLink);

const authLink = setContext(
  async ( _ , { headers }) => {
    const token = await AsyncStorage.getItem('token');
      return {
          headers: {
              ...headers,
              authorization: token ? `Bearer ${token}` : '',
            },
          };
        });

console.log("auth",authLink);
console.log("addsdbfdhfg", authLink.concat(httpLink));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  // link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
