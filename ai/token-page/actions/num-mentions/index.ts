import { TOKEN_PAGE_NUM_MENTIONS_NAME } from "./name";
import { TOKEN_PAGE_NUM_MENTIONS_PROMPT } from "./prompt";
import { TokenPageNumMentionsInputSchema } from "./input-schema";
import { TokenPageNumMentionsResultBodyType } from "./types";
import { getNumMentions } from "./function";

import { TokenPageAction } from "../token-page-action";

export class TokenPageNumMentionsAction implements TokenPageAction<typeof TokenPageNumMentionsInputSchema, TokenPageNumMentionsResultBodyType> {
  private username: string;

  constructor(username: string) {
    this.username = username;
  }

  public name = TOKEN_PAGE_NUM_MENTIONS_NAME;
  public description = TOKEN_PAGE_NUM_MENTIONS_PROMPT;
  public argsSchema = TokenPageNumMentionsInputSchema;
  public func = (args: {}) => getNumMentions(this.username, args);
} 