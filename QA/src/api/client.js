import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { getCurrentUser } from 'aws-amplify/auth';

const uri = import.meta.env.VITE_BACKEND_URL;

const httpLink = createHttpLink({
  uri: uri,
  credentials: "include",
});

const authLink = setContext(async (_, { headers }) => {
  try {
    const currentUser = await getCurrentUser();

    console.log(currentUser)
    const idToken = currentUser.signInUserSession.idToken.jwtToken;

    return {
      headers: {
        ...headers,
        authorization: idToken ? `Bearer ${idToken}` : "",
      },
    };
  } catch (error) {
    console.error("Error fetching ID token:", error);
    return {
      headers,
    };
  }
});


const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      if (err.message === "Token has expired.") {
        Auth.signOut();
        window.location.href = "/signIn";
      }
    }
  }
});

const client = new ApolloClient({
  link: errorLink.concat(authLink).concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
