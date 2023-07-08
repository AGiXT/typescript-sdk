[![GitHub](https://img.shields.io/badge/GitHub-Sponsor%20Josh%20XT-blue?logo=github&style=plastic)](https://github.com/sponsors/Josh-XT) [![PayPal](https://img.shields.io/badge/PayPal-Sponsor%20Josh%20XT-blue.svg?logo=paypal&style=plastic)](https://paypal.me/joshxt) [![Ko-Fi](https://img.shields.io/badge/Kofi-Sponsor%20Josh%20XT-blue.svg?logo=kofi&style=plastic)](https://ko-fi.com/joshxt)

# AGiXT SDK for TypeScript

[![GitHub](https://img.shields.io/badge/GitHub-AGiXT%20Core-blue?logo=github&style=plastic)](https://github.com/Josh-XT/AGiXT) [![GitHub](https://img.shields.io/badge/GitHub-AGiXT%20Hub-blue?logo=github&style=plastic)](https://github.com/AGiXT/hub) [![GitHub](https://img.shields.io/badge/GitHub-AGiXT%20Python%20SDK-blue?logo=github&style=plastic)](https://github.com/AGiXT/python-sdk) [![GitHub](https://img.shields.io/badge/GitHub-AGiXT%20Streamlit%20Web%20UI-blue?logo=github&style=plastic)](https://github.com/AGiXT/streamlit)

[![Discord](https://img.shields.io/discord/1097720481970397356?label=Discord&logo=discord&logoColor=white&style=plastic&color=5865f2)](https://discord.gg/d3TkHRZcjD) 
[![Twitter](https://img.shields.io/badge/Twitter-Follow_@Josh_XT-blue?logo=twitter&style=plastic)](https://twitter.com/Josh_XT) 

[![Logo](https://josh-xt.github.io/AGiXT/images/AGiXT-gradient-flat.svg)](https://josh-xt.github.io/AGiXT/)

This repository is for the [AGiXT](https://github.com/Josh-XT/AGiXT) SDK for TypeScript. https://www.npmjs.com/package/agixt
## Installation and Usage

1. Install the library by running the following command:
   ```
   npm install agixt
   ```

2. Import the library into your project:
   ```typescript
   import AGiXTSDK from 'agixt-sdk';
   ```

3. Create an instance of the AGiXTSDK class by providing the base URI and an optional API key:
   ```typescript
   const api = new AGiXTSDK('http://localhost:7437', 'your-api-key');
   ```

4. Use the available methods to interact with the AGiXT API. Here are some examples:

   - Get the list of available providers:
     ```typescript
     const providers = await api.getProviders();
     console.log(providers);
     ```

   - Get the settings for a specific provider:
     ```typescript
     const providerSettings = await api.getProviderSettings('provider-name');
     console.log(providerSettings);
     ```

   - Create a new agent:
     ```typescript
     const agent = await api.addAgent('agent-name');
     console.log(agent);
     ```

   - Get the list of agents:
     ```typescript
     const agents = await api.getAgents();
     console.log(agents);
     ```

   - Get the configuration of a specific agent:
     ```typescript
     const agentConfig = await api.getAgentConfig('agent-name');
     console.log(agentConfig);
     ```

   - Prompt the agent for a response:
     ```typescript
     const response = await api.promptAgent('agent-name', 'prompt-name', { prompt_args });
     console.log(response);
     ```

   - Run a chain of prompts:
     ```typescript
     const chainResponse = await api.runChain('chain-name', 'user-input', 'agent-name', false, 1);
     console.log(chainResponse);
     ```

   - Add a new prompt:
     ```typescript
     const newPrompt = await api.addPrompt('prompt-name', 'prompt');
     console.log(newPrompt);
     ```

   - Get the details of a specific prompt:
     ```typescript
     const promptDetails = await api.getPrompt('prompt-name');
     console.log(promptDetails);
     ```

   - Update the content of a prompt:
     ```typescript
     const updatedPrompt = await api.updatePrompt('prompt-name', 'new-prompt');
     console.log(updatedPrompt);
     ```

   - Delete a prompt:
     ```typescript
     const deletedPrompt = await api.deletePrompt('prompt-name');
     console.log(deletedPrompt);
     ```

   - Learn from a URL:
     ```typescript
     const learningResult = await api.learnUrl('agent-name', 'url');
     console.log(learningResult);
     ```

   - Learn from a file:
     ```typescript
     const learningResult = await api.learnFile('agent-name', 'file-name', 'file-content');
     console.log(learningResult);
     ```

   Note: The examples above are just a subset of the available methods. Refer to the library documentation or explore the code for more functionality.

5. Handle any errors that may occur during API calls. The methods in the AGiXTSDK class may throw errors, so it's important to catch and handle them appropriately.

That's it! You can now use the AGiXTSDK library to interact with the AGiXT API in your project.
## More Documentation
Want to know more about AGiXT?  Check out our [documentation](https://josh-xt.github.io/AGiXT/) or [GitHub](https://github.com/Josh-XT/AGiXT) page.
