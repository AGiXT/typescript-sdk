import axios, { AxiosRequestConfig } from 'axios';

type Conversation = {
  id: string;
  name: string;
  has_notifications: boolean;
  created_at: string;
  updated_at: string;
};

export default class AGiXTSDK {
  private baseUri: string;
  private headers: AxiosRequestConfig['headers'];
  private verbose: boolean;

  constructor(config: { baseUri?: string; apiKey?: string; verbose?: boolean }) {
    this.baseUri = config.baseUri || 'http://localhost:7437';
    this.verbose = config.verbose || false;
    if (config.apiKey) {
      const apiKey = config.apiKey.replace('Bearer ', '').replace('bearer ', '');
      this.headers = {
        Authorization: apiKey,
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

  private handleError(error: any): string {
    console.error(`Error: ${error}`);
    throw new Error(`Unable to retrieve data. ${error}`);
  }

  private parseResponse(response: any): void {
    if (this.verbose) {
      console.log(`Status Code: ${response.status}`);
      console.log('Response JSON:');
      if (response.status === 200) {
        console.log(response.data);
      } else {
        console.log(response.data);
      }
      console.log('\n');
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Auth Methods
  // ─────────────────────────────────────────────────────────────

  /**
   * Login with username/password authentication.
   * @param username - Username or email address
   * @param password - User's password
   * @param mfaToken - Optional TOTP code if MFA is enabled
   * @returns JWT token on success, or undefined on failure
   */
  async login(username: string, password: string, mfaToken?: string): Promise<string | any> {
    try {
      const payload: any = { username, password };
      if (mfaToken) {
        payload.mfa_token = mfaToken;
      }
      const response = await axios.post(`${this.baseUri}/v1/login`, payload, { headers: this.headers });
      this.parseResponse(response);
      const data = response.data;
      if (response.status === 200 && data.token) {
        this.headers = { ...this.headers, Authorization: data.token };
        if (this.verbose) {
          console.log('Logged in successfully');
        }
        return data.token;
      }
      return data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Legacy login with magic link (email + OTP token).
   * Maintained for backward compatibility.
   * @param email - User's email address
   * @param otp - TOTP code from authenticator app
   * @returns JWT token on success, or undefined on failure
   */
  async loginMagicLink(email: string, otp: string): Promise<string | undefined> {
    try {
      const response = await axios.post(
        `${this.baseUri}/v1/login/magic-link`,
        { email, token: otp },
        { headers: this.headers },
      );
      this.parseResponse(response);
      const data = response.data;
      if (data.detail && data.detail.includes('?token=')) {
        const token = data.detail.split('token=')[1];
        this.headers = { ...this.headers, Authorization: token };
        if (this.verbose) {
          console.log(`Log in at ${data.detail}`);
        }
        return token;
      }
      return undefined;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Register a new user with username/password authentication.
   * @param email - User's email address
   * @param password - User's password
   * @param confirmPassword - Password confirmation
   * @param firstName - User's first name (optional)
   * @param lastName - User's last name (optional)
   * @param username - Desired username (optional, auto-generated from email if not provided)
   * @param organizationName - Company/organization name (optional)
   * @returns Response object with user_id, username, token on success
   */
  async registerUser(
    email: string,
    password: string,
    confirmPassword: string,
    firstName?: string,
    lastName?: string,
    username?: string,
    organizationName?: string,
  ): Promise<any> {
    try {
      const payload: any = {
        email,
        password,
        confirm_password: confirmPassword,
        first_name: firstName || '',
        last_name: lastName || '',
      };
      if (username) payload.username = username;
      if (organizationName) payload.organization_name = organizationName;

      const response = await axios.post(`${this.baseUri}/v1/user`, payload, { headers: this.headers });
      this.parseResponse(response);
      const data = response.data;
      if (response.status === 200 && data.token) {
        this.headers = { ...this.headers, Authorization: data.token };
        if (this.verbose) {
          console.log(`Registered and logged in as ${data.username}`);
        }
      }
      return data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get MFA setup information including QR code URI.
   * @returns Object with provisioning_uri, secret, and mfa_enabled status
   */
  async getMfaSetup(): Promise<{ provisioning_uri: string; secret: string; mfa_enabled: boolean }> {
    try {
      const response = await axios.get(`${this.baseUri}/v1/user/mfa/setup`, { headers: this.headers });
      this.parseResponse(response);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Enable MFA for the current user.
   * @param mfaToken - TOTP code from authenticator app to verify setup
   * @returns Response object with success message
   */
  async enableMfa(mfaToken: string): Promise<{ detail: string }> {
    try {
      const response = await axios.post(
        `${this.baseUri}/v1/user/mfa/enable`,
        { mfa_token: mfaToken },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Disable MFA for the current user.
   * @param password - User's password (optional)
   * @param mfaToken - Current TOTP code (optional)
   * @returns Response object with success message
   */
  async disableMfa(password?: string, mfaToken?: string): Promise<{ detail: string }> {
    try {
      const payload: any = {};
      if (password) payload.password = password;
      if (mfaToken) payload.mfa_token = mfaToken;
      const response = await axios.post(`${this.baseUri}/v1/user/mfa/disable`, payload, { headers: this.headers });
      this.parseResponse(response);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Change the current user's password.
   * @param currentPassword - Current password
   * @param newPassword - New password
   * @param confirmPassword - New password confirmation
   * @returns Response object with success message
   */
  async changePassword(currentPassword: string, newPassword: string, confirmPassword: string): Promise<{ detail: string }> {
    try {
      const response = await axios.post(
        `${this.baseUri}/v1/user/password/change`,
        {
          current_password: currentPassword,
          new_password: newPassword,
          confirm_password: confirmPassword,
        },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Set a password for users who don't have one (e.g., social login users).
   * @param newPassword - New password
   * @param confirmPassword - New password confirmation
   * @returns Response object with success message
   */
  async setPassword(newPassword: string, confirmPassword: string): Promise<{ detail: string }> {
    try {
      const response = await axios.post(
        `${this.baseUri}/v1/user/password/set`,
        {
          new_password: newPassword,
          confirm_password: confirmPassword,
        },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async userExists(email: string): Promise<boolean> {
    try {
      const response = await axios.get(`${this.baseUri}/v1/user/exists?email=${encodeURIComponent(email)}`, {
        headers: this.headers,
      });
      this.parseResponse(response);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateUser(updates: any): Promise<any> {
    try {
      const response = await axios.put(`${this.baseUri}/v1/user`, updates, { headers: this.headers });
      this.parseResponse(response);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getUser(): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUri}/v1/user`, { headers: this.headers });
      this.parseResponse(response);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Provider Methods
  // ─────────────────────────────────────────────────────────────

  async getProviders(): Promise<any[]> {
    try {
      const response = await axios.get(`${this.baseUri}/v1/providers`, { headers: this.headers });
      this.parseResponse(response);
      const data = response.data;
      if (Array.isArray(data)) {
        return data;
      }
      return data.providers || data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getProvidersByService(service: string): Promise<string[]> {
    try {
      const providers = await this.getProviders();
      const filtered: string[] = [];
      for (const provider of providers) {
        if (typeof provider === 'object' && provider.service === service) {
          filtered.push(provider.name || provider);
        } else if (typeof provider === 'string') {
          filtered.push(provider);
        }
      }
      return filtered.length
        ? filtered
        : providers.map((p: any) => (typeof p === 'object' ? p.name || p : p));
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getProviderSettings(providerName: string): Promise<any> {
    try {
      const providers = await this.getProviders();
      for (const provider of providers) {
        if (typeof provider === 'object' && provider.name === providerName) {
          return provider.settings || provider;
        }
      }
      return {};
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getEmbedProviders(): Promise<string[]> {
    try {
      const providers = await this.getProviders();
      const embedProviders: string[] = [];
      for (const provider of providers) {
        if (typeof provider === 'object' && provider.supports_embeddings) {
          embedProviders.push(provider.name || provider);
        } else if (typeof provider === 'string') {
          embedProviders.push(provider);
        }
      }
      return embedProviders;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getEmbedders(): Promise<any> {
    try {
      const providers = await this.getProviders();
      const embedders: any = {};
      for (const provider of providers) {
        if (typeof provider === 'object' && provider.supports_embeddings) {
          embedders[provider.name] = provider;
        }
      }
      return embedders;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Agent Methods
  // ─────────────────────────────────────────────────────────────

  async addAgent(
    agentName: string,
    settings: any = {},
    commands: any = {},
    trainingUrls: string[] = [],
  ): Promise<any> {
    try {
      const response = await axios.post(
        `${this.baseUri}/v1/agent`,
        {
          agent_name: agentName,
          settings,
          commands,
          training_urls: trainingUrls,
        },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async importAgent(agentName: string, settings: any = {}, commands: any = {}): Promise<any> {
    try {
      const response = await axios.post(
        `${this.baseUri}/v1/agent/import`,
        {
          agent_name: agentName,
          settings,
          commands,
        },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async renameAgent(agentId: string, newName: string): Promise<any> {
    try {
      const response = await axios.patch(
        `${this.baseUri}/v1/agent/${agentId}`,
        { new_name: newName },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateAgentSettings(agentId: string, settings: any, agentName: string = ''): Promise<string> {
    try {
      const response = await axios.put(
        `${this.baseUri}/v1/agent/${agentId}`,
        {
          agent_name: agentName,
          settings,
          commands: {},
          training_urls: [],
        },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateAgentCommands(agentId: string, commands: any): Promise<string> {
    try {
      const response = await axios.put(
        `${this.baseUri}/v1/agent/${agentId}/commands`,
        { commands },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteAgent(agentId: string): Promise<string> {
    try {
      const response = await axios.delete(`${this.baseUri}/v1/agent/${agentId}`, { headers: this.headers });
      this.parseResponse(response);
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAgents(): Promise<any[]> {
    try {
      const response = await axios.get(`${this.baseUri}/v1/agent`, { headers: this.headers });
      this.parseResponse(response);
      return response.data.agents;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAgentConfig(agentId: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUri}/v1/agent/${agentId}`, { headers: this.headers });
      this.parseResponse(response);
      return response.data.agent;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAgentIdByName(agentName: string): Promise<string | null> {
    try {
      const agents = await this.getAgents();
      for (const agent of agents) {
        if (typeof agent === 'object' && agent.name === agentName) {
          return agent.id;
        }
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Conversation Methods
  // ─────────────────────────────────────────────────────────────

  async getConversations(agentId: string = ''): Promise<any[]> {
    try {
      const url = agentId ? `${this.baseUri}/v1/conversations?agent_id=${agentId}` : `${this.baseUri}/v1/conversations`;
      const response = await axios.get(url, { headers: this.headers });
      this.parseResponse(response);
      const data = response.data;
      if (Array.isArray(data)) {
        return data;
      }
      return data.conversations || data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getConversationsWithIds(): Promise<any[]> {
    try {
      const response = await axios.get(`${this.baseUri}/v1/conversations`, { headers: this.headers });
      this.parseResponse(response);
      const data = response.data;
      if (Array.isArray(data)) {
        return data;
      }
      return data.conversations_with_ids || data.conversations || data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getConversation(conversationId: string, limit: number = 100, page: number = 1): Promise<any[]> {
    try {
      const response = await axios.get(`${this.baseUri}/v1/conversation/${conversationId}`, {
        headers: this.headers,
        params: { limit, page },
      });
      this.parseResponse(response);
      return response.data.conversation_history;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async forkConversation(conversationId: string, messageId: string): Promise<any> {
    try {
      const response = await axios.post(
        `${this.baseUri}/v1/conversation/fork/${conversationId}/${messageId}`,
        {},
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async newConversation(
    agentId: string,
    conversationName: string,
    conversationContent: any[] = [],
  ): Promise<any> {
    try {
      const response = await axios.post(
        `${this.baseUri}/v1/conversation`,
        {
          conversation_name: conversationName,
          agent_id: agentId,
          conversation_content: conversationContent,
        },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async renameConversation(conversationId: string, newName: string = '-'): Promise<any> {
    try {
      const response = await axios.put(
        `${this.baseUri}/v1/conversation/${conversationId}`,
        { new_conversation_name: newName },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteConversation(conversationId: string): Promise<string> {
    try {
      const response = await axios.delete(`${this.baseUri}/v1/conversation/${conversationId}`, {
        headers: this.headers,
      });
      this.parseResponse(response);
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteConversationMessage(conversationId: string, messageId: string): Promise<string> {
    try {
      const response = await axios.delete(
        `${this.baseUri}/v1/conversation/${conversationId}/message/${messageId}`,
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateConversationMessage(
    conversationId: string,
    messageId: string,
    newMessage: string,
  ): Promise<string> {
    try {
      const response = await axios.put(
        `${this.baseUri}/v1/conversation/${conversationId}/message/${messageId}`,
        { new_message: newMessage },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async newConversationMessage(
    role: string = 'user',
    message: string = '',
    conversationId: string = '',
  ): Promise<string> {
    try {
      const response = await axios.post(
        `${this.baseUri}/v1/conversation/${conversationId}/message`,
        { role, message },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getConversationIdByName(conversationName: string): Promise<string | null> {
    try {
      const conversations = await this.getConversationsWithIds();
      for (const conv of conversations) {
        if (typeof conv === 'object' && conv.name === conversationName) {
          return conv.id;
        }
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Agent Prompt Methods
  // ─────────────────────────────────────────────────────────────

  async promptAgent(agentId: string, promptName: string, promptArgs: any): Promise<string> {
    try {
      const response = await axios.post(
        `${this.baseUri}/v1/agent/${agentId}/prompt`,
        {
          prompt_name: promptName,
          prompt_args: promptArgs,
        },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data.response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async instruct(agentId: string, userInput: string, conversationId: string): Promise<string> {
    return this.promptAgent(agentId, 'instruct', {
      user_input: userInput,
      disable_memory: true,
      conversation_name: conversationId,
    });
  }

  async chat(
    agentId: string,
    userInput: string,
    conversationId: string,
    contextResults: number = 4,
  ): Promise<string> {
    return this.promptAgent(agentId, 'Chat', {
      user_input: userInput,
      context_results: contextResults,
      conversation_name: conversationId,
      disable_memory: true,
    });
  }

  async smartinstruct(agentId: string, userInput: string, conversationId: string): Promise<string> {
    return this.runChain({
      chainName: 'Smart Instruct',
      userInput,
      agentId,
      allResponses: false,
      fromStep: 1,
      chainArgs: {
        conversation_name: conversationId,
        disable_memory: true,
      },
    });
  }

  async smartchat(agentId: string, userInput: string, conversationId: string): Promise<string> {
    return this.runChain({
      chainName: 'Smart Chat',
      userInput,
      agentId,
      allResponses: false,
      fromStep: 1,
      chainArgs: {
        conversation_name: conversationId,
        disable_memory: true,
      },
    });
  }

  // ─────────────────────────────────────────────────────────────
  // Command Methods
  // ─────────────────────────────────────────────────────────────

  async getCommands(agentId: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUri}/v1/agent/${agentId}/command`, {
        headers: this.headers,
      });
      this.parseResponse(response);
      return response.data.commands;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async toggleCommand(agentId: string, commandName: string, enable: boolean): Promise<string> {
    try {
      const response = await axios.patch(
        `${this.baseUri}/v1/agent/${agentId}/command`,
        { command_name: commandName, enable },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async executeCommand(
    agentId: string,
    commandName: string,
    commandArgs: any,
    conversationId: string = '',
  ): Promise<string> {
    try {
      const response = await axios.post(
        `${this.baseUri}/v1/agent/${agentId}/command`,
        {
          command_name: commandName,
          command_args: commandArgs,
          conversation_name: conversationId,
        },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data.response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Chain Methods
  // ─────────────────────────────────────────────────────────────

  async getChains(): Promise<any[]> {
    try {
      const response = await axios.get(`${this.baseUri}/v1/chains`, { headers: this.headers });
      this.parseResponse(response);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getChain(chainId: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUri}/v1/chain/${chainId}`, { headers: this.headers });
      this.parseResponse(response);
      const data = response.data;
      if (typeof data === 'object' && Object.keys(data).length === 1) {
        return Object.values(data)[0];
      }
      return data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getChainResponses(chainId: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUri}/v1/chain/${chainId}/responses`, {
        headers: this.headers,
      });
      this.parseResponse(response);
      return response.data.chain;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getChainArgs(chainId: string): Promise<string[]> {
    try {
      const response = await axios.get(`${this.baseUri}/v1/chain/${chainId}/args`, {
        headers: this.headers,
      });
      this.parseResponse(response);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async runChain(params: {
    chainId?: string;
    chainName?: string;
    userInput?: string;
    agentId?: string;
    allResponses?: boolean;
    fromStep?: number;
    chainArgs?: any;
  }): Promise<any> {
    const {
      chainId = '',
      chainName = '',
      userInput = '',
      agentId = '',
      allResponses = false,
      fromStep = 1,
      chainArgs = {},
    } = params;
    try {
      const endpoint = chainId || chainName;
      const response = await axios.post(
        `${this.baseUri}/v1/chain/${endpoint}/run`,
        {
          prompt: userInput,
          agent_override: agentId,
          all_responses: allResponses,
          from_step: fromStep,
          chain_args: chainArgs,
        },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async runChainStep(
    chainId: string,
    stepNumber: number,
    userInput: string,
    agentId: string = '',
    chainArgs: any = {},
  ): Promise<any> {
    try {
      const response = await axios.post(
        `${this.baseUri}/v1/chain/${chainId}/run/step/${stepNumber}`,
        {
          prompt: userInput,
          agent_override: agentId,
          chain_args: chainArgs,
        },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async addChain(chainName: string): Promise<any> {
    try {
      const response = await axios.post(
        `${this.baseUri}/v1/chain`,
        { chain_name: chainName },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async importChain(chainName: string, steps: any): Promise<string> {
    try {
      const response = await axios.post(
        `${this.baseUri}/v1/chain/import`,
        { chain_name: chainName, steps },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async renameChain(chainId: string, newName: string): Promise<string> {
    try {
      const response = await axios.put(
        `${this.baseUri}/v1/chain/${chainId}`,
        { new_name: newName },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteChain(chainId: string): Promise<string> {
    try {
      const response = await axios.delete(`${this.baseUri}/v1/chain/${chainId}`, { headers: this.headers });
      this.parseResponse(response);
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async addStep(
    chainId: string,
    stepNumber: number,
    agentId: string,
    promptType: string,
    prompt: any,
  ): Promise<string> {
    try {
      const response = await axios.post(
        `${this.baseUri}/v1/chain/${chainId}/step`,
        {
          step_number: stepNumber,
          agent_id: agentId,
          prompt_type: promptType,
          prompt,
        },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateStep(
    chainId: string,
    stepNumber: number,
    agentId: string,
    promptType: string,
    prompt: any,
  ): Promise<string> {
    try {
      const response = await axios.put(
        `${this.baseUri}/v1/chain/${chainId}/step/${stepNumber}`,
        {
          step_number: stepNumber,
          agent_id: agentId,
          prompt_type: promptType,
          prompt,
        },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async moveStep(chainId: string, oldStepNumber: number, newStepNumber: number): Promise<string> {
    try {
      const response = await axios.patch(
        `${this.baseUri}/v1/chain/${chainId}/step/move`,
        {
          old_step_number: oldStepNumber,
          new_step_number: newStepNumber,
        },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteStep(chainId: string, stepNumber: number): Promise<string> {
    try {
      const response = await axios.delete(`${this.baseUri}/v1/chain/${chainId}/step/${stepNumber}`, {
        headers: this.headers,
      });
      this.parseResponse(response);
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getChainIdByName(chainName: string): Promise<string | null> {
    try {
      const chains = await this.getChains();
      for (const chain of chains) {
        if (typeof chain === 'object' && chain.name === chainName) {
          return chain.id;
        }
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Prompt Methods
  // ─────────────────────────────────────────────────────────────

  async addPrompt(promptName: string, prompt: string, promptCategory: string = 'Default'): Promise<any> {
    try {
      const response = await axios.post(
        `${this.baseUri}/v1/prompt`,
        {
          prompt_name: promptName,
          prompt,
          prompt_category: promptCategory,
        },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getPrompt(promptId: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUri}/v1/prompt/${promptId}`, {
        headers: this.headers,
      });
      this.parseResponse(response);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getPrompts(promptCategory: string = 'Default'): Promise<any[]> {
    try {
      const response = await axios.get(`${this.baseUri}/v1/prompts`, {
        headers: this.headers,
        params: { prompt_category: promptCategory },
      });
      this.parseResponse(response);
      return response.data.prompts;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAllPrompts(): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUri}/v1/prompt/all`, { headers: this.headers });
      this.parseResponse(response);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getPromptCategories(): Promise<any[]> {
    try {
      const response = await axios.get(`${this.baseUri}/v1/prompt/categories`, {
        headers: this.headers,
      });
      this.parseResponse(response);
      return response.data.categories;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getPromptsByCategoryId(categoryId: string): Promise<any[]> {
    try {
      const response = await axios.get(`${this.baseUri}/v1/prompt/category/${categoryId}`, {
        headers: this.headers,
      });
      this.parseResponse(response);
      return response.data.prompts;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getPromptArgs(promptId: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUri}/v1/prompt/${promptId}/args`, {
        headers: this.headers,
      });
      this.parseResponse(response);
      return response.data.prompt_args;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deletePrompt(promptId: string): Promise<string> {
    try {
      const response = await axios.delete(`${this.baseUri}/v1/prompt/${promptId}`, {
        headers: this.headers,
      });
      this.parseResponse(response);
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updatePrompt(promptId: string, prompt: string): Promise<string> {
    try {
      const response = await axios.put(
        `${this.baseUri}/v1/prompt/${promptId}`,
        { prompt },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async renamePrompt(promptId: string, newName: string): Promise<string> {
    try {
      const response = await axios.patch(
        `${this.baseUri}/v1/prompt/${promptId}`,
        { prompt_name: newName },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getPromptIdByName(promptName: string, category: string = 'Default'): Promise<string | null> {
    try {
      const prompts = await this.getPrompts(category);
      for (const prompt of prompts) {
        if (typeof prompt === 'object' && prompt.name === promptName) {
          return prompt.id;
        }
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Extension Methods
  // ─────────────────────────────────────────────────────────────

  async getExtensionSettings(): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUri}/v1/extensions/settings`, {
        headers: this.headers,
      });
      this.parseResponse(response);
      return response.data.extension_settings;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getExtensions(): Promise<any[]> {
    try {
      const response = await axios.get(`${this.baseUri}/v1/extensions`, { headers: this.headers });
      this.parseResponse(response);
      const data = response.data;
      if (Array.isArray(data)) {
        return data;
      }
      return data.extensions || data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAgentExtensions(agentId: string): Promise<any[]> {
    try {
      const response = await axios.get(`${this.baseUri}/v1/agent/${agentId}/extensions`, {
        headers: this.headers,
      });
      this.parseResponse(response);
      return response.data.extensions;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getCommandArgs(commandName: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUri}/v1/extensions/${commandName}/args`, {
        headers: this.headers,
      });
      this.parseResponse(response);
      return response.data.command_args;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Memory Methods
  // ─────────────────────────────────────────────────────────────

  async learnText(
    agentId: string,
    userInput: string,
    text: string,
    collectionNumber: string = '0',
  ): Promise<string> {
    try {
      const response = await axios.post(
        `${this.baseUri}/v1/agent/${agentId}/learn/text`,
        {
          user_input: userInput,
          text,
          collection_number: collectionNumber,
        },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async learnUrl(agentId: string, url: string, collectionNumber: string = '0'): Promise<string> {
    try {
      const response = await axios.post(
        `${this.baseUri}/v1/agent/${agentId}/learn/url`,
        { url, collection_number: collectionNumber },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async learnFile(
    agentId: string,
    fileName: string,
    fileContent: string,
    collectionNumber: string = '0',
  ): Promise<string> {
    try {
      const response = await axios.post(
        `${this.baseUri}/v1/agent/${agentId}/learn/file`,
        {
          file_name: fileName,
          file_content: fileContent,
          collection_number: collectionNumber,
        },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async learnGithubRepo(
    agentId: string,
    githubRepo: string,
    githubUser?: string,
    githubToken?: string,
    githubBranch: string = 'main',
    useAgentSettings: boolean = false,
    collectionNumber: string = '0',
  ): Promise<string> {
    try {
      const response = await axios.post(
        `${this.baseUri}/v1/agent/${agentId}/learn/github`,
        {
          github_repo: githubRepo,
          github_user: githubUser,
          github_token: githubToken,
          github_branch: githubBranch,
          use_agent_settings: useAgentSettings,
          collection_number: collectionNumber,
        },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async learnArxiv(
    agentId: string,
    query: string = '',
    arxivIds: string = '',
    maxResults: number = 5,
    collectionNumber: string = '0',
  ): Promise<string> {
    try {
      const response = await axios.post(
        `${this.baseUri}/v1/agent/${agentId}/learn/arxiv`,
        {
          query,
          arxiv_ids: arxivIds,
          max_results: maxResults,
          collection_number: collectionNumber,
        },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async agentReader(
    agentId: string,
    readerName: string,
    data: any,
    collectionNumber: string = '0',
  ): Promise<string> {
    if (!data.collection_number) {
      data.collection_number = collectionNumber;
    }
    try {
      const response = await axios.post(
        `${this.baseUri}/v1/agent/${agentId}/reader/${readerName}`,
        { data },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async wipeAgentMemories(agentId: string, collectionNumber: string = '0'): Promise<string> {
    try {
      const response = await axios.delete(`${this.baseUri}/v1/agent/${agentId}/memory/${collectionNumber}`, {
        headers: this.headers,
      });
      this.parseResponse(response);
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteAgentMemory(
    agentId: string,
    memoryId: string,
    collectionNumber: string = '0',
  ): Promise<string> {
    try {
      const response = await axios.delete(
        `${this.baseUri}/v1/agent/${agentId}/memory/${collectionNumber}/${memoryId}`,
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAgentMemories(
    agentId: string,
    userInput: string,
    limit: number = 5,
    minRelevanceScore: number = 0.0,
    collectionNumber: string = '0',
  ): Promise<any[]> {
    try {
      const response = await axios.post(
        `${this.baseUri}/v1/agent/${agentId}/memory/${collectionNumber}/query`,
        {
          user_input: userInput,
          limit,
          min_relevance_score: minRelevanceScore,
        },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data.memories;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async exportAgentMemories(agentId: string): Promise<any[]> {
    try {
      const response = await axios.get(`${this.baseUri}/v1/agent/${agentId}/memory/export`, {
        headers: this.headers,
      });
      this.parseResponse(response);
      return response.data.memories;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async importAgentMemories(agentId: string, memories: any[]): Promise<string> {
    try {
      const response = await axios.post(
        `${this.baseUri}/v1/agent/${agentId}/memory/import`,
        { memories },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async createDataset(agentId: string, datasetName: string, batchSize: number = 4): Promise<string> {
    try {
      const response = await axios.post(
        `${this.baseUri}/v1/agent/${agentId}/memory/dataset`,
        {
          dataset_name: datasetName,
          batch_size: batchSize,
        },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getBrowsedLinks(agentId: string, collectionNumber: string = '0'): Promise<string[]> {
    try {
      const response = await axios.get(
        `${this.baseUri}/v1/agent/${agentId}/browsed_links/${collectionNumber}`,
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data.links;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteBrowsedLink(agentId: string, link: string, collectionNumber: string = '0'): Promise<string> {
    try {
      const response = await axios.delete(`${this.baseUri}/v1/agent/${agentId}/browsed_links`, {
        headers: this.headers,
        data: { link, collection_number: collectionNumber },
      });
      this.parseResponse(response);
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getMemoriesExternalSources(agentId: string, collectionNumber: string): Promise<any> {
    try {
      const response = await axios.get(
        `${this.baseUri}/v1/agent/${agentId}/memory/external_sources/${collectionNumber}`,
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data.external_sources;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteMemoryExternalSource(
    agentId: string,
    source: string,
    collectionNumber: string,
  ): Promise<string> {
    try {
      const response = await axios.delete(`${this.baseUri}/v1/agent/${agentId}/memory/external_source`, {
        headers: this.headers,
        data: {
          external_source: source,
          collection_number: collectionNumber,
        },
      });
      this.parseResponse(response);
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Persona Methods
  // ─────────────────────────────────────────────────────────────

  async getPersona(agentId: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUri}/v1/agent/${agentId}/persona`, {
        headers: this.headers,
      });
      this.parseResponse(response);
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updatePersona(agentId: string, persona: string): Promise<string> {
    try {
      const response = await axios.put(
        `${this.baseUri}/v1/agent/${agentId}/persona`,
        { persona },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Feedback Methods
  // ─────────────────────────────────────────────────────────────

  async positiveFeedback(
    agentId: string,
    message: string,
    userInput: string,
    feedback: string,
    conversationId: string = '',
  ): Promise<string> {
    return this.provideFeedback(agentId, message, userInput, feedback, true, conversationId);
  }

  async negativeFeedback(
    agentId: string,
    message: string,
    userInput: string,
    feedback: string,
    conversationId: string = '',
  ): Promise<string> {
    return this.provideFeedback(agentId, message, userInput, feedback, false, conversationId);
  }

  private async provideFeedback(
    agentId: string,
    message: string,
    userInput: string,
    feedback: string,
    positive: boolean,
    conversationId: string,
  ): Promise<string> {
    try {
      const response = await axios.post(
        `${this.baseUri}/v1/agent/${agentId}/feedback`,
        {
          user_input: userInput,
          message,
          feedback,
          positive,
          conversation_name: conversationId,
        },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data.message;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Text-to-Speech Methods
  // ─────────────────────────────────────────────────────────────

  async textToSpeech(agentId: string, text: string): Promise<string> {
    try {
      const response = await axios.post(
        `${this.baseUri}/v1/agent/${agentId}/text_to_speech`,
        { text },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data.url;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Task Planning Methods
  // ─────────────────────────────────────────────────────────────

  async planTask(
    agentId: string,
    userInput: string,
    websearch: boolean = false,
    websearchDepth: number = 3,
    conversationId: string = '',
    logUserInput: boolean = true,
    logOutput: boolean = true,
    enableNewCommand: boolean = true,
  ): Promise<string> {
    try {
      const response = await axios.post(
        `${this.baseUri}/v1/agent/${agentId}/plan/task`,
        {
          user_input: userInput,
          websearch,
          websearch_depth: websearchDepth,
          conversation_name: conversationId,
          log_user_input: logUserInput,
          log_output: logOutput,
          enable_new_command: enableNewCommand,
        },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data.response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Company Methods
  // ─────────────────────────────────────────────────────────────

  async getCompanies(): Promise<any[]> {
    try {
      const response = await axios.get(`${this.baseUri}/v1/companies`, { headers: this.headers });
      this.parseResponse(response);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async createCompany(
    name: string,
    agentName: string,
    parentCompanyId?: string,
  ): Promise<any> {
    try {
      const response = await axios.post(
        `${this.baseUri}/v1/companies`,
        {
          name,
          agent_name: agentName,
          parent_company_id: parentCompanyId,
        },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateCompany(companyId: string, name: string): Promise<any> {
    try {
      const response = await axios.put(
        `${this.baseUri}/v1/companies/${companyId}`,
        { name },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteCompany(companyId: string): Promise<any> {
    try {
      const response = await axios.delete(`${this.baseUri}/v1/companies/${companyId}`, {
        headers: this.headers,
      });
      this.parseResponse(response);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteUserFromCompany(companyId: string, userId: string): Promise<any> {
    try {
      const response = await axios.delete(`${this.baseUri}/v1/companies/${companyId}/users/${userId}`, {
        headers: this.headers,
      });
      this.parseResponse(response);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Invitation Methods
  // ─────────────────────────────────────────────────────────────

  async getInvitations(companyId?: string): Promise<any[]> {
    try {
      const url = companyId
        ? `${this.baseUri}/v1/invitations/${companyId}`
        : `${this.baseUri}/v1/invitations`;
      const response = await axios.get(url, { headers: this.headers });
      this.parseResponse(response);
      return response.data.invitations;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ─────────────────────────────────────────────────────────────
  // OAuth2 Methods
  // ─────────────────────────────────────────────────────────────

  async getOauth2Providers(): Promise<any[]> {
    try {
      const response = await axios.get(`${this.baseUri}/v1/oauth2`, { headers: this.headers });
      this.parseResponse(response);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getUserOauth2Connections(): Promise<string[]> {
    try {
      const response = await axios.get(`${this.baseUri}/v1/user/oauth2`, { headers: this.headers });
      this.parseResponse(response);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async oauth2Login(provider: string, code: string, referrer?: string): Promise<any> {
    try {
      const response = await axios.post(
        `${this.baseUri}/v1/oauth2/${provider}`,
        { code, referrer },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Embedder Methods
  // ─────────────────────────────────────────────────────────────

  async getEmbeddersDetails(): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUri}/v1/embedders`, { headers: this.headers });
      this.parseResponse(response);
      return response.data.embedders;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Training Methods
  // ─────────────────────────────────────────────────────────────

  async train(
    agentId: string,
    datasetName: string = 'dataset',
    model: string = 'unsloth/mistral-7b-v0.2',
    maxSeqLength: number = 16384,
    huggingfaceOutputPath: string = 'JoshXT/finetuned-mistral-7b-v0.2',
    privateRepo: boolean = true,
  ): Promise<any> {
    try {
      const response = await axios.post(
        `${this.baseUri}/v1/agent/${agentId}/train`,
        {
          dataset_name: datasetName,
          model,
          max_seq_length: maxSeqLength,
          huggingface_output_path: huggingfaceOutputPath,
          private_repo: privateRepo,
        },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Audio Methods
  // ─────────────────────────────────────────────────────────────

  async transcribeAudio(
    file: string,
    model: string,
    language?: string,
    prompt?: string,
    responseFormat: string = 'json',
    temperature: number = 0.0,
  ): Promise<any> {
    try {
      const response = await axios.post(
        `${this.baseUri}/v1/audio/transcriptions`,
        {
          file,
          model,
          language,
          prompt,
          response_format: responseFormat,
          temperature,
        },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async translateAudio(
    file: string,
    model: string,
    prompt?: string,
    responseFormat: string = 'json',
    temperature: number = 0.0,
  ): Promise<any> {
    try {
      const response = await axios.post(
        `${this.baseUri}/v1/audio/translations`,
        {
          file,
          model,
          prompt,
          response_format: responseFormat,
          temperature,
        },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Image Generation Methods
  // ─────────────────────────────────────────────────────────────

  async generateImage(
    prompt: string,
    model: string = 'dall-e-3',
    n: number = 1,
    size: string = '1024x1024',
    responseFormat: string = 'url',
  ): Promise<any> {
    try {
      const response = await axios.post(
        `${this.baseUri}/v1/images/generations`,
        {
          prompt,
          model,
          n,
          size,
          response_format: responseFormat,
        },
        { headers: this.headers },
      );
      this.parseResponse(response);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }
}
