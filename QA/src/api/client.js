import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { fetchAuthSession } from 'aws-amplify/auth';
import { toast } from "react-toastify";

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
    return {
      headers,
    };
  }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  let shouldLogout = false;
    
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      if (err.extensions?.code === 'UNAUTHENTICATED') {
        shouldLogout = true;
        break;
      }
    }
  }

  // if (networkError && networkError.message === 'Failed to fetch') {
  //   shouldLogout = true;
  // }

  if (networkError && 'statusCode' in networkError && networkError.statusCode === 401) {
    shouldLogout = true;
  }

  if (shouldLogout) {
    localStorage.clear();
    toast.error('Session expired. Please log in again')

    setTimeout(() => {
      window.location.href = '/login';
    }, 4000);
  }
});


const client = new ApolloClient({
  link: errorLink.concat(authLink).concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
