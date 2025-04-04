import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { fetchAuthSession  } from 'aws-amplify/auth';

const uri = import.meta.env.VITE_BACKEND_URL;

const httpLink = createHttpLink({
  uri: uri,
  credentials: "include",
});

const authLink = setContext(async (_, { headers }) => {
  try {

    const { idToken } = (await fetchAuthSession()).tokens ?? {};

    return {
      headers: {
        ...headers,
        authorization: idToken ? `Bearer ${idToken}` : "",
      },
    };
  } catch (error) {
    console.log("Error fetching ID token:", error);
    return {
      headers,
    };
  }
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
