const fetch = require('node-fetch');
const { ApolloClient } = require('apollo-client');
const { HttpLink } = require('apollo-link-http');
const { ApolloLink, concat} = require('apollo-link');
const { InMemoryCache } = require( 'apollo-cache-inmemory');
const gql = require('graphql-tag');
const { DateTime } = require('luxon');

const localStorage = {
    token: null
}

const httpLink = new HttpLink({ uri: 'http://localhost:3000/graphql', fetch});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  if(localStorage.token){
    operation.setContext({
        headers: {
          authorization: `Bearer ${localStorage.token}`
        }
      });
  }
  return forward(operation);
})

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
  ssrMode: true
});

const signup = gql`
    mutation($email: String!) {
        signup(email: $email, password: "password", username: $email) {
          id,
          jwt
        }
    }
`;

const listTrip = gql`
    mutation {
        createMinimalTrip (
            origin: "Austin",
            destination: "New York",
            arrival:"2013-02-04T18:35:24+00:00",
            departure: "2013-02-04T18:35:24+00:00",
            transportType: "car",
            reservationType: "seat"
        ) {
            id
        }
    }
`;

(async () => {
    const res = await client.mutate({
        mutation: signup,
        variables: {
            email: `${DateTime.utc().toString()}@mail.com`
        }
    })

    localStorage.token = res.data.signup.jwt;

    const tripRes = await client.mutate({mutation: listTrip});

    console.log(tripRes)
})()
.catch(console.log)