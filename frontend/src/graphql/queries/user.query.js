import { gql } from "@apollo/client";

export const GET_AUTHENTICATED_USER = gql`
  query getAuthenticatedUser {
    authUser {
      _id
      username
      name
      profilePicture
    }
  }
`;
