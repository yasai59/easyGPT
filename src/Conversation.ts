import OpenAI from "openai";
import {
  ChatCompletionCreateParams,
  ChatCompletionMessage,
  ChatCompletionMessageParam,
} from "openai/resources";
import { TeasyGPTDefaults } from ".";

export class Conversation {
  sysMessage: ChatCompletionMessageParam;
  messages: ChatCompletionMessageParam[] = [];

  defaults: TeasyGPTDefaults;
  client: OpenAI;

  constructor(sysprompt: string, defaults: TeasyGPTDefaults, client: OpenAI) {
    this.sysMessage = { content: sysprompt, role: "system" };
    this.defaults = defaults;
    this.client = client;
  }

  /**
   *
   * @param message Message to send to the GPT API
   * @returns Promise of the response from the API
   */
  async sendMessage(message: string): Promise<ChatCompletionMessage> {
    this.messages.push({ content: message, role: "user" });
    const requestBody: ChatCompletionCreateParams = {
      model: this.defaults.model,
      messages: [this.sysMessage, ...this.messages],
      temperature: this.defaults.temperature,
    };

    const response = await this.client.chat.completions.create(requestBody);
    const completion = response.choices[0].message;
    this.messages.push(completion);

    return completion;
  }
}
