/**
 * @license
 * Copyright 2025 OmniModel Team
 * SPDX-License-Identifier: Apache-2.0
 */
import { type ModelProvider, type Message, type ModelResponse, type StreamChunk, type Model, type ProviderConfig } from './providers/types.js';
export interface MultiModelConfig {
    defaultProvider?: string;
    defaultModel?: string;
    providers: Record<string, ProviderConfig>;
}
export declare class MultiModelClient {
    private config;
    private currentProvider?;
    constructor(config: MultiModelConfig);
    initialize(): Promise<void>;
    setProvider(providerName: string): void;
    getCurrentProvider(): ModelProvider;
    chat(messages: Message[], providerName?: string): Promise<ModelResponse>;
    stream(messages: Message[], providerName?: string): AsyncIterable<StreamChunk>;
    getModels(providerName?: string): Promise<Model[]>;
    getAvailableProviders(): string[];
    private getProviderByName;
}
//# sourceMappingURL=multiModelClient.d.ts.map