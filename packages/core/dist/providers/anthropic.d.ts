/**
 * @license
 * Copyright 2025 OmniModel Team
 * SPDX-License-Identifier: Apache-2.0
 */
import { ModelProvider, type ProviderConfig, type Message, type ModelResponse, type StreamChunk, type Model } from './types.js';
export declare class AnthropicProvider extends ModelProvider {
    private client?;
    constructor();
    initialize(config: ProviderConfig): Promise<void>;
    validateConfig(config: ProviderConfig): boolean;
    chat(messages: Message[]): Promise<ModelResponse>;
    stream(messages: Message[]): AsyncIterable<StreamChunk>;
    getModels(): Promise<Model[]>;
}
//# sourceMappingURL=anthropic.d.ts.map