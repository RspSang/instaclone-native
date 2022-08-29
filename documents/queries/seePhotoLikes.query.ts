import { gql } from "@apollo/client";

gql`
  query seePhotoLikes($id: Int!) {
    seePhotoLikes(id: $id) {
      id
      username
      avatar
      isFollowing
      isMe
    }
  }
`;
