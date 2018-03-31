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

const httpLink = new HttpLink({ uri: 'http://localhost:8080/graphql', fetch});

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
  link: httpLink,// concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
  ssrMode: true
});

const signup = gql`
    mutation($email: String!) {
        signup(email: $email, password: "password") {
          id,
          jwt
        }
    }
`;

const listTrip = gql`
    mutation ($email: String!) {
        createMinimalTrip (
            origin: "Austin",
            destination: "New York",
            arrival:"2013-02-04T18:35:24+00:00",
            departure: "2013-02-04T18:35:24+00:00",
            transportType: CAR,
            reservationType: SEAT,
            email: $email
        ) {
            id
        }
    }
`;

(async () => {
    const email = `${DateTime.utc().toString()}@mail.com`
    const res = await client.mutate({
        mutation: signup,
        variables: {
            email
        }
    })

    const token = localStorage.token = res.data.signup.jwt;

    const tripRes = await client.mutate({
        mutation: listTrip, 
        variables: {email},
        context: { 
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    });        

    console.log(tripRes)
})()
.catch(console.log)