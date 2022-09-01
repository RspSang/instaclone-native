export type RootStackParamList = {
  Enter: undefined;
  LogIn: { username: string; password: string } | undefined;
  CreateAccount: undefined;
  Tabs: undefined;
};

export type SharedStackNavParamList = {
  Feed: undefined;
  Search: undefined;
  Notifications: undefined;
  Me: undefined;
  Profile: { username: string; id: number };
  Photo: { photoId: number };
  Likes: { photoId: number };
  Comments: undefined;
  SelectPhoto: undefined;
  TakePhoto: undefined;
  Tabs: undefined;
  UploadForm: { file: string };
  Messages: undefined;
  Room: {
    id: number;
    talkingTo:
      | {
          __typename?: "User" | undefined;
          username: string;
          avatar?: string | null | undefined;
        }
      | null
      | undefined;
  };
  [key: string]: any;
};
