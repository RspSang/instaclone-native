import { gql } from "@apollo/client";

gql`
  query seeRooms {
    seeRooms {
      id
      unreadTotal
      users {
        avatar
        username
      }
    }
  }
`;
