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
  baseUri: 'http://localhost:7437', 
  apiKey: 'YOUR_API_KEY'
});
```

### Providers

- `getProviders()` - Get list of available AI providers
- `getProviderSettings(providerName)` - Get settings for a provider
- `getEmbedProviders()` - Get list of embedding providers

### Agents

- `addAgent(agentName, settings)` - Add a new agent
- `importAgent(agentName, settings, commands)` - Import an existing agent
- `renameAgent(agentName, newName)` - Rename an agent 
- `updateAgentSettings(agentName, settings)` - Update agent settings
- `updateAgentCommands(agentName, commands)` - Update agent commands
- `deleteAgent(agentName)` - Delete an agent
- `getAgents()` - Get all agents
- `getAgentConfig(agentName)` - Get config for an agent
- `learnUrl(agentName, url)` - Learn from a URL
- `learnFile(agentName, fileName, fileContent)` - Learn from a file
- `learnGithubRepo(agentName, repo, user, token, branch)` - Learn from a GitHub repo

### Conversations

- `getConversations(agentName)` - Get conversations for an agent or all agents
- `getConversation(agentName, conversationName, limit, page)` - Get a conversation
- `newConversation(agentName, conversationName)` - Start a new conversation
- `deleteConversation(agentName, conversationName)` - Delete a conversation
- `deleteConversationMessage(agentName, conversationName, message)` - Delete a message
- `wipeAgentMemories(agentName)` - Wipe an agent's memories

### Prompting

- `promptAgent(agentName, promptName, promptArgs)` - Prompt an agent
- `instruct(agentName, userInput, conversation)` - Instruct with no memory 
- `chat(agentName, userInput, conversation, contextResults)` - Chat with no memory
- `smartinstruct(agentName, userInput, conversation)` - Smart instruct with no memory
- `smartchat(agentName, userInput, conversation)` - Smart chat with no memory

### Commands

- `getCommands(agentName)` - Get commands for an agent
- `toggleCommand(agentName, commandName, enable)` - Enable/disable a command

### Chains

- `getChains()` - Get all chains
- `getChain(chainName)` - Get a chain
- `getChainResponses(chainName)` - Get responses for a chain 
- `getChainArgs(chainName)` - Get args for a chain
- `runChain(chainName, userInput, agentName, allResponses, fromStep, chainArgs)` - Run a chain
- `runChainStep(chainName, stepNumber, userInput, agentName, chainArgs)` - Run a chain step
- `addChain(chainName)` - Add a new chain
- `importChain(chainName, steps)` - Import a chain
- `renameChain(chainName, newName)` - Rename a chain
- `deleteChain(chainName)` - Delete a chain
- `addStep(chainName, stepNumber, agentName, promptType, prompt)` - Add step to a chain
- `updateStep(chainName, stepNumber, agentName, promptType, prompt)` - Update step
- `moveStep(chainName, oldStepNumber, newStepNumber)` - Move step
- `deleteStep(chainName, stepNumber)` - Delete step

### Prompts

- `addPrompt(promptName, prompt, promptCategory)` - Add a prompt
- `getPrompt(promptName, promptCategory)` - Get a prompt 
- `getPrompts(promptCategory)` - Get prompts in a category
- `getPromptCategories()` - Get all prompt categories
- `getPromptArgs(promptName, promptCategory)` - Get args for a prompt
- `deletePrompt(promptName, promptCategory)` - Delete a prompt
- `updatePrompt(promptName, prompt, promptCategory)` - Update a prompt
- `renamePrompt(promptName, newName, promptCategory)` - Rename a prompt

### Extensions

- `getExtensionSettings()` - Get extension settings
- `getExtensions()` - Get all extensions
- `getCommandArgs(commandName)` - Get args for an extension command

This covers the major methods available in the SDK. Refer to the source for additional helper methods and error handling.
## More Documentation
Want to know more about AGiXT?  Check out our [documentation](https://josh-xt.github.io/AGiXT/) or [GitHub](https://github.com/Josh-XT/AGiXT) page.
