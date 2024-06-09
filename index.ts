import axios, { AxiosRequestConfig } from 'axios';

export default class AGiXTSDK {
  private baseUri: string;
  private headers: AxiosRequestConfig['headers'];

  constructor(config: { baseUri: string; apiKey?: string }) {
    this.baseUri = config.baseUri || 'http://localhost:7437';
    if (config.apiKey) {
      if (config.apiKey.includes('Bearer ')) {
        config.apiKey = config.apiKey.replace('Bearer ', '');
      }
      this.headers = {
        Authorization: `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      };
    } else {
      this.headers = {
        'Content-Type': 'application/json',
      };
    }

    if (this.baseUri.slice(-1) === '/') {
      this.baseUri = this.baseUri.slice(0, -1);
    }
  }

  private handleError(error: any) {
    //console.error(`Error: ${error}`);
    return `Error: ${error}`;
  }

  async getProviders(): Promise<string[]> {
    try {
      const response = await axios.get<{ providers: string[] }>(`${this.baseUri}/api/provider`, { headers: this.headers });
      return response.data.providers;
    } catch (error) {
      return [this.handleError(error)];
    }
  }

  async getProvidersByService(service: string): Promise<string[]> {
    try {
      const response = await axios.get<{ providers: string[] }>(`${this.baseUri}/api/providers/service/${service}`, {
        headers: this.headers,
      });
      return response.data.providers;
    } catch (error) {
      return [this.handleError(error)];
    }
  }

  async getAllProviders(): Promise<string[]> {
    try {
      const response = await axios.get<{ providers: any[] }>(`${this.baseUri}/api/providers`, { headers: this.headers });
      return response.data.providers;
    } catch (error) {
      return [this.handleError(error)];
    }
  }

  async getProviderSettings(providerName: string) {
    try {
      const response = await axios.get<{ settings: any }>(`${this.baseUri}/api/provider/${providerName}`, {
        headers: this.headers,
      });
      return response.data.settings;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getEmbedProviders(): Promise<string[]> {
    try {
      const response = await axios.get<{ providers: string[] }>(`${this.baseUri}/api/embedding_providers`, {
        headers: this.headers,
      });
      return response.data.providers;
    } catch (error) {
      return [this.handleError(error)];
    }
  }

  async addAgent(agentName: string, settings: any = {}) {
    try {
      const response = await axios.post<{ [key: string]: any }>(
        `${this.baseUri}/api/agent`,
        {
          agent_name: agentName,
          settings,
        },
        { headers: this.headers },
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async importAgent(agentName: string, settings: any = {}, commands: any = {}) {
    try {
      const response = await axios.post<{ [key: string]: any }>(
        `${this.baseUri}/api/agent/import`,
        {
          agent_name: agentName,
          settings,
          commands,
        },
        { headers: this.headers },
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async renameAgent(agentName: string, newName: string) {
    try {
      const response = await axios.patch(
        `${this.baseUri}/api/agent/${agentName}`,
        { new_name: newName },
        { headers: this.headers },
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateAgentSettings(agentName: string, settings: any) {
    try {
      const response = await axios.put(
        `${this.baseUri}/api/agent/${agentName}`,
        {
          settings,
          agent_name: agentName,
        },
        { headers: this.headers },
      );
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateAgentCommands(agentName: string, commands: any) {
    try {
      const response = await axios.put(
        `${this.baseUri}/api/agent/${agentName}/commands`,
        {
          commands,
          agent_name: agentName,
        },
        { headers: this.headers },
      );
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteAgent(agentName: string) {
    try {
      const response = await axios.delete(`${this.baseUri}/api/agent/${agentName}`, { headers: this.headers });
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAgents() {
    try {
      const response = await axios.get<{ agents: any[] }>(`${this.baseUri}/api/agent`, { headers: this.headers });
      return response.data.agents;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAgentConfig(agentName: string) {
    try {
      const response = await axios.get<{ agent: any }>(`${this.baseUri}/api/agent/${agentName}`, { headers: this.headers });
      return response.data.agent;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getConversations(agentName = '') {
    const url = agentName ? `${this.baseUri}/api/${agentName}/conversations` : `${this.baseUri}/api/conversations`;

    try {
      const response = await axios.get<{ conversations: string[] }>(url, {
        headers: this.headers,
      });
      return response.data.conversations;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async addConversationFeedback(
    positive: boolean,
    agentName: string,
    message: string,
    userInput: string,
    feedback: string,
    conversationName: string,
  ) {
    try {
      const response = await axios.post(
        `${this.baseUri}/api/agent/${agentName}/feedback`,
        {
          positive,
          feedback,
          message,
          user_input: userInput,
          conversation_name: conversationName,
        },
        { headers: this.headers },
      );
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getConversation(agentName = '', conversationName = '', limit = 100, page = 1) {
    try {
      const response = await axios.request({
        method: 'get',
        url: `${this.baseUri}/api/conversation/${conversationName}`,
        headers: this.headers,
        params: {
          agent_name: agentName,
          limit: limit,
          page: page,
        },
      });
      return response.data.conversation_history;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async newConversation(agentName: string, conversationName: string, conversationContent: any[] = []) {
    try {
      const response = await axios.post<{ conversation_history: any[] }>(
        `${this.baseUri}/api/conversation`,
        {
          conversation_name: conversationName,
          agent_name: agentName,
          conversation_content: conversationContent,
        },
        { headers: this.headers },
      );
      return response.data.conversation_history;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteConversation(agentName: string, conversationName: string) {
    try {
      const response = await axios.delete(`${this.baseUri}/api/conversation`, {
        headers: this.headers,
        data: {
          conversation_name: conversationName,
          agent_name: agentName,
        },
      });
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateConversationMessage(agentName: string, conversationName: string, message: string, newMessage: string) {
    try {
      const response = await axios.put(
        `${this.baseUri}/api/conversation/message`,
        {
          message: message,
          new_message: newMessage,
          agent_name: agentName,
          conversation_name: conversationName,
        },
        { headers: this.headers },
      );
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteConversationMessage(agentName: string, conversationName: string, message: string) {
    try {
      const response = await axios.delete(`${this.baseUri}/api/conversation/message`, {
        headers: this.headers,
        data: {
          message,
          agent_name: agentName,
          conversation_name: conversationName,
        },
      });
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async importAgentMemories(agentName: string, memories: any[]) {
    try {
      const response = await axios.post(
        `${this.baseUri}/api/agent/${agentName}/memory/import`,
        {
          memories: memories,
        },
        { headers: this.headers },
      );
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async exportAgentMemories(agentName: string) {
    try {
      const response = await axios.get(`${this.baseUri}/api/agent/${agentName}/memory/export`, { headers: this.headers });
      return response.data.memories;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async wipeAgentMemories(agentName: string, collectionNumber = 0) {
    try {
      const response = await axios.delete(`${this.baseUri}/api/agent/${agentName}/memory/${collectionNumber}`, {
        headers: this.headers,
      });
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async promptAgent(agentName: string, promptName: string, promptArgs: any) {
    try {
      const response = await axios.post<{ response: string }>(
        `${this.baseUri}/api/agent/${agentName}/prompt`,
        {
          prompt_name: promptName,
          prompt_args: promptArgs,
        },
        { headers: this.headers },
      );
      return response.data.response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async instruct(agentName: string, userInput: string, conversation: string) {
    return this.promptAgent(agentName, 'instruct', {
      user_input: userInput,
      disable_memory: true,
      conversation_name: conversation,
    });
  }

  async chat(agentName: string, userInput: string, conversation: string, contextResults = 4) {
    return this.promptAgent(agentName, 'Chat', {
      user_input: userInput,
      context_results: contextResults,
      conversation_name: conversation,
      disable_memory: true,
    });
  }

  async smartinstruct(agentName: string, userInput: string, conversation: string) {
    return this.runChain('Smart Instruct', userInput, agentName, false, 1, {
      conversation_name: conversation,
      disable_memory: true,
    });
  }

  async smartchat(agentName: string, userInput: string, conversation: string) {
    return this.runChain('Smart Chat', userInput, agentName, false, 1, {
      conversation_name: conversation,
      disable_memory: true,
    });
  }

  async getCommands(agentName: string) {
    try {
      const response = await axios.get<{ commands: any }>(`${this.baseUri}/api/agent/${agentName}/command`, {
        headers: this.headers,
      });
      return response.data.commands;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async executeCommand(agentName: string, commandName: string, commandArgs: any, conversation: string) {
    try {
      const response = await axios.post<{ response: string }>(
        `${this.baseUri}/api/agent/${agentName}/command`,
        {
          command_name: commandName,
          command_args: commandArgs,
          conversation_name: conversation,
        },
        { headers: this.headers },
      );
      return response.data.response;
    } catch (error) {
      return this.handleError(error);
    }
  }
  async toggleCommand(agentName: string, commandName: string, enable: boolean) {
    try {
      const response = await axios.patch(
        `${this.baseUri}/api/agent/${agentName}/command`,
        { command_name: commandName, enable },
        { headers: this.headers },
      );
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getChains() {
    try {
      const response = await axios.get<string[]>(`${this.baseUri}/api/chain`, {
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getChain(chainName: string) {
    try {
      const response = await axios.get<{ chain: any }>(`${this.baseUri}/api/chain/${chainName}`, { headers: this.headers });
      return response.data.chain;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getChainResponses(chainName: string) {
    try {
      const response = await axios.get<{ chain: any }>(`${this.baseUri}/api/chain/${chainName}/responses`, {
        headers: this.headers,
      });
      return response.data.chain;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getChainArgs(chainName: string) {
    try {
      const response = await axios.get<{ chain_args: string[] }>(`${this.baseUri}/api/chain/${chainName}/args`, {
        headers: this.headers,
      });
      return response.data.chain_args;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async runChain(chainName: string, userInput: string, agentName = '', allResponses = false, fromStep = 1, chainArgs = {}) {
    try {
      const response = await axios.post<any>(
        `${this.baseUri}/api/chain/${chainName}/run`,
        {
          prompt: userInput,
          agent_override: agentName,
          all_responses: allResponses,
          from_step: fromStep,
          chain_args: chainArgs,
        },
        { headers: this.headers },
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async runChainStep(chainName: string, stepNumber: number, userInput: string, agentName?: string, chainArgs = {}) {
    try {
      const response = await axios.post<any>(
        `${this.baseUri}/api/chain/${chainName}/run/step/${stepNumber}`,
        {
          prompt: userInput,
          agent_override: agentName,
          chain_args: chainArgs,
        },
        { headers: this.headers },
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async addChain(chainName: string) {
    try {
      const response = await axios.post(`${this.baseUri}/api/chain`, { chain_name: chainName }, { headers: this.headers });
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async importChain(chainName: string, steps: any) {
    try {
      const response = await axios.post(
        `${this.baseUri}/api/chain/import`,
        {
          chain_name: chainName,
          steps,
        },
        { headers: this.headers },
      );
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async renameChain(chainName: string, newName: string) {
    try {
      const response = await axios.put(
        `${this.baseUri}/api/chain/${chainName}`,
        { new_name: newName },
        { headers: this.headers },
      );
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteChain(chainName: string) {
    try {
      const response = await axios.delete(`${this.baseUri}/api/chain/${chainName}`, { headers: this.headers });
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async addStep(chainName: string, stepNumber: number, agentName: string, promptType: string, prompt: any) {
    try {
      const response = await axios.post(
        `${this.baseUri}/api/chain/${chainName}/step`,
        {
          step_number: stepNumber,
          agent_name: agentName,
          prompt_type: promptType,
          prompt,
        },
        { headers: this.headers },
      );
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateStep(chainName: string, stepNumber: number, agentName: string, promptType: string, prompt: any) {
    try {
      const response = await axios.put(
        `${this.baseUri}/api/chain/${chainName}/step/${stepNumber}`,
        {
          step_number: stepNumber,
          agent_name: agentName,
          prompt_type: promptType,
          prompt,
        },
        { headers: this.headers },
      );
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async moveStep(chainName: string, oldStepNumber: number, newStepNumber: number) {
    try {
      const response = await axios.patch(
        `${this.baseUri}/api/chain/${chainName}/step/move`,
        {
          old_step_number: oldStepNumber,
          new_step_number: newStepNumber,
        },
        { headers: this.headers },
      );
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteStep(chainName: string, stepNumber: number) {
    try {
      const response = await axios.delete(`${this.baseUri}/api/chain/${chainName}/step/${stepNumber}`, {
        headers: this.headers,
      });
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async addPrompt(promptName: string, prompt: string, promptCategory = 'Default') {
    try {
      const response = await axios.post(
        `${this.baseUri}/api/prompt/${promptCategory}`,
        {
          prompt_name: promptName,
          prompt,
        },
        { headers: this.headers },
      );
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getPrompt(promptName: string, promptCategory = 'Default') {
    try {
      const response = await axios.get<{ prompt: any }>(`${this.baseUri}/api/prompt/${promptCategory}/${promptName}`, {
        headers: this.headers,
      });
      return response.data.prompt;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getPrompts(promptCategory = 'Default') {
    try {
      const response = await axios.get<{ prompts: string[] }>(`${this.baseUri}/api/prompt/${promptCategory}`, {
        headers: this.headers,
      });
      return response.data.prompts;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async addPromptCategory(promptCategory: string) {
    try {
      const response = await axios.get<{ prompts: string[] }>(`${this.baseUri}/api/prompt/${promptCategory}`, {
        headers: this.headers,
      });
      return `Prompt category ${promptCategory} created.`;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getPromptCategories() {
    try {
      const response = await axios.get<{ prompt_categories: string[] }>(`${this.baseUri}/api/prompt/categories`, {
        headers: this.headers,
      });
      return response.data.prompt_categories;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getPromptArgs(promptName: string, promptCategory = 'Default') {
    try {
      const response = await axios.get<{ prompt_args: any }>(
        `${this.baseUri}/api/prompt/${promptCategory}/${promptName}/args`,
        { headers: this.headers },
      );
      return response.data.prompt_args;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deletePrompt(promptName: string, promptCategory = 'Default') {
    try {
      const response = await axios.delete(`${this.baseUri}/api/prompt/${promptCategory}/${promptName}`, {
        headers: this.headers,
      });
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updatePrompt(promptName: string, prompt: string, promptCategory = 'Default') {
    try {
      const response = await axios.put(
        `${this.baseUri}/api/prompt/${promptCategory}/${promptName}`,
        {
          prompt,
          prompt_name: promptName,
          prompt_category: promptCategory,
        },
        { headers: this.headers },
      );
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async renamePrompt(promptName: string, newName: string, promptCategory = 'Default') {
    try {
      const response = await axios.patch(
        `${this.baseUri}/api/prompt/${promptCategory}/${promptName}`,
        { prompt_name: newName },
        { headers: this.headers },
      );
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getExtensionSettings() {
    try {
      const response = await axios.get<{ extension_settings: any }>(`${this.baseUri}/api/extensions/settings`, {
        headers: this.headers,
      });
      return response.data.extension_settings;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getExtensions() {
    try {
      const response = await axios.get<{ extensions: any[] }>(`${this.baseUri}/api/extensions`, { headers: this.headers });
      return response.data.extensions;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getCommandArgs(commandName: string) {
    try {
      const response = await axios.get<{ command_args: any }>(`${this.baseUri}/api/extensions/${commandName}/args`, {
        headers: this.headers,
      });
      return response.data.command_args;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async learnText(agentName: string, userInput: string, text: string, collectionNumber = 0) {
    try {
      const response = await axios.post(
        `${this.baseUri}/api/agent/${agentName}/learn/text`,
        {
          user_input: userInput,
          text: text,
          collection_number: collectionNumber,
        },
        { headers: this.headers },
      );
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async learnUrl(agentName: string, url: string, collectionNumber = 0) {
    try {
      const response = await axios.post(
        `${this.baseUri}/api/agent/${agentName}/learn/url`,
        { url: url, collection_number: collectionNumber },
        { headers: this.headers },
      );
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async learnFile(agentName: string, fileName: string, fileContent: string, collectionNumber = 0) {
    try {
      const response = await axios.post(
        `${this.baseUri}/api/agent/${agentName}/learn/file`,
        {
          file_name: fileName,
          file_content: fileContent,
          collection_number: collectionNumber,
        },
        { headers: this.headers },
      );
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async learnGithubRepo(
    agentName: string,
    githubRepo: string,
    githubUser?: string,
    githubToken?: string,
    githubBranch = 'main',
    collectionNumber = 0,
  ) {
    try {
      const response = await axios.post(
        `${this.baseUri}/api/agent/${agentName}/learn/github`,
        {
          github_repo: githubRepo,
          github_user: githubUser,
          github_token: githubToken,
          github_branch: githubBranch,
          collection_number: collectionNumber,
        },
        { headers: this.headers },
      );
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async learnArxiv(agentName: string, query = '', arxivIds = '', max_results = 5, collection_number = 0) {
    try {
      const response = await axios.post(
        `${this.baseUri}/api/agent/${agentName}/learn/arxiv`,
        {
          query: query,
          arxiv_ids: arxivIds,
          max_results: max_results,
          collection_number: collection_number,
        },
        { headers: this.headers },
      );
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async agentReader(agentName: string, readerName: string, data: any, collectionNumber = 0) {
    if (!data.collection_number) {
      data.collection_number = collectionNumber;
    }
    try {
      const response = await axios.post(
        `${this.baseUri}/api/agent/${agentName}/learn/reader/${readerName}`,
        {
          data: data,
        },
        { headers: this.headers },
      );
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAgentMemories(agentName: string, userInput: string, limit = 5, minRelevanceScore = 0.5, collectionNumber = 0) {
    try {
      const response = await axios.post(
        `${this.baseUri}/api/agent/${agentName}/memory/${collectionNumber}/query`,
        {
          user_input: userInput,
          limit: limit,
          min_relevance_score: minRelevanceScore,
        },
        { headers: this.headers },
      );
      return response.data.memories;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteAgentMemory(agentName: string, memoryId: string, collectionNumber = 0) {
    try {
      const response = await axios.delete(`${this.baseUri}/api/agent/${agentName}/memory/${collectionNumber}/${memoryId}`, {
        headers: this.headers,
      });
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async createDataset(agentName: string, datasetName: string, batchSize = 4) {
    try {
      const response = await axios.post(
        `${this.baseUri}/api/agent/${agentName}/memory/dataset`,
        {
          dataset_name: datasetName,
          batch_size: batchSize,
        },
        { headers: this.headers },
      );
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }
  async executeCommandWithVoice(
    agentName: string,
    base64Audio: string,
    audioFormat = 'm4a',
    audioVariable = 'data_to_correlate_with_input',
    commandName = 'Store information in my long term memory',
    commandArgs = { input: 'Voice transcription from user' },
    tts = false,
    conversationName = 'AGiXT Terminal',
  ) {
    try {
      const response = await axios.post(
        `${this.baseUri}/api/agent/${agentName}/command`,
        {
          command_name: 'Command with Voice',
          command_args: {
            base64_audio: base64Audio,
            audio_variable: audioVariable,
            audio_format: audioFormat,
            tts: tts,
            command_name: commandName,
            command_args: commandArgs,
          },
          conversation_name: conversationName,
        },
        { headers: this.headers },
      );
      return response.data.response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async promptAgentWithVoice(
    agentName: string,
    base64Audio: string,
    audioFormat = 'm4a',
    audioVariable = 'user_input',
    promptName = 'Custom Input',
    promptArgs = {
      context_results: 6,
      inject_memories_from_collection_number: 0,
    },
    tts = false,
    conversationName = 'AGiXT Terminal',
  ) {
    try {
      const response = await axios.post(
        `${this.baseUri}/api/agent/${agentName}/command`,
        {
          command_name: 'Prompt with Voice',
          command_args: {
            base64_audio: base64Audio,
            audio_variable: audioVariable,
            audio_format: audioFormat,
            tts: tts,
            prompt_name: promptName,
            prompt_args: promptArgs,
          },
          conversation_name: conversationName,
        },
        { headers: this.headers },
      );
      return response.data.response;
    } catch (error) {
      return this.handleError(error);
    }
  }
  async textToSpeech(agentName: string, text: string, conversationName: string) {
    try {
      const response = await axios.post(
        `${this.baseUri}/api/agent/${agentName}/command`,
        {
          command_name: 'Text to Speech',
          command_args: { text: text },
          conversation_name: conversationName,
        },
        { headers: this.headers },
      );
      return response.data.response;
    } catch (error) {
      return this.handleError(error);
    }
  }
}
