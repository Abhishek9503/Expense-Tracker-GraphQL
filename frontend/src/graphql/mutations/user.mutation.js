import { gql } from "@apollo/client";


export const SIGNUP_UP = gql`
    mutation SignUp($input: SignUpInput!) {
        signUp(input: $input) {
           
                _id
                name
                username
          
        }
    }
`;