export type RootStackParamList = {
  Enter: undefined;
  LogIn: { username: string; password: string } | undefined;
  CreateAccount: undefined;
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
};
