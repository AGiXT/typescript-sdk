# AGiXT SDK for TypeScript

[![GitHub](https://img.shields.io/badge/GitHub-Sponsor%20Josh%20XT-blue?logo=github&style=plastic)](https://github.com/sponsors/Josh-XT) [![PayPal](https://img.shields.io/badge/PayPal-Sponsor%20Josh%20XT-blue.svg?logo=paypal&style=plastic)](https://paypal.me/joshxt) [![Ko-Fi](https://img.shields.io/badge/Kofi-Sponsor%20Josh%20XT-blue.svg?logo=kofi&style=plastic)](https://ko-fi.com/joshxt)

[![GitHub](https://img.shields.io/badge/GitHub-AGiXT%20Core-blue?logo=github&style=plastic)](https://github.com/Josh-XT/AGiXT) [![GitHub](https://img.shields.io/badge/GitHub-AGiXT%20Hub-blue?logo=github&style=plastic)](https://github.com/AGiXT/hub) [![GitHub](https://img.shields.io/badge/GitHub-AGiXT%20NextJS%20Web%20UI-blue?logo=github&style=plastic)](https://github.com/AGiXT/nextjs) [![GitHub](https://img.shields.io/badge/GitHub-AGiXT%20Streamlit%20Web%20UI-blue?logo=github&style=plastic)](https://github.com/AGiXT/streamlit)

[![GitHub](https://img.shields.io/badge/GitHub-AGiXT%20Python%20SDK-blue?logo=github&style=plastic)](https://github.com/AGiXT/python-sdk) [![pypi](https://img.shields.io/badge/pypi-AGiXT%20Python%20SDK-blue?logo=pypi&style=plastic)](https://pypi.org/project/agixtsdk/)

[![GitHub](https://img.shields.io/badge/GitHub-AGiXT%20TypeScript%20SDK-blue?logo=github&style=plastic)](https://github.com/AGiXT/typescript-sdk) [![npm](https://img.shields.io/badge/npm-AGiXT%20TypeScript%20SDK-blue?logo=npm&style=plastic)](https://www.npmjs.com/package/agixt)

[![Discord](https://img.shields.io/discord/1097720481970397356?label=Discord&logo=discord&logoColor=white&style=plastic&color=5865f2)](https://discord.gg/d3TkHRZcjD)
[![Twitter](https://img.shields.io/badge/Twitter-Follow_@Josh_XT-blue?logo=twitter&style=plastic)](https://twitter.com/Josh_XT)

![AGiXT_New](https://github.com/user-attachments/assets/14a5c1ae-6af8-4de8-a82e-f24ea52da23f)


This repository is for the [AGiXT](https://github.com/Josh-XT/AGiXT) SDK for TypeScript. https://www.npmjs.com/package/agixt

The AGiXT SDK for TypeScript provides an easy way to interact with AGiXT APIs from your Node.js and browser applications.

## Table of Contents 📖

- [AGiXT SDK for TypeScript](#agixt-sdk-for-typescript)
  - [Table of Contents 📖](#table-of-contents-)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Providers](#providers)
    - [Agents](#agents)
    - [Conversations](#conversations)
    - [Prompting](#prompting)
    - [Commands](#commands)
    - [Chains](#chains)
    - [Prompts](#prompts)
    - [Extensions](#extensions)
- [Usage Examples](#usage-examples)
  - [Get a list of Providers](#get-a-list-of-providers)
  - [Get Default Provider Settings](#get-default-provider-settings)
  - [Get Embedding Providers](#get-embedding-providers)
  - [Get Extension Settings](#get-extension-settings)
  - [Get Extension Commands](#get-extension-commands)
    - [Details of Extension Commands](#details-of-extension-commands)
  - [Get command arguments](#get-command-arguments)
  - [Create a new Agent](#create-a-new-agent)
  - [Execute a Command](#execute-a-command)
  - [Get a list of all current Agents](#get-a-list-of-all-current-agents)
  - [Rename the test agent](#rename-the-test-agent)
  - [Get the agent's settings](#get-the-agents-settings)
  - [Update the agent's settings](#update-the-agents-settings)
  - [Get a list of the agent's commands](#get-a-list-of-the-agents-commands)
  - [Toggle a Command for the Agent](#toggle-a-command-for-the-agent)
  - [Update Agent Commands](#update-agent-commands)
  - [Create a new conversation](#create-a-new-conversation)
  - [Get Conversations](#get-conversations)
  - [Get Conversation Details](#get-conversation-details)
  - [Delete Message from Conversation](#delete-message-from-conversation)
  - [Delete a Conversation](#delete-a-conversation)
  - [Have the Agent Learn from specified Text](#have-the-agent-learn-from-specified-text)
  - [Have the Agent Learn from a File](#have-the-agent-learn-from-a-file)
  - [Have the Agent Learn from a URL](#have-the-agent-learn-from-a-url)
  - [Get the Agents Memories](#get-the-agents-memories)
  - [Chat with the Agent](#chat-with-the-agent)
  - [Delete a Memory](#delete-a-memory)
  - [Wipe the agents memories](#wipe-the-agents-memories)
  - [Instruct the Agent to do something](#instruct-the-agent-to-do-something)
  - [Prompt the Agent](#prompt-the-agent)
  - [Get a list of Chains available to use](#get-a-list-of-chains-available-to-use)
  - [Create a new chain](#create-a-new-chain)
  - [Rename the chain](#rename-the-chain)
  - [Add Chain Steps](#add-chain-steps)
  - [Get the content of the chain](#get-the-content-of-the-chain)
  - [Get Chain Arguments](#get-chain-arguments)
  - [Modify a Chain Step](#modify-a-chain-step)
  - [Move a Chain Step](#move-a-chain-step)
  - [Delete a step from the chain](#delete-a-step-from-the-chain)
  - [Add a Command to the Chain](#add-a-command-to-the-chain)
  - [Run the chain](#run-the-chain)
  - [Get the responses from the chain running](#get-the-responses-from-the-chain-running)
  - [Delete the chain](#delete-the-chain)
  - [Get a list of prompts available to use](#get-a-list-of-prompts-available-to-use)
  - [Get the content of a prompt](#get-the-content-of-a-prompt)
  - [Create a new prompt](#create-a-new-prompt)
  - [Get the prompt variables](#get-the-prompt-variables)
  - [Update the prompt content](#update-the-prompt-content)
  - [Delete the prompt](#delete-the-prompt)
  - [Delete the Agent](#delete-the-agent)
  - [More Documentation](#more-documentation)

## Installation

```bash
npm install agixt
```

## Usage

Import the SDK:

```typescript
import AGiXTSDK from 'agixt';
```

Create an SDK instance:

```typescript
const agixt = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: 'YOUR_API_KEY',
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
- `getAgentMemories(agentName, userInput, limit, minRelevanceScore, collectionNumber)` - Get memories for an agent
- `learnUrl(agentName, url, collectionNumber)` - Learn from a URL
- `learnFile(agentName, fileName, fileContent, collectionNumber)` - Learn from a file
- `learnGithubRepo(agentName, repo, user, token, branch, collectionNumber)` - Learn from a GitHub repo
- `wipeAgentMemories(agentName, collectionNumber)` - Wipe an agent's memories
- `deleteAgentMemory(agentName, memoryId, collectionNumber)` - Delete a memory

### Conversations

- `getConversations(agentName)` - Get conversations for an agent or all agents
- `getConversation(agentName, conversationName, limit, page)` - Get a conversation
- `newConversation(agentName, conversationName, conversationContent)` - Start a new conversation
- `deleteConversation(agentName, conversationName)` - Delete a conversation
- `deleteConversationMessage(agentName, conversationName, message)` - Delete a message

### Prompting

- `promptAgent(agentName, promptName, promptArgs)` - Prompt an agent
- `instruct(agentName, userInput, conversation)` - Instruct with no memory
- `chat(agentName, userInput, conversation, contextResults)` - Chat with no memory
- `smartinstruct(agentName, userInput, conversation)` - Smart instruct with no memory
- `smartchat(agentName, userInput, conversation)` - Smart chat with no memory

### Commands

- `getCommands(agentName)` - Get commands for an agent
- `toggleCommand(agentName, commandName, enable)` - Enable/disable a command
- `executeCommand(agentName, commandName, commandArgs, conversation)` - Execute a command

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

# Usage Examples

The purpose of this documentation is to provide syntax and reponse examples for the AGiXT Typescript SDK to help developers get started with the SDK. If you have the [Node.js Notebooks](https://marketplace.visualstudio.com/items?itemName=donjayamanne.typescript-notebook) extension for VSCode, you can open the `tests.nnb` file in this directory to see the examples in action.

## Get a list of Providers

This will get a list of AI Providers available to use with AGiXT.

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const providers = await ApiClient.getProviders();
console.log(providers);
```

```
[
  'perplexity',  'gpt4free',
  'azure',       'chatgpt',
  'runpod',      'poe',
  'oobabooga',   'openai',
  'huggingface', 'pipeline',
  'fastchat',    'agixt',
  'palm',        'claude',
  'huggingchat', 'llamacppapi',
  'petal',       'kobold',
  'llamacpp',    'custom',
  'bard'
]
```

## Get Default Provider Settings

Choose a provider from the list of AI providers and get the default settings for that provider. For this example, we're choosing to see the settings for the `openai` provider.

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const provider_settings = await ApiClient.getProviderSettings('openai');
console.log(provider_settings);
```

```
{
  OPENAI_API_KEY: '',
  AI_MODEL: 'gpt-3.5-turbo-16k-0613',
  AI_TEMPERATURE: 0.7,
  AI_TOP_P: 0.7,
  MAX_TOKENS: 16384,
  API_URI: 'https://api.openai.com/v1',
  WAIT_BETWEEN_REQUESTS: 1,
  WAIT_AFTER_FAILURE: 3,
  stream: 'false',
  provider: 'openai'
}
```

## Get Embedding Providers

Embedding providers are used to embed information to vectors to store in the vector database to be searched for context injection.

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const embedding_providers = await ApiClient.getEmbedProviders();
console.log(embedding_providers);
```

```
[
  'default',
  'azure',
  'openai',
  'google_palm',
  'google_vertex',
  'cohere'
]
```

## Get Extension Settings

This is where we get all third party extension settings for the agent with defaults to fill in when there is nothing entered on the front end.

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const extension_settings = await ApiClient.getExtensionSettings();
console.log(extension_settings);
```

```
{
  macostts: { USE_MAC_OS_TTS: false },
  file_system: {
    WORKING_DIRECTORY: './WORKSPACE',
    WORKING_DIRECTORY_RESTRICTED: true
  },
  streamlabs_tts: { USE_STREAMLABS_TTS: true, STREAMLABS_VOICE: 'Brian' },
  whisper_stt: { WHISPER_MODEL: 'base.en' },
  huggingface: {
    HUGGINGFACE_API_KEY: '',
    HUGGINGFACE_AUDIO_TO_TEXT_MODEL: 'facebook/wav2vec2-large-960h-lv60-self'
  },
  discord: { DISCORD_API_KEY: '', DISCORD_COMMAND_PREFIX: '/AGiXT' },
  dalle: { OPENAI_API_KEY: '' },
  google: { GOOGLE_API_KEY: '' },
  github: { GITHUB_USERNAME: '', GITHUB_API_KEY: '' },
  stable_diffusion: {
    STABLE_DIFFUSION_API_URL: 'https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5',
    HUGGINGFACE_API_KEY: ''
  },
  gtts: { USE_GTTS: false },
  elevenlabs: { ELEVENLABS_API_KEY: '', ELEVENLABS_VOICE: 'Josh' },
  sendgrid_email: { SENDGRID_API_KEY: '', SENDGRID_EMAIL: '' },
  searxng: { SEARXNG_INSTANCE_URL: '' },
  twitter: {
    TW_CONSUMER_KEY: '',
    TW_CONSUMER_SECRET: '',
    TW_ACCESS_TOKEN: '',
    TW_ACCESS_TOKEN_SECRET: ''
  }
}
```

## Get Extension Commands

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const extensions = await ApiClient.getExtensions();
console.log(extensions);
console.log(extensions[0]);
```

```
[
  {
    extension_name: 'Web Playwright',
    description: 'Web Playwright',
    settings: [],
    commands: [ [Object], [Object], [Object] ]
  },
  {
    extension_name: 'Agixt Actions',
    description: 'Agixt Actions',
    settings: [],
    commands: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object]
    ]
  },
  {
    extension_name: 'Macostts',
    description: 'Macostts',
    settings: [ 'USE_MAC_OS_TTS' ],
    commands: [ [Object] ]
  },
  {
    extension_name: 'File System',
    description: 'File System',
    settings: [ 'WORKING_DIRECTORY', 'WORKING_DIRECTORY_RESTRICTED' ],
    commands: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object]
    ]
  },
  {
    extension_name: 'Streamlabs Tts',
    description: 'Streamlabs Tts',
    settings: [ 'USE_STREAMLABS_TTS', 'STREAMLABS_VOICE' ],
    commands: [ [Object] ]
  },
  {
    extension_name: 'Whisper Stt',
    description: 'Whisper Stt',
    settings: [ 'WHISPER_MODEL' ],
    commands: [ [Object] ]
  },
  {
    extension_name: 'Huggingface',
    description: 'Huggingface',
    settings: [ 'HUGGINGFACE_API_KEY', 'HUGGINGFACE_AUDIO_TO_TEXT_MODEL' ],
    commands: [ [Object], [Object] ]
  },
  {
    extension_name: 'Discord',
    description: 'Discord',
    settings: [ 'DISCORD_API_KEY', 'DISCORD_COMMAND_PREFIX' ],
    commands: []
  },
  {
    extension_name: 'Dalle',
    description: 'Dalle',
    settings: [ 'OPENAI_API_KEY' ],
    commands: []
  },
  {
    extension_name: 'Google',
    description: 'Google',
    settings: [ 'GOOGLE_API_KEY' ],
    commands: []
  },
  {
    extension_name: 'Github',
    description: 'Github',
    settings: [ 'GITHUB_USERNAME', 'GITHUB_API_KEY' ],
    commands: [ [Object] ]
  },
  {
    extension_name: 'Stable Diffusion',
    description: 'Stable Diffusion',
    settings: [ 'STABLE_DIFFUSION_API_URL', 'HUGGINGFACE_API_KEY' ],
    commands: [ [Object] ]
  },
  {
    extension_name: 'Gtts',
    description: 'Gtts',
    settings: [ 'USE_GTTS' ],
    commands: []
  },
  {
    extension_name: 'Times',
    description: 'Times',
    settings: [],
    commands: [ [Object] ]
  },
  {
    extension_name: 'Elevenlabs',
    description: 'Elevenlabs',
    settings: [ 'ELEVENLABS_API_KEY', 'ELEVENLABS_VOICE' ],
    commands: [ [Object] ]
  },
  {
    extension_name: 'Sendgrid Email',
    description: 'Sendgrid Email',
    settings: [ 'SENDGRID_API_KEY', 'SENDGRID_EMAIL' ],
    commands: []
  },
  {
    extension_name: 'Searxng',
    description: 'Searxng',
    settings: [ 'SEARXNG_INSTANCE_URL' ],
    commands: [ [Object] ]
  },
  {
    extension_name: 'Twitter',
    description: 'Twitter',
    settings: [
      'TW_CONSUMER_KEY',
      'TW_CONSUMER_SECRET',
      'TW_ACCESS_TOKEN',
      'TW_ACCESS_TOKEN_SECRET'
    ],
    commands: []
  }
]
{
  extension_name: 'Web Playwright',
  description: 'Web Playwright',
  settings: [],
  commands: [
    {
      friendly_name: 'Scrape Text with Playwright',
      command_name: 'scrape_text_with_playwright',
      command_args: [Object]
    },
    {
      friendly_name: 'Scrape Links with Playwright',
      command_name: 'scrape_links_with_playwright',
      command_args: [Object]
    },
    {
      friendly_name: 'Take Screenshot with Playwright',
      command_name: 'take_screenshot_with_playwright',
      command_args: [Object]
    }
  ]
}
```

### Details of Extension Commands

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const extensions = await ApiClient.getExtensions();
// Example of data under commands for the File system extension.
console.log(extensions[3].commands);
```

```
[
  {
    friendly_name: 'Write to File',
    command_name: 'write_to_file',
    command_args: { filename: '', text: '' }
  },
  {
    friendly_name: 'Read File',
    command_name: 'read_file',
    command_args: { filename: '' }
  },
  {
    friendly_name: 'Search Files',
    command_name: 'search_files',
    command_args: { directory: '' }
  },
  {
    friendly_name: 'Append to File',
    command_name: 'append_to_file',
    command_args: { filename: '', text: '' }
  },
  {
    friendly_name: 'Execute Python File',
    command_name: 'execute_python_file',
    command_args: { file: '' }
  },
  {
    friendly_name: 'Delete File',
    command_name: 'delete_file',
    command_args: { filename: '' }
  },
  {
    friendly_name: 'Execute Shell',
    command_name: 'execute_shell',
    command_args: { command_line: '' }
  },
  {
    friendly_name: 'Indent String for Python Code',
    command_name: 'indent_string',
    command_args: { string: '', indents: 1 }
  },
  {
    friendly_name: 'Generate Commands Dictionary',
    command_name: 'generate_commands_dict',
    command_args: { python_file_content: '' }
  }
]
```

## Get command arguments

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const command_args = await ApiClient.getCommandArgs('Write to File');
console.log(command_args);
```

```
{ filename: '', text: '' }
```

## Create a new Agent

Creates a new agent with the `gpt4free` provider.

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});

const new_agent = await ApiClient.addAgent('Test Agent', {
  provider: 'gpt4free',
  embedder: 'default',
  AI_MODEL: 'gpt-3.5-turbo',
  AI_TEMPERATURE: '0.7',
  AI_TOP_P: '1',
  MAX_TOKENS: '4096',
  helper_agent_name: 'OpenAI',
  WEBSEARCH_TIMEOUT: 0,
  OPENAI_API_KEY: OPENAI_API_KEY,
  WAIT_BETWEEN_REQUESTS: 1,
  WAIT_AFTER_FAILURE: 3,
  stream: false,
  WORKING_DIRECTORY: './WORKSPACE',
  WORKING_DIRECTORY_RESTRICTED: true,
  AUTONOMOUS_EXECUTION: false,
});
console.log(new_agent);
```

```
{ message: 'Agent Test Agent created.' }
```

## Execute a Command

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const agent_name = 'Test Agent';
const conversation_name = 'Command execution for testing';
const command_name = 'Write to File';
const command_args = {
  filename: 'test file.txt',
  text: 'This is just a test!',
};

const command_execution = await ApiClient.executeCommand(agent_name, command_name, command_args, conversation_name);
console.log(command_execution);
```

```
Unable to retrieve data.
```

## Get a list of all current Agents

Any agents that you have created will be listed here.

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const agents = await ApiClient.getAgents();
console.log(agents);
```

```
[
  { name: 'New Test Agent', status: false },
  { name: 'FreeAgent', status: false },
  { name: 'gpt4free', status: false },
  { name: 'OpenOrca', status: false },
  { name: 'OpenOrca-13B', status: false },
  { name: 'easychat', status: false },
  { name: 'Vicuna', status: false },
  { name: 'OpenAI', status: false },
  { name: 'Starchat', status: false },
  { name: '[object Object]', status: false }
]
```

## Rename the test agent

We will just rename it to `New Test Agent`.

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const rename_agent = await ApiClient.renameAgent('Test Agent', 'New Test Agent');
console.log(rename_agent);
```

```
{ message: 'Agent renamed.' }
```

## Get the agent's settings

This will get the settings for the agent we just created, this will tell you all commands available to the agent as well as all of the provider settings for the agent.

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const agent_config = await ApiClient.getAgentConfig('New Test Agent');
console.log(agent_config);
```

```
{
  commands: {
    'Scrape Text with Playwright': false,
    'Scrape Links with Playwright': false,
    'Take Screenshot with Playwright': false,
    'Create Task Chain': false,
    'Generate Extension from OpenAPI': false,
    'Generate Agent Helper Chain': false,
    'Ask for Help or Further Clarification to Complete Task': false,
    'Create a new command': false,
    'Execute Python Code': false,
    'Get Python Code from Response': false,
    'Get Mindmap for task to break it down': false,
    'Speak with MacOS TTS': false,
    'Write to File': true,
    'Read File': false,
    'Search Files': false,
    'Append to File': false,
    'Execute Python File': false,
    'Delete File': false,
    'Execute Shell': false,
    'Indent String for Python Code': false,
    'Generate Commands Dictionary': false,
    'Speak with TTS with Streamlabs Text to Speech': false,
    'Read Audio from File': false,
    'Read Audio from File with Huggingface': false,
    'Read Audio with Huggingface': false,
    'Clone Github Repository': false,
    'Generate Image with Stable Diffusion': false,
    'Get Datetime': false,
    'Speak with TTS Using Elevenlabs': false,
    'Use The Search Engine': false
  },
  settings: {
    provider: 'openai',
    embedder: 'openai',
    AI_MODEL: 'gpt-3.5-turbo-16k-0613',
    AI_TEMPERATURE: '0.8',
    AI_TOP_P: '1',
    MAX_TOKENS: '16000',
    helper_agent_name: 'OpenAI',
    WEBSEARCH_TIMEOUT: 0,
    OPENAI_API_KEY: 'YOUR_OPENAI_API_KEY_HERE',
    WAIT_BETWEEN_REQUESTS: 1,
    WAIT_AFTER_FAILURE: 3,
    stream: false,
    WORKING_DIRECTORY: './WORKSPACE',
    WORKING_DIRECTORY_RESTRICTED: true,
    AUTONOMOUS_EXECUTION: false
  }
}
```

## Update the agent's settings

We'll just update the temperature from the default `0.7` to `0.8` to confirm that we can modify a setting.

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const agent_config = await ApiClient.getAgentConfig('New Test Agent');
agent_config.settings.AI_TEMPERATURE = '0.8';
const update_agent_config = await ApiClient.updateAgentSettings('New Test Agent', agent_config.settings);
console.log(update_agent_config);
```

```
Agent New Test Agent configuration updated.
```

## Get a list of the agent's commands

This will get a list of all commands available to the agent.

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const agent_commands = await ApiClient.getCommands('New Test Agent');
console.log(agent_commands);
```

```
{
  'Scrape Text with Playwright': false,
  'Scrape Links with Playwright': false,
  'Take Screenshot with Playwright': false,
  'Create Task Chain': false,
  'Generate Extension from OpenAPI': false,
  'Generate Agent Helper Chain': false,
  'Ask for Help or Further Clarification to Complete Task': false,
  'Create a new command': false,
  'Execute Python Code': false,
  'Get Python Code from Response': false,
  'Get Mindmap for task to break it down': false,
  'Speak with MacOS TTS': false,
  'Write to File': true,
  'Read File': false,
  'Search Files': false,
  'Append to File': false,
  'Execute Python File': false,
  'Delete File': false,
  'Execute Shell': false,
  'Indent String for Python Code': false,
  'Generate Commands Dictionary': false,
  'Speak with TTS with Streamlabs Text to Speech': false,
  'Read Audio from File': false,
  'Read Audio from File with Huggingface': false,
  'Read Audio with Huggingface': false,
  'Clone Github Repository': false,
  'Generate Image with Stable Diffusion': false,
  'Get Datetime': false,
  'Speak with TTS Using Elevenlabs': false,
  'Use The Search Engine': false
}
```

## Toggle a Command for the Agent

We'll toggle the `Write to File` command to `true` to confirm that we can toggle a command.

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const toggle_command = await ApiClient.toggleCommand('New Test Agent', 'Write to File', true);
console.log(toggle_command);
```

```
Command 'Write to File' toggled for agent 'New Test Agent'.
```

## Update Agent Commands

In this example, we'll only change the `Write to File` command to `False`, but we could change any (or all) of the commands with this API call.

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const agent_config = await ApiClient.getAgentConfig('New Test Agent');
// Change agent_config.commands command of "Write to File" to false.
agent_config.commands['Write to File'] = false;
const update_agent_config = await ApiClient.updateAgentCommands('New Test Agent', agent_config.commands);
console.log(update_agent_config);
```

```
Agent New Test Agent configuration updated.
```

## Create a new conversation

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const conversation = await ApiClient.newConversation('New Test Agent', 'New Test Conversation');
console.log(conversation);
```

```
[]
```

## Get Conversations

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const conversations = await ApiClient.getConversations();
console.log(conversations);
```

```
[
  'Talk about chains',
  'AGiXT Conversation',
  'OpenAI History',
  'gpt4free conversation',
  'New Test Conversation',
  'Stable diffusion chain',
  'Test',
  'AGiXT Chains',
  'Talk about AGiXT with OpenOrca'
]
```

## Get Conversation Details

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const conversation = await ApiClient.getConversation('New Test Agent', 'Test', 100, 1);
console.log(conversation);
```

```
[
  {
    message: 'What can you tell me about AGiXT?',
    role: 'USER',
    timestamp: 'August 09, 2023 05:17 PM'
  },
  {
    message: 'AGiXT is a dynamic Artificial Intelligence Automation Platform designed to manage AI instruction and task execution across various providers. It uses adaptive memory handling and a wide range of commands to enhance AI understanding and responsiveness. AGiXT features Smart Instruct and Smart Chat, which integrate web search, planning strategies, and conversation continuity to improve task completion. It also supports multiple AI providers, code evaluation, comprehensive chain management, and platform interoperability. AGiXT aims to push the boundaries of AI and contribute to the development of Artificial General Intelligence (AGI).',
    role: 'OpenAI',
    timestamp: 'August 09, 2023 05:17 PM'
  }
]
```

## Delete Message from Conversation

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const conversation = await ApiClient.getConversation('New Test Agent', 'Test', 100, 1);
console.log(conversation);

const delete_message = await ApiClient.deleteConversationMessage('New Test Agent', 'Test', conversation[0].message);
console.log(delete_message);
```

```
[
  {
    message: 'What can you tell me about AGiXT?',
    role: 'USER',
    timestamp: 'August 09, 2023 05:17 PM'
  },
  {
    message: 'AGiXT is a dynamic Artificial Intelligence Automation Platform designed to manage AI instruction and task execution across various providers. It uses adaptive memory handling and a wide range of commands to enhance AI understanding and responsiveness. AGiXT features Smart Instruct and Smart Chat, which integrate web search, planning strategies, and conversation continuity to improve task completion. It also supports multiple AI providers, code evaluation, comprehensive chain management, and platform interoperability. AGiXT aims to push the boundaries of AI and contribute to the development of Artificial General Intelligence (AGI).',
    role: 'OpenAI',
    timestamp: 'August 09, 2023 05:17 PM'
  }
]

Message deleted.
```

## Delete a Conversation

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const conversation = await ApiClient.deleteConversation('New Test Agent', 'Test');
console.log(conversation);
```

```
Conversation `Test` for agent gpt4free deleted.
```

## Have the Agent Learn from specified Text

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const text_learning = await ApiClient.learnText(
  'New Test Agent',
  'What is AGiXT?',
  'AGiXT is an open-source artificial intelligence automation platform.',
  0,
);
console.log(text_learning);
```

```
Agent learned the content from the text assocated with the user input.
```

## Have the Agent Learn from a File

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const file_learning = await ApiClient.learnFile('New Test Agent', 'text.txt', 'Test content of test.txt', 0);
console.log(file_learning);
```

```
Agent learned the content from the file.
```

## Have the Agent Learn from a URL

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const url_learning = await ApiClient.learnUrl('New Test Agent', 'https://josh-xt.github.io/AGiXT/', 0);
console.log(url_learning);
```

```
Agent learned the content from the url.
```

## Get the Agents Memories

Get some relevant memories from the agent about AGiXT.

```typescript
// Get Agent Memories
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const memories = await ApiClient.getAgentMemories('New Test Agent', 'What can you tell me about AGiXT?', 5, 0.2, 0);
console.log(memories);
```

```
[
  {
    is_reference: false,
    external_source_name: 'user input',
    id: '8ad623a743cd9925814bce5e3fd31d842b9fd0151e8988542f6dded42b00e176',
    description: 'What is AGiXT?',
    text: 'AGiXT is an open - source artificial intelligence automation platform .',
    embedding: [
       -0.024438004940748215,    -0.01262328214943409,    0.003391069592908025,
      -0.0077370754443109035,      0.0174816083163023,    0.028201987966895103,
       -0.017802244052290916,   0.0019813186954706907,    0.018067115917801857,
      -0.0063848295249044895,    0.028397157788276672,    0.008050740696489811,
       -0.009131142869591713,   -0.010901608504354954,    0.004589967895299196,
       -0.007179448381066322,    0.005987520329654217,    0.025162920355796814,
      -0.0020719331223517656,   0.0010002434719353914,    0.005123198498040438,
         0.03490745276212692,   -0.006398770492523909,   -0.004715433809906244,
       -0.010755231603980064,   -0.003272573696449399,  -0.0016833366826176643,
        -0.03404313325881958,    0.003012928646057844,   0.0011553335934877396,
       -0.003913844935595989,   -0.015195337124168873,   -0.010113961063325405,
       -0.002901403233408928,   -0.009110231883823872,   -0.019210251048207283,
        0.014386777766048908,   -0.005590211134403944,    0.005935242865234613,
      -0.0003448139177635312,    0.030446436256170273, -0.00005339388007996604,
        0.002376885386183858,  -0.0024570440873503685,   -0.003920815419405699,
        0.017523430287837982,    -0.01764889620244503,   -0.005639003589749336,
       -0.005077891517430544,    -0.00570870703086257,     -0.0214547012001276,
        0.021078303456306458,    -0.00961906649172306,   -0.004244936164468527,
       0.0067368317395448685,   -0.012449024245142937,    0.004129925277084112,
      -0.0007876481977291405,     0.02413131110370159,     0.00693200109526515,
       -0.005060465540736914,   -0.011940189637243748,   -0.020715845748782158,
        0.014651650562882423,    -0.01665910892188549,    0.003446832299232483,
       -0.013738536275923252,    0.020311566069722176,   -0.003087859833613038,
       -0.022137794643640518,    0.026069065555930138,    0.018290167674422264,
       -0.027226140722632408,   -0.016910040751099586,     0.03242601454257965,
        0.021398937329649925,  -0.0008634506375528872,   -0.014512243680655956,
       -0.018262285739183426,    0.021357115358114243,   0.0009270549635402858,
       -0.007757986430078745,    -0.01678457483649254,    0.012142329476773739,
        0.012504786252975464,    0.006405740976333618,    -0.01658940501511097,
        0.013857032172381878,    0.005851598922163248,    -0.02230508252978325,
        0.011194363236427307,   -0.018499277532100677,    0.041487451642751694,
         0.01801135390996933,    -0.01629665121436119,     0.02703097090125084,
       -0.014247370883822441, -0.00014594144886359572,   -0.009152053855359554,
        -0.03560448810458183,
      ... 1436 more items
    ],
    additional_metadata: 'AGiXT is an open - source artificial intelligence automation platform .',
    key: '8ad623a743cd9925814bce5e3fd31d842b9fd0151e8988542f6dded42b00e176',
    timestamp: '2023-08-27T13:11:56.714343',
    relevance_score: 0.8879368389976283
  },
]
# Removed other results for brevity
```

## Chat with the Agent

Chat about the learned information with the agent.

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const chat_response = await ApiClient.chat(
  'New Test Agent',
  'What can you tell me about AGiXT?',
  'New Test Conversation',
  6,
);
console.log(chat_response);
```

```
AGiXT is an open-source artificial intelligence automation platform. It is designed to orchestrate efficient AI instruction management and task execution across various providers. AGiXT incorporates adaptive memory handling, smart features like Smart Instruct and Smart Chat, and a versatile plugin system to maximize AI potential. It supports multiple AI providers such as OpenAI GPT series, Hugging Face Huggingchat, GPT4All, GPT4Free, Oobabooga Text Generation Web UI, Kobold, llama.cpp, FastChat, Google Bard, Bing, and more. AGiXT also offers features like context and token management, task execution and management, chain management, web browsing and command execution, and platform interoperability. It aims to bring Artificial General Intelligence (AGI) closer to reality and is continually evolving to stay at the forefront of AI technology.
```

## Delete a Memory

Delete a specific memory by Memory ID.

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const memories = await ApiClient.getAgentMemories('New Test Agent', 'What can you tell me about AGiXT?', 1, 0.2, 0);
// Get the last memory id
const memory_id = memories[0].id;
const delete_memory = await ApiClient.deleteAgentMemory('New Test Agent', memory_id, 0);
console.log(delete_memory);
```

```
Memory 8ad623a743cd9925814bce5e3fd31d842b9fd0151e8988542f6dded42b00e176 for agent New Test Agent deleted.
```

## Wipe the agents memories

This is necessary if you want the agent to serve a different purpose than its original intent after it has learned things. It may inject unnecessary context into the conversation if you don't wipe its memory and try to give it a different purpose, even temporarily.

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const wipe_memories = await ApiClient.wipeAgentMemories('New Test Agent', 0);
console.log(wipe_memories);
```

```
Memories for agent New Test Agent deleted.
```

## Instruct the Agent to do something

We'll do something simple with it for the sake of the basic example, we'll just tell it to `Tell me the capital of France`.

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const instruction = await ApiClient.instruct(
  'New Test Agent',
  "Save a file with the the capital of France in it called 'france.txt'.",
  'New Test Conversation',
);
console.log(instruction);
```

```
{
    "response": "The capital of France is Paris.",
    "commands": {
        "Write to File": {
            "filename": "france.txt",
            "text": "Paris"
        }
    }
}

("Agent execution chain for command Write to File with args {'filename': 'france.txt', 'text': 'Paris'} updated.",)
```

## Prompt the Agent

Use a custom Prompt Template to prompt the agent. For our example, we'll use our "Write a Poem" prompt template to have the agent write a poem for us about dragons.

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const prompt_name = 'Write a Haiku';
const prompt_args = {
  user_input: 'Show me 2.',
  subject: 'dragons',
  websearch: false,
  websearch_depth: 0,
  context_results: 0,
  shots: 1,
  conversation_name: 'Talk for Tests',
};
const agent_prompt = await ApiClient.promptAgent('New Test Agent', prompt_name, prompt_args);
console.log(agent_prompt);
```

```
In realms of fire and skies of gold,
Where legends dwell and tales unfold,
There lies a creature fierce and grand,
A creature known as the dragon's band.

With scales that shimmer in moonlit haze,
And eyes that blaze with ancient ways,
They soar through clouds with wings unfurled,
Guardians of a mythical world.

Oh, mighty dragon, guardian high,
Your presence fills the endless sky,
Your breath's a blaze that brings the night,
And sparks the stars with purest light.

From mountains high to valleys low,
Wherever you roam, your power does show,
Through forests deep and oceans wide,
You leave your mark, as legends confide.

But these guardians are not all the same,
For within their ranks, a dragon untamed,
A creature small, yet fierce in might,
Known as the dragon of the night.

With ebony wings that gleam like coal,
And eyes that hold secrets untold,
This dragon slumbers in shadows deep,
Where darkness reigns and secrets keep.

Yet when the moon shines bright and clear,
The dragon awakes without fear,
And spreads its wings in silent flight,
Unleashing magic in the moon's soft light.

Its scales reflect the starry sky,
As it soars and dances way up high,
A creature of elegance and grace,
Defying all limits, in every chase.

But the true beauty of dragons lies,
Not in their strength or fiery eyes,
But in their hearts, so wise and strong,
For they protect, and right the wrong.

So let us honor these mythical souls,
The guardians who make us whole,
For in their presence, we find our worth,
Guided by the dragons of this Earth.

```

## Get a list of Chains available to use

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const chains = await ApiClient.getChains();
console.log(chains);
```

```
[
  'Smart Instruct',
  'Smart Prompt',
  'Test_Commands',
  'Generate and Run Smart Task Chain',
  'Write a Poem',
  'Generate and Run Task Chain',
  'Smart Chat - No Research',
  'Generate Task Chain',
  'Generate Smart Task Chain',
  'Smart Chat',
  'Ask Helper Agent for Help',
  'Generate Image with Stable Diffusion',
  'Generate Smart Task Chain without Research',
  'Generate Task Chain without Research',
  'New Test Agent Command Suggestions',
  'Create New Command',
  'Solve Math Problem',
  'Smart Instruct - No Research'
]
```

## Create a new chain

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const chain = await ApiClient.addChain('Write another Poem');
console.log(chain);
```

```
Chain 'Write another Poem' created.
```

## Rename the chain

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const chain = await ApiClient.renameChain('Write another Poem', 'Poem Writing Chain');
console.log(chain);
```

```
Chain 'Write another Poem' renamed to 'Poem Writing Chain'.
```

## Add Chain Steps

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const add_step1 = await ApiClient.addStep('Poem Writing Chain', 1, 'New Test Agent', 'Prompt', {
  prompt_name: 'Write a Poem',
  subject: 'Artificial Intelligence',
});
console.log(add_step1);
const add_step2 = await ApiClient.addStep('Poem Writing Chain', 2, 'New Test Agent', 'Prompt', {
  prompt_name: 'Write a Poem',
  subject: 'Quantum Computers',
});
console.log(add_step2);
```

```
Step 1 added to chain 'Poem Writing Chain'.
Step 2 added to chain 'Poem Writing Chain'.
```

## Get the content of the chain

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const chain = await ApiClient.getChain('Poem Writing Chain');
console.log(chain.steps);
```

```
[
  {
    step: 1,
    agent_name: 'New Test Agent',
    prompt_type: 'Prompt',
    prompt: { prompt_name: 'Write a Poem', subject: 'Artificial Intelligence' }
  },
  {
    step: 2,
    agent_name: 'New Test Agent',
    prompt_type: 'Prompt',
    prompt: { prompt_name: 'Write a Poem', subject: 'Quantum Computers' }
  }
]
```

## Get Chain Arguments

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const chain = await ApiClient.getChainArgs('Smart Chat');
console.log(chain);
```

```
[ 'user_input', 'shot_count', 'task' ]
```

## Modify a Chain Step

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const chain = await ApiClient.updateStep('Poem Writing Chain', 1, 'New Test Agent', 'Prompt', {
  prompt_name: 'Write a Poem',
  subject: 'Artificial General Intelligence',
});
console.log(chain);
```

```
Step 1 updated for chain 'Poem Writing Chain'.
```

## Move a Chain Step

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const chain = await ApiClient.moveStep('Poem Writing Chain', 1, 2);
console.log(chain);
```

```
Step 1 moved to 2 in chain 'Poem Writing Chain'.
```

## Delete a step from the chain

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const chain = await ApiClient.deleteStep('Poem Writing Chain', 2);
console.log(chain);
```

```
Step 2 deleted from chain 'Poem Writing Chain'.
```

## Add a Command to the Chain

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const chain = await ApiClient.addStep('Poem Writing Chain', 2, 'New Test Agent', 'Command', {
  command_name: 'Write to File',
  filename: '{user_input}.txt',
  text: 'Poem:\n{STEP1}',
});
console.log(chain);
```

```
Step 2 added to chain 'Poem Writing Chain'.
```

## Run the chain

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const chain_args = {
  conversation_name: 'Talk for Tests',
};
const chain = await ApiClient.runChain('Poem Writing Chain', 'Super Poems', 'New Test Agent', false, 1, chain_args);
console.log(chain);
```

```
File written to successfully.
```

## Get the responses from the chain running

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const chain_response = await ApiClient.getChainResponses('Poem Writing Chain');
console.log(chain_response);
```

```
{
  '1': {
    agent_name: 'New Test Agent',
    prompt_type: 'Prompt',
    prompt: { prompt_name: 'Write a Poem', subject: 'Quantum Computers' },
    step: 1,
    response: "In the realm of mystery and science's realm,\n" +
      "Where quantum's secrets lie and overwhelm,\n" +
      'There lies a machine, a marvel to behold,\n' +
      'A quantum computer, a story yet untold.\n' +
      '\n' +
      'Its bits of information dance in quantum state,\n' +
      'A world of possibilities, a mind to captivate,\n' +
      'Where classical logic fails, quantum takes its stand,\n' +
      'A revolution born in this futuristic land.\n' +
      '\n' +
      'The qubits, tiny particles of boundless might,\n' +
      'Entangled in a dance, a cosmic light,\n' +
      'They can be ones and zeros all at once,\n' +
      'A dance of superposition, a quantum trounce.\n' +
      '\n' +
      'They entangle and entwine, a quantum web,\n' +
      'A tapestry of information, a cosmic ebb,\n' +
      'Where parallel universes merge and fuse,\n' +
      'A glimpse into the multiverse, the quantum muse.\n' +
      '\n' +
      'These quantum computers, a glimpse into the unknown,\n' +
      'They promise answers to questions that have grown,\n' +
      'Solving complex problems, cracking codes,\n' +
      'Unraveling the mysteries that the universe holds.\n' +
      '\n' +
      'From cryptography to drug discovery,\n' +
      "Simulating quantum physics, it's a symphony,\n" +
      'A tool of endless potential, a boundless sea,\n' +
      'Unlocking the secrets of the quantum decree.\n' +
      '\n' +
      'But challenges persist in this quantum sphere,\n' +
      'Noise and decoherence, a constant fear,\n' +
      'Yet scientists persist, their minds ablaze,\n' +
      'To harness the power of these quantum ways.\n' +
      '\n' +
      "So as we delve into this quantum realm,\n" +
      "Let's marvel at the wonders science can overwhelm,\n" +
      'For in the realm of mystery, where possibilities gleam,\n' +
      "Lies the promise of quantum, the future's dream."
  },
  '2': {
    agent_name: 'New Test Agent',
    prompt_type: 'Command',
    prompt: {
      command_name: 'Write to File',
      filename: '{user_input}.txt',
      text: 'Poem:\n{STEP1}'
    },
    step: 2,
    response: 'File written to successfully.'
  }
}
```

## Delete the chain

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const chain = await ApiClient.deleteChain('Poem Writing Chain');
console.log(chain);
```

```
Chain 'Poem Writing Chain' deleted.
```

## Get a list of prompts available to use

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const prompts = await ApiClient.getPrompts();
console.log(prompts);
```

```
[
  'Pseudo Code',
  'Chat with Commands',
  'Convert OpenAPI Endpoint',
  'Ask for Help',
  'SmartInstruct-Researcher',
  'Custom Input',
  'Title a Poem',
  'ValidationFailed',
  'SmartTask-CleanResponse',
  'Create a Skeleton',
  'Proofreader',
  'SmartChat-Researcher',
  'Evaluate Code',
  'Get ezsession Auth Type',
  'Expert Determination',
  'Tell Me How',
  'New Extension Format',
  'Execution',
  'Score Response',
  'Get Task Description',
  'Validation',
  'Write a Haiku',
  'SmartInstruct-Resolver',
  'SmartInstruct-CleanResponse',
  'AGiXT SD Generator_V3',
  'Translate Math to Python',
  'SmartInstruct-StepByStep',
  'instruct',
  'Pick a Poem Subject',
  'Task Execution',
  'Prompt Generator',
  'Check-Instruction',
  'Mindmap',
  'Get Clarification',
  'SmartTask-Execution',
  'SmartChat-Resolver',
  'Chat',
  'Create New Command',
  'SmartChat-CleanResponse',
  'Prioritize',
  'Pick-a-Link',
  'SmartInstruct-Execution',
  'Write a Poem',
  'JSONFormatter',
  'SmartTask-StepByStep',
  'Title a Chain',
  'Instruction',
  'WebSearch',
  'SmartChat-StepByStep',
  'Summarize Web Content',
  'Get Task List',
  'Break into steps'
]
```

## Get the content of a prompt

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const prompt_data = await ApiClient.getPrompt('Chat');
console.log(prompt_data);
```

```
 {context}
You are {agent_name}, an expert at answering the users question.  Use available context help answer the users questions.

Recent conversation history for context:
{conversation_history}

User's latest input: {user_input}

```

## Create a new prompt

We'll make a basic prompt that asks the AI to tell us a short story about a subject. The subject is not yet defined, it would be defined in a chain. Using `{variable_name}` in a prompt will allow you to define the variable in a chain and have it be used in the prompt.

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const new_prompt = await ApiClient.addPrompt('Short Story', 'Tell me a short story about {subject}', 'Default');
console.log(new_prompt);
```

```
Prompt 'Short Story' added.
```

## Get the prompt variables

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const prompt_args = await ApiClient.getPromptArgs('Short Story', 'Default');
console.log(prompt_args);
```

```
[ 'subject' ]
```

## Update the prompt content

We'll ask it to `Add a dragon to the story somehow` in the prompt to make the short story more interesting.

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const prompt = await ApiClient.updatePrompt(
  'Short Story',
  'Tell me a short story about {subject} and make it funny.',
  'Default',
);
console.log(prompt);
```

```
Prompt 'Short Story' updated.
```

## Delete the prompt

If you don't want the prompt anymore, delete it.

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const prompt = await ApiClient.deletePrompt('Short Story', 'Default');
console.log(prompt);
```

```
Prompt 'Short Story' deleted.
```

## Delete the Agent

If you are done with the agent and don't want or need it anymore, you can delete it along with everything associated with it, such as its memories, settings, and history. The Agent isn't just fired, it is dead.

```typescript
import AGiXTSDK from './index.ts';
const ApiClient = new AGiXTSDK({
  baseUri: 'http://localhost:7437',
  apiKey: '',
});
const agent = await ApiClient.deleteAgent('New Test Agent');
console.log(agent);
```

```
Agent New Test Agent deleted.
```

## More Documentation

Want to know more about AGiXT? Check out our [documentation](https://josh-xt.github.io/AGiXT/) or [GitHub](https://github.com/Josh-XT/AGiXT) page.
