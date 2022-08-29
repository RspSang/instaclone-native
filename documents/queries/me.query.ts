import { gql } from "@apollo/client";

gql`
  query me {
    me {
      id
      username
      avatar
    }
  }
`;
