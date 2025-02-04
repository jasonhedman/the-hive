export type TokenUsersOverTime = {
  mint: string;
  token_name: string;
  day: string;
  activeUserCount: number;
}

export type TokenUsersOverTimeResponse = TokenUsersOverTime[];