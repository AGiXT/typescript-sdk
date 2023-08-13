[![GitHub](https://img.shields.io/badge/GitHub-Sponsor%20Josh%20XT-blue?logo=github&style=plastic)](https://github.com/sponsors/Josh-XT) [![PayPal](https://img.shields.io/badge/PayPal-Sponsor%20Josh%20XT-blue.svg?logo=paypal&style=plastic)](https://paypal.me/joshxt) [![Ko-Fi](https://img.shields.io/badge/Kofi-Sponsor%20Josh%20XT-blue.svg?logo=kofi&style=plastic)](https://ko-fi.com/joshxt)

# AGiXT SDK for TypeScript

[![GitHub](https://img.shields.io/badge/GitHub-AGiXT%20Core-blue?logo=github&style=plastic)](https://github.com/Josh-XT/AGiXT) [![GitHub](https://img.shields.io/badge/GitHub-AGiXT%20Hub-blue?logo=github&style=plastic)](https://github.com/AGiXT/hub) [![GitHub](https://img.shields.io/badge/GitHub-AGiXT%20Light%20Hub-blue?logo=github&style=plastic)](https://github.com/AGiXT/light-hub) [![GitHub](https://img.shields.io/badge/GitHub-AGiXT%20Streamlit%20Web%20UI-blue?logo=github&style=plastic)](https://github.com/AGiXT/streamlit)

[![GitHub](https://img.shields.io/badge/GitHub-AGiXT%20Python%20SDK-blue?logo=github&style=plastic)](https://github.com/AGiXT/python-sdk) [![pypi](https://img.shields.io/badge/pypi-AGiXT%20Python%20SDK-blue?logo=pypi&style=plastic)](https://pypi.org/project/agixtsdk/)

[![GitHub](https://img.shields.io/badge/GitHub-AGiXT%20TypeScript%20SDK-blue?logo=github&style=plastic)](https://github.com/AGiXT/typescript-sdk) [![npm](https://img.shields.io/badge/npm-AGiXT%20TypeScript%20SDK-blue?logo=npm&style=plastic)](https://www.npmjs.com/package/agixt)


[![Discord](https://img.shields.io/discord/1097720481970397356?label=Discord&logo=discord&logoColor=white&style=plastic&color=5865f2)](https://discord.gg/d3TkHRZcjD) 
[![Twitter](https://img.shields.io/badge/Twitter-Follow_@Josh_XT-blue?logo=twitter&style=plastic)](https://twitter.com/Josh_XT) 

[![Logo](https://josh-xt.github.io/AGiXT/images/AGiXT-gradient-flat.svg)](https://josh-xt.github.io/AGiXT/)

This repository is for the [AGiXT](https://github.com/Josh-XT/AGiXT) SDK for TypeScript. https://www.npmjs.com/package/agixt

The AGiXT SDK for TypeScript provides an easy way to interact with AGiXT APIs from your Node.js and browser applications.

## Installation

```
npm install agixt
```

## Usage

Import the SDK:

```typescript
import { AGiXTSDK } from 'agixt';
```

Create an SDK instance:

```typescript
const agixt = new AGiXTSDK({
  baseUrl: 'http://localhost:7437',
  apiKey: 'YOUR_API_KEY' 
});
```

The SDK can then be used to call AGiXT APIs:

### Agents

```typescript
// List all agents
const agents = await agixt.listAgents(); 

// Get a specific agent
const agent = await agixt.getAgent('agent-name');

// Create a new agent
await agixt.createAgent({
  name: 'new-agent',
  provider: 'gpt3',
  settings: {
    model: 'text-davinci-003'  
  }
});

// Update an agent
await agixt.updateAgent('agent-name', {
  settings: {
    model: 'text-curie-001'
  }  
});

// Delete an agent
await agixt.deleteAgent('agent-name');
```

### Prompts

```typescript
// Prompt an agent 
const response = await agixt.promptAgent('agent-name', 'prompt-name', {
  conversationId: 'convo-123',
  promptArgs: {
    topic: 'cooking'
  }
});

// Run a prompt chain
const responses = await agixt.runPromptChain('chain-name', 'user input');
``` 

### Chains

```typescript
// Get all chains
const chains = await agixt.getChains();

// Get a chain
const chain = await agixt.getChain('chain-name');

// Create a chain 
await agixt.createChain('new-chain');

// Add a step to a chain
await agixt.addChainStep('chain-name', {
  agent: 'agent-name',
  promptName: 'prompt-name' 
});

// Delete a chain
await agixt.deleteChain('chain-name');
```

### Learning

```typescript
// Learn from a URL
await agixt.learnUrl('agent-name', 'https://example.com');

// Learn from a local file 
await agixt.learnFile('agent-name', '/path/to/file.md');

// Learn from a GitHub repo
await agixt.learnGitHub('agent-name', 'owner/repo');
```

### Conversations

```typescript
// List conversations
const conversations = await agixt.listConversations('agent-name');

// Get a conversation 
const conversation = await agixt.getConversation('agent-name', 'convo-123');

// Create a conversation
await agixt.createConversation('agent-name', 'new-conversation');  

// Delete a conversation
await agixt.deleteConversation('agent-name', 'convo-123');
```

## More Documentation
Want to know more about AGiXT?  Check out our [documentation](https://josh-xt.github.io/AGiXT/) or [GitHub](https://github.com/Josh-XT/AGiXT) page.
