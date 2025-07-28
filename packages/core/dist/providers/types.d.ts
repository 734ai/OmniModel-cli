/**
 * @license
 * Copyright 2025 OmniModel Team
 * SPDX-License-Identifier: Apache-2.0
 */
export interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
    images?: string[];
}
export interface StreamChunk {
    content: string;
    done: boolean;
    metadata?: Record<string, any>;
}
export interface Model {
    id: string;
    name: string;
    provider: string;
    maxTokens?: number;
    multimodal?: boolean;
    pricing?: {
        input: number;
        output: number;
        currency: string;
    };
}
export interface ProviderConfig {
    apiKey?: string;
    baseUrl?: string;
    model?: string;
    temperature?: number;
    maxTokens?: number;
    timeout?: number;
    retries?: number;
    [key: string]: any;
}
export interface ModelResponse {
    content: string;
    model: string;
    usage?: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
    };
    finishReason?: string;
    metadata?: Record<string, any>;
}
export declare abstract class ModelProvider {
    protected name: string;
    protected config: ProviderConfig;
    protected initialized: boolean;
    constructor(name: string);
    abstract initialize(config: ProviderConfig): Promise<void>;
    abstract chat(messages: Message[]): Promise<ModelResponse>;
    abstract stream(messages: Message[]): AsyncIterable<StreamChunk>;
    abstract getModels(): Promise<Model[]>;
    abstract validateConfig(config: ProviderConfig): boolean;
    getName(): string;
    isInitialized(): boolean;
    getConfig(): ProviderConfig;
}
export interface ProviderRegistry {
    register(provider: ModelProvider): void;
    get(name: string): ModelProvider | undefined;
    list(): string[];
    getAvailable(): ModelProvider[];
}
//# sourceMappingURL=types.d.ts.map