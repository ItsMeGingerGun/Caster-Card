export interface User {
  fid: number;
  username: string;
  displayName: string;
  pfpUrl: string;
  bio: string;
  casts: number;
  replies: number;
  followers: number;
  following: number;
  score: number;
}

export interface ThemeConfig {
  backgroundColor: string;
  textColor: string;
  accentColor: string;
}
