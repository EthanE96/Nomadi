import { ChatGroq } from "@langchain/groq";
import { NotFoundError } from "../models/errors.model";
import { getGlobalSettings } from "../utils/global-settings-cache.utils";

export class ModelService {
  /**
   * Retrieves AI model configuration from global settings.
   * Fetches model name, maximum tokens, and temperature settings from the database.
   */
  private async getModelInfo(): Promise<{ modelName: string; maxTokens: number; temperature: number }> {
    const existingSettings = await getGlobalSettings();

    if (!existingSettings) {
      throw new NotFoundError("Global settings not found");
    }

    if (!existingSettings.aiModel) {
      throw new NotFoundError("AI Model settings not found");
    }

    const { modelName, maxTokens, temperature } = existingSettings.aiModel;
    if (!modelName || !maxTokens || !temperature) {
      throw new NotFoundError("AI Model settings are incomplete");
    }

    return { modelName, maxTokens, temperature };
  }

  /**
   * Initializes and configures a ChatGroq AI model instance.
   * Creates a new ChatGroq model using the configuration retrieved from global settings.
   */
  async initializeModel(): Promise<ChatGroq> {
    const settings = await this.getModelInfo();

    return new ChatGroq({
      model: settings.modelName,
      maxTokens: settings.maxTokens,
      temperature: settings.temperature,
    });
  }
}
