import OpenAI from "openai";
import { Conversation } from "./Conversation";

export type TeasyGPTDefaults = {
  executeFunc: "auto" | "none";
  model: string;
  temperature?: number;
};

export class easyGPT {
  defaults: TeasyGPTDefaults = {
    executeFunc: "auto",
    model: "gpt-3.5-turbo-1106",
    temperature: 0.6,
  };

  client: OpenAI;
  conversations: Record<string, Conversation> = {};
  /**
   *
   * @param token OpenAI API token for making requests
   * @param options Default options for the client
   */
  constructor(token: string, options?: TeasyGPTDefaults) {
    if (!token) throw new Error("No API token provided");
    if (options) this.defaults = Object.assign(this.defaults, options);
    this.client = new OpenAI({ apiKey: token });
  }
}
