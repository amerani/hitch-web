export const API_URL = process.env.NODE_ENV === 'production'
    ? 'https://api.hitch.cool/graphql'
    : 'http://localhost:8080/graphql';
