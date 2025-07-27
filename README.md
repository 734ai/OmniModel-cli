# OmniModel CLI
**"One tool to query them all."**

This repository contains the OmniModel CLI, a unified, extensible command‑line interface that lets you interact with any major LLM or multimodal model—from Google Gemini and xAI Grok, to OpenAI's GPT series, Anthropic's Claude, and beyond—using a single, consistent syntax.

With the OmniModel CLI you can:

- Query and edit large codebases across multiple AI models with unified commands
- Generate new apps from PDFs or sketches, using multimodal capabilities across providers
- Automate operational tasks with swappable AI backends
- Use tools and MCP servers to connect new capabilities
- Build cross‑model workflows, automations, and agent pipelines
- Switch between local, cloud, and self-hosted model endpoints seamlessly

## Key Features

- **Multi‑Model Support**: One CLI, dozens of back ends (Gemini, Grok, GPT-4, Claude, Llama, Mistral…)
- **Swappable Profiles**: Define model endpoints in `~/.omniform/config.yml`—use local Ollama, Vertex AI, Azure OpenAI, or self‑hosted
- **Unified Commands**: `omniform chat`, `omniform edit`, `omniform code`, `omniform multimodal` work the same across providers
- **Plugin System**: Add new models or tools via a simple Python or Node plugin spec
- **MCP‑Ready**: Hook into your own Memory+Tool-chain servers for agent orchestration

## Quickstart

You have two options to install OmniModel CLI.

### With Node

1. **Prerequisites:** Ensure you have [Node.js version 20](https://nodejs.org/en/download) or higher installed.
2. **Run the CLI:** Execute the following command in your terminal:

   ```bash
   npx @omnimodel/cli
   ```

   Or install it globally:

   ```bash
   npm install -g @omnimodel/cli
   ```

   Then, run the CLI from anywhere:

   ```bash
   omniform
   ```

### Configuration

3. **Pick a color theme**
4. **Configure your models:** Set up API keys for the models you want to use:

#### OpenAI API

```bash
export OPENAI_API_KEY="your_openai_api_key"
```

#### Anthropic Claude API

```bash
export ANTHROPIC_API_KEY="your_anthropic_api_key"
```

#### Google Gemini API

```bash
export GOOGLE_API_KEY="your_google_api_key"
```

#### xAI Grok API

```bash
export XAI_API_KEY="your_xai_api_key"
```

#### Local Models (Ollama)

```bash
export OLLAMA_HOST="http://localhost:11434"
```

You are now ready to use the OmniModel CLI!

## Examples

Once the CLI is running, you can start interacting with multiple AI models from your shell.

### Basic Chat

```bash
omniform chat "Explain quantum computing"
```

### Code Generation

```bash
omniform code "Create a Python web scraper using requests and BeautifulSoup"
```

### File Editing

```bash
omniform edit src/main.py --prompt "Add error handling to this function"
```

### Model Switching

```bash
omniform chat --model gpt-4 "What's the weather like?"
omniform chat --model claude-3 "What's the weather like?"
omniform chat --model gemini-2.5-pro "What's the weather like?"
```

### Multimodal Input

```bash
omniform multimodal image.png "Describe this image and write Python code to recreate it"
```

## Documentation

- [Installation Guide](./docs/installation.md)
- [Configuration](./docs/configuration.md)
- [Model Profiles](./docs/model-profiles.md)
- [Plugin Development](./docs/plugin-development.md)
- [MCP Integration](./docs/mcp-integration.md)
- [API Reference](./docs/api-reference.md)

## Supported Models

### Cloud APIs
- OpenAI (GPT-4, GPT-3.5, GPT-4 Turbo, GPT-4o)
- Anthropic (Claude 3 Haiku, Sonnet, Opus)
- Google (Gemini 1.5 Pro, Gemini 2.5 Pro)
- xAI (Grok-1, Grok-2)
- Cohere (Command R, Command R+)
- Mistral AI

### Local Models
- Ollama (Llama 3, Mistral, CodeLlama, etc.)
- LM Studio
- GPT4All
- Text Generation WebUI

### Enterprise/Self-Hosted
- Azure OpenAI
- Google Vertex AI
- AWS Bedrock
- Custom endpoints

## Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](./LICENSE) file for details.
