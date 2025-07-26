# OmniModel CLI Agent Instructions

## Project Overview
OmniModel CLI is a unified command-line interface for interacting with multiple AI models and providers through a single, consistent API. The goal is to create "one tool to query them all."

## Architecture
- **packages/cli**: Main CLI interface and user experience
- **packages/core**: Core logic, model adapters, and shared functionality
- **scripts**: Build, development, and deployment scripts

## Development Guidelines

### Code Standards
- Use TypeScript with strict type checking
- Follow ESLint configuration
- Maintain consistent naming conventions
- Write comprehensive tests for all functionality

### Model Integration Pattern
Each AI provider should implement a common interface:
```typescript
interface ModelProvider {
  name: string;
  initialize(config: ProviderConfig): Promise<void>;
  chat(messages: Message[]): Promise<Response>;
  stream(messages: Message[]): AsyncIterable<StreamChunk>;
  getModels(): Promise<Model[]>;
}
```

### Configuration System
- Use YAML configuration files in ~/.omniform/
- Support environment variables for API keys
- Allow model switching via CLI flags
- Implement profile-based configurations

### CLI Commands Structure
- `omniform chat` - Interactive chat with selected model
- `omniform code` - Code generation and assistance
- `omniform edit` - File editing with AI assistance
- `omniform multimodal` - Multimodal input processing
- `omniform config` - Configuration management

### Current Development Priorities
1. Multi-model integration (Phase 3)
2. Model provider implementations (Phase 4)
3. Configuration system (Phase 5)
4. CLI command implementations (Phase 6)

### Testing Strategy
- Unit tests for core functionality
- Integration tests for model providers
- E2E tests for CLI commands
- Performance testing for large inputs

### Documentation Requirements
- API documentation for all public interfaces
- User guides for CLI usage
- Developer guides for extending functionality
- Model-specific configuration examples