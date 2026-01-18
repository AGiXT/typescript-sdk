/**
 * AGiXT TypeScript SDK Tests
 *
 * These tests run against a live AGiXT server.
 * Set the following environment variables:
 * - AGIXT_URI: AGiXT server URI (default: http://localhost:7437)
 * - AGIXT_API_KEY: API key for authentication (default: test-api-key)
 */

import AGiXTSDK from "../index";
import { v4 as uuidv4 } from "uuid";

const AGIXT_URI = process.env.AGIXT_URI || "http://localhost:7437";
const AGIXT_API_KEY = process.env.AGIXT_API_KEY || "test-api-key";

describe("AGiXT TypeScript SDK", () => {
  let sdk: AGiXTSDK;
  let testAgentName: string;
  let testAgentId: string;
  let testConversationName: string;
  let testConversationId: string;

  beforeAll(async () => {
    sdk = new AGiXTSDK({
      baseUri: AGIXT_URI,
      apiKey: AGIXT_API_KEY,
    });

    // Create test agent
    testAgentName = `TestAgent_${uuidv4().slice(0, 8)}`;
    await sdk.addAgent(testAgentName, { provider: "default" });
    testAgentId = await sdk.getAgentIdByName(testAgentName);

    // Create test conversation
    testConversationName = `TestConv_${uuidv4().slice(0, 8)}`;
    await sdk.newConversation(testAgentId, testConversationName);
    testConversationId = await sdk.getConversationIdByName(testConversationName);
  });

  afterAll(async () => {
    // Cleanup
    try {
      if (testConversationId) {
        await sdk.deleteConversation(testConversationId);
      }
      if (testAgentId) {
        await sdk.deleteAgent(testAgentId);
      }
    } catch (e) {
      // Ignore cleanup errors
    }
  });

  describe("Connection", () => {
    test("server is reachable", async () => {
      const providers = await sdk.getProviders();
      expect(providers).toBeDefined();
    });
  });

  describe("User Management", () => {
    test("register user", async () => {
      const email = `test_${uuidv4().slice(0, 8)}@example.com`;
      const response = await sdk.registerUser(email, "Test", "User");
      expect(response).toBeDefined();
    });

    test("check user exists", async () => {
      const email = `existing_${uuidv4().slice(0, 8)}@example.com`;
      await sdk.registerUser(email, "Existing", "User");
      const exists = await sdk.userExists(email);
      expect(exists).toBe(true);
    });
  });

  describe("Agent Management", () => {
    test("get agents", async () => {
      const agents = await sdk.getAgents();
      expect(agents).toBeDefined();
    });

    test("add agent", async () => {
      const agentName = `NewAgent_${uuidv4().slice(0, 8)}`;
      const agent = await sdk.addAgent(agentName, { provider: "default" });
      expect(agent).toBeDefined();

      // Cleanup
      const agentId = await sdk.getAgentIdByName(agentName);
      if (agentId) {
        await sdk.deleteAgent(agentId);
      }
    });

    test("get agent id by name", async () => {
      const agentId = await sdk.getAgentIdByName(testAgentName);
      expect(agentId).toBeDefined();
      expect(agentId).toBe(testAgentId);
    });

    test("get agent config", async () => {
      const config = await sdk.getAgentConfig(testAgentId);
      expect(config).toBeDefined();
    });

    test("rename agent", async () => {
      const newName = `Renamed_${uuidv4().slice(0, 8)}`;
      await sdk.renameAgent(testAgentId, newName);

      const agentId = await sdk.getAgentIdByName(newName);
      expect(agentId).toBe(testAgentId);

      // Rename back
      await sdk.renameAgent(testAgentId, testAgentName);
    });
  });

  describe("Conversation Management", () => {
    test("get conversations", async () => {
      const conversations = await sdk.getConversations();
      expect(conversations).toBeDefined();
    });

    test("new conversation", async () => {
      const convName = `NewConv_${uuidv4().slice(0, 8)}`;
      const conv = await sdk.newConversation(testAgentId, convName);
      expect(conv).toBeDefined();

      // Cleanup
      const convId = await sdk.getConversationIdByName(convName);
      if (convId) {
        await sdk.deleteConversation(convId);
      }
    });

    test("get conversation id by name", async () => {
      const convId = await sdk.getConversationIdByName(testConversationName);
      expect(convId).toBeDefined();
      expect(convId).toBe(testConversationId);
    });

    test("get conversation history", async () => {
      const history = await sdk.getConversation(testConversationId);
      expect(history).toBeDefined();
    });

    test("add message to conversation", async () => {
      await sdk.newConversationMessage("user", "Hello test", testConversationId);
      const history = await sdk.getConversation(testConversationId);
      expect(history).toBeDefined();
    });
  });

  describe("Providers", () => {
    test("get providers", async () => {
      const providers = await sdk.getProviders();
      expect(providers).toBeDefined();
    });

    test("get providers by service", async () => {
      const providers = await sdk.getProvidersByService("llm");
      expect(providers).toBeDefined();
    });
  });

  describe("Chains", () => {
    test("get chains", async () => {
      const chains = await sdk.getChains();
      expect(chains).toBeDefined();
    });
  });

  describe("Prompts", () => {
    test("get prompts", async () => {
      const prompts = await sdk.getPrompts();
      expect(prompts).toBeDefined();
    });

    test("get all prompts", async () => {
      const prompts = await sdk.getAllPrompts();
      expect(prompts).toBeDefined();
    });
  });

  describe("Extensions", () => {
    test("get extensions", async () => {
      const extensions = await sdk.getExtensions();
      expect(extensions).toBeDefined();
    });
  });
});
