export interface Profile {
  id: number;
  handle: string;
  name: string;
  bio: string;
  avatar: string;
  following: boolean;
  followerCount: number;
  followingCount: number;
}
