import { gql } from "@apollo/client";

gql`
  query seePhoto($id: Int!) {
    seePhoto(id: $id) {
      id
      file
      likes
      commentNumber
      isLiked
      user {
        id
        username
        avatar
      }
      caption
    }
  }
`;
