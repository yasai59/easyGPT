import OpenAI from "openai";

type TeasyGPTDefaults = {
  executeFunc: "auto" | "none";
};

export class easyGPT {
  defaults: TeasyGPTDefaults = {
    executeFunc: "auto",
  };

  client: OpenAI;
  /**
   *
   * @param token OpenAI API token for making requests
   * @param options Default options for the client
   */
  constructor(token: string, options?: TeasyGPTDefaults) {
    this.defaults = { ...this.defaults, ...options };

    this.client = new OpenAI({ apiKey: token });
  }
}
