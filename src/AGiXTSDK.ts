import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface ApiResponse<T> {
  data: T;
  error?: string;
}

interface PromptArgs {
  [key: string]: any;
}

interface AgentSettings {
  [key: string]: any;
}

interface CommandArgs {
  [key: string]: any;
}

interface StepPrompt {
  prompt_type: string;
  prompt: PromptArgs;
  agent_name: string;
  step_number: number;
}

interface StepMove {
  old_step_number: number;
  new_step_number: number;
}

interface StepUpdate {
  prompt_type: string;
  prompt: PromptArgs;
  agent_name: string;
  step_number: number;
}

class AGiXTSDK {
  private baseUri: string;
  private headers: Record<string, string>;

  constructor(baseUri: string = "http://localhost:7437", apiKey?: string) {
    this.baseUri = baseUri;
    this.headers = {
      "Content-Type": "application/json",
    };

    if (apiKey) {
      this.headers["Authorization"] = `Bearer ${apiKey}`;
    }

    if (this.baseUri.endsWith("/")) {
      this.baseUri = this.baseUri.slice(0, -1);
    }
  }

  private handleResponse<T>(response: AxiosResponse<ApiResponse<T>>): T {
    const data = response.data;
    if (response.status >= 200 && response.status < 300 && !data.error) {
      return data.data;
    } else {
      throw new Error(data.error || "Request failed");
    }
  }

  private handleError(error: any): string {
    return "Unable to retrieve data.";
  }

  private async get<T>(url: string, data?: any): Promise<T> {
    try {
      const response = await axios.get<ApiResponse<T>>(url, {
        params: data,
        headers: this.headers,
      });
      return this.handleResponse(response);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  private async post<T>(url: string, data: any): Promise<T> {
    try {
      const response = await axios.post<ApiResponse<T>>(url, data, {
        headers: this.headers as AxiosRequestConfig["headers"],
      });
      return this.handleResponse(response);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  private async put<T>(url: string, data: any): Promise<T> {
    try {
      const response = await axios.put<ApiResponse<T>>(url, data, {
        headers: this.headers as AxiosRequestConfig["headers"],
      });
      return this.handleResponse(response);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  private async patch<T>(url: string, data: any): Promise<T> {
    try {
      const response = await axios.patch<ApiResponse<T>>(url, data, {
        headers: this.headers as AxiosRequestConfig["headers"],
      });
      return this.handleResponse(response);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  private async delete<T>(url: string, data?: any): Promise<T> {
    try {
      const response = await axios.delete<ApiResponse<T>>(url, {
        data,
        headers: this.headers,
      });
      return this.handleResponse(response);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async getProviders(): Promise<string[]> {
    try {
      const url = `${this.baseUri}/api/provider`;
      return this.get<string[]>(url);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async getProviderSettings(
    providerName: string
  ): Promise<Record<string, any>> {
    try {
      const url = `${this.baseUri}/api/provider/${providerName}`;
      return this.get<Record<string, any>>(url);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async getEmbedProviders(): Promise<string[]> {
    try {
      const url = `${this.baseUri}/api/embedding_providers`;
      return this.get<string[]>(url);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async addAgent(
    agentName: string,
    settings: AgentSettings = {}
  ): Promise<Record<string, any>> {
    try {
      const url = `${this.baseUri}/api/agent`;
      const data = { agent_name: agentName, settings };
      return this.post<Record<string, any>>(url, data);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async importAgent(
    agentName: string,
    settings: AgentSettings = {},
    commands: Record<string, any> = {}
  ): Promise<Record<string, any>> {
    try {
      const url = `${this.baseUri}/api/agent/import`;
      const data = { agent_name: agentName, settings, commands };
      return this.post<Record<string, any>>(url, data);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async renameAgent(
    agentName: string,
    newName: string
  ): Promise<string> {
    try {
      const url = `${this.baseUri}/api/agent/${agentName}`;
      const data = { new_name: newName };
      return this.patch<string>(url, data);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async updateAgentSettings(
    agentName: string,
    settings: AgentSettings
  ): Promise<string> {
    try {
      const url = `${this.baseUri}/api/agent/${agentName}`;
      const data = { settings, agent_name: agentName };
      return this.put<string>(url, data);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async updateAgentCommands(
    agentName: string,
    commands: Record<string, any>
  ): Promise<string> {
    try {
      const url = `${this.baseUri}/api/agent/${agentName}/commands`;
      const data = { commands, agent_name: agentName };
      return this.put<string>(url, data);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async deleteAgent(agentName: string): Promise<string> {
    try {
      const url = `${this.baseUri}/api/agent/${agentName}`;
      return this.delete<string>(url);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async getAgents(): Promise<Record<string, any>[]> {
    try {
      const url = `${this.baseUri}/api/agent`;
      return this.get<Record<string, any>[]>(url);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async getAgentConfig(agentName: string): Promise<Record<string, any>> {
    try {
      const url = `${this.baseUri}/api/agent/${agentName}`;
      return this.get<Record<string, any>>(url);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async getConversations(agentName: string): Promise<string[]> {
    try {
      const url = `${this.baseUri}/api/${agentName}/conversations`;
      return this.get<string[]>(url);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async getConversation(
    agentName: string,
    conversationName: string,
    limit: number = 100,
    page: number = 1
  ): Promise<Record<string, any>[]> {
    try {
      const url = `${this.baseUri}/api/conversation`;
      const data = {
        conversation_name: conversationName,
        agent_name: agentName,
        limit,
        page,
      };
      return this.get<Record<string, any>[]>(url, data);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async newConversation(
    agentName: string,
    conversationName: string
  ): Promise<Record<string, any>[]> {
    try {
      const url = `${this.baseUri}/api/conversation`;
      const data = {
        conversation_name: conversationName,
        agent_name: agentName,
      };
      return this.post<Record<string, any>[]>(url, data);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async deleteConversation(
    agentName: string,
    conversationName: string
  ): Promise<string> {
    try {
      const url = `${this.baseUri}/api/conversation`;
      const data = {
        conversation_name: conversationName,
        agent_name: agentName,
      };
      return this.delete<string>(url, data);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async deleteConversationMessage(
    agentName: string,
    conversationName: string,
    message: string
  ): Promise<string> {
    try {
      const url = `${this.baseUri}/api/conversation/message`;
      const data = {
        message,
        agent_name: agentName,
        conversation_name: conversationName,
      };
      return this.delete<string>(url, data);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async wipeAgentMemories(agentName: string): Promise<string> {
    try {
      const url = `${this.baseUri}/api/agent/${agentName}/memory`;
      return this.delete<string>(url);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async promptAgent(
    agentName: string,
    promptName: string,
    promptArgs: PromptArgs
  ): Promise<string> {
    try {
      const url = `${this.baseUri}/api/agent/${agentName}/prompt`;
      const data = { prompt_name: promptName, prompt_args: promptArgs };
      return this.post<string>(url, data);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public instruct(agentName: string, prompt: string): Promise<string> {
    return this.promptAgent(agentName, "instruct", { user_input: prompt });
  }

  public chat(agentName: string, prompt: string): Promise<string> {
    return this.promptAgent(agentName, "Chat", {
      user_input: prompt,
      context_results: 4,
    });
  }

  public smartInstruct(agentName: string, prompt: string): Promise<string> {
    return this.runChain(agentName, "Smart Instruct", prompt, false, 1, {});
  }

  public smartChat(agentName: string, prompt: string): Promise<string> {
    return this.runChain(agentName, "Smart Chat", prompt, false, 1, {});
  }

  public async getCommands(
    agentName: string
  ): Promise<Record<string, boolean>> {
    try {
      const url = `${this.baseUri}/api/agent/${agentName}/command`;
      return this.get<Record<string, boolean>>(url);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async toggleCommand(
    agentName: string,
    commandName: string,
    enable: boolean
  ): Promise<string> {
    try {
      const url = `${this.baseUri}/api/agent/${agentName}/command`;
      const data = { command_name: commandName, enable };
      return this.patch<string>(url, data);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async getChains(): Promise<string[]> {
    try {
      const url = `${this.baseUri}/api/chain`;
      return this.get<string[]>(url);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async getChain(chainName: string): Promise<Record<string, any>> {
    try {
      const url = `${this.baseUri}/api/chain/${chainName}`;
      return this.get<Record<string, any>>(url);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async getChainResponses(
    chainName: string
  ): Promise<Record<string, any>> {
    try {
      const url = `${this.baseUri}/api/chain/${chainName}/responses`;
      return this.get<Record<string, any>>(url);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async runChain(
    chainName: string,
    userInput: string,
    agentName: string = "",
    allResponses: boolean = false,
    fromStep: number = 1,
    chainArgs: Record<string, any> = {}
  ): Promise<string> {
    try {
      const url = `${this.baseUri}/api/chain/${chainName}/run`;
      const data = {
        prompt: userInput,
        agent_override: agentName,
        all_responses: allResponses,
        from_step: fromStep,
        chain_args: chainArgs,
      };
      return this.post<string>(url, data);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }
  public async runChainStep(
    chainName: string,
    userInput: string,
    agentName: string = "",
    stepNumber: number = 1,
    chainArgs: Record<string, any> = {}
  ): Promise<string> {
    try {
      const url = `${this.baseUri}/api/chain/${chainName}/run/step/${stepNumber}`;
      const data = {
        prompt: userInput,
        agent_override: agentName,
        chain_args: chainArgs,
      };
      return this.post<string>(url, data);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async addChain(chainName: string): Promise<string> {
    try {
      const url = `${this.baseUri}/api/chain`;
      const data = { chain_name: chainName };
      return this.post<string>(url, data);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async importChain(
    chainName: string,
    steps: Record<string, any>
  ): Promise<string> {
    try {
      const url = `${this.baseUri}/api/chain/import`;
      const data = { chain_name: chainName, steps };
      return this.post<string>(url, data);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async renameChain(
    chainName: string,
    newName: string
  ): Promise<string> {
    try {
      const url = `${this.baseUri}/api/chain/${chainName}`;
      const data = { new_name: newName };
      return this.put<string>(url, data);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async deleteChain(chainName: string): Promise<string> {
    try {
      const url = `${this.baseUri}/api/chain/${chainName}`;
      return this.delete<string>(url);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async addStep(
    chainName: string,
    stepNumber: number,
    agentName: string,
    promptType: string,
    prompt: PromptArgs
  ): Promise<string> {
    try {
      const url = `${this.baseUri}/api/chain/${chainName}/step`;
      const data = {
        step_number: stepNumber,
        agent_name: agentName,
        prompt_type: promptType,
        prompt,
      };
      return this.post<string>(url, data);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async updateStep(
    chainName: string,
    stepNumber: number,
    agentName: string,
    promptType: string,
    prompt: PromptArgs
  ): Promise<string> {
    try {
      const url = `${this.baseUri}/api/chain/${chainName}/step/${stepNumber}`;
      const data = {
        step_number: stepNumber,
        agent_name: agentName,
        prompt_type: promptType,
        prompt,
      };
      return this.put<string>(url, data);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async moveStep(
    chainName: string,
    oldStepNumber: number,
    newStepNumber: number
  ): Promise<string> {
    try {
      const url = `${this.baseUri}/api/chain/${chainName}/step/move`;
      const data = {
        old_step_number: oldStepNumber,
        new_step_number: newStepNumber,
      };
      return this.patch<string>(url, data);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async deleteStep(
    chainName: string,
    stepNumber: number
  ): Promise<string> {
    try {
      const url = `${this.baseUri}/api/chain/${chainName}/step/${stepNumber}`;
      return this.delete<string>(url);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async addPrompt(promptName: string, prompt: string): Promise<string> {
    try {
      const url = `${this.baseUri}/api/prompt`;
      const data = { prompt_name: promptName, prompt };
      return this.post<string>(url, data);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async getPrompt(promptName: string): Promise<Record<string, any>> {
    try {
      const url = `${this.baseUri}/api/prompt/${promptName}`;
      return this.get<Record<string, any>>(url);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async getPrompts(): Promise<string[]> {
    try {
      const url = `${this.baseUri}/api/prompt`;
      return this.get<string[]>(url);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async getPromptArgs(promptName: string): Promise<Record<string, any>> {
    try {
      const url = `${this.baseUri}/api/prompt/${promptName}/args`;
      return this.get<Record<string, any>>(url);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async deletePrompt(promptName: string): Promise<string> {
    try {
      const url = `${this.baseUri}/api/prompt/${promptName}`;
      return this.delete<string>(url);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async updatePrompt(
    promptName: string,
    prompt: string
  ): Promise<string> {
    try {
      const url = `${this.baseUri}/api/prompt/${promptName}`;
      const data = { prompt, prompt_name: promptName };
      return this.put<string>(url, data);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async renamePrompt(
    promptName: string,
    newName: string
  ): Promise<string> {
    try {
      const url = `${this.baseUri}/api/prompt/${promptName}`;
      const data = { prompt_name: newName };
      return this.patch<string>(url, data);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async getExtensionSettings(): Promise<Record<string, any>> {
    try {
      const url = `${this.baseUri}/api/extensions/settings`;
      return this.get<Record<string, any>>(url);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async getExtensions(): Promise<Record<string, any>[]> {
    try {
      const url = `${this.baseUri}/api/extensions`;
      return this.get<Record<string, any>[]>(url);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async getCommandArgs(
    commandName: string
  ): Promise<Record<string, any>> {
    try {
      const url = `${this.baseUri}/api/extensions/${commandName}/args`;
      return this.get<Record<string, any>>(url);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async learnUrl(agentName: string, url: string): Promise<string> {
    try {
      const url = `${this.baseUri}/api/agent/${agentName}/learn/url`;
      const data = { url };
      return this.post<string>(url, data);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async learnFile(
    agentName: string,
    fileName: string,
    fileContent: string
  ): Promise<string> {
    try {
      const url = `${this.baseUri}/api/agent/${agentName}/learn/file`;
      const data = { file_name: fileName, file_content: fileContent };
      return this.post<string>(url, data);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }
}

export default AGiXTSDK;
