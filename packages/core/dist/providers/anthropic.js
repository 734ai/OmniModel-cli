/**
 * @license
 * Copyright 2025 OmniModel Team
 * SPDX-License-Identifier: Apache-2.0
 */
import Anthropic from '@anthropic-ai/sdk';
import { ModelProvider } from './types.js';
export class AnthropicProvider extends ModelProvider {
    client;
    constructor() {
        super('anthropic');
    }
    async initialize(config) {
        if (!config.apiKey) {
            throw new Error('Anthropic API key is required');
        }
        this.client = new Anthropic({
            apiKey: config.apiKey,
            baseURL: config.baseUrl,
            timeout: config.timeout || 30000,
            maxRetries: config.retries || 3,
        });
        this.config = config;
        this.initialized = true;
    }
    validateConfig(config) {
        return !!config.apiKey && typeof config.apiKey === 'string';
    }
    async chat(messages) {
        if (!this.client) {
            throw new Error('Anthropic provider not initialized');
        }
        // Convert messages to Anthropic format
        const systemMessage = messages.find(m => m.role === 'system');
        const userMessages = messages.filter(m => m.role !== 'system');
        try {
            const response = await this.client.messages.create({
                model: this.config.model || 'claude-3-sonnet-20240229',
                max_tokens: this.config.maxTokens || 4096,
                temperature: this.config.temperature || 0.7,
                system: systemMessage?.content,
                messages: userMessages.map(msg => ({
                    role: msg.role,
                    content: msg.content,
                })),
            });
            const content = response.content[0];
            if (content?.type !== 'text') {
                throw new Error('Unexpected response format from Anthropic');
            }
            return {
                content: content.text,
                model: response.model,
                usage: response.usage ? {
                    promptTokens: response.usage.input_tokens,
                    completionTokens: response.usage.output_tokens,
                    totalTokens: response.usage.input_tokens + response.usage.output_tokens,
                } : undefined,
                finishReason: response.stop_reason || undefined,
                metadata: {
                    id: response.id,
                    type: response.type,
                },
            };
        }
        catch (error) {
            throw new Error(`Anthropic API error: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async *stream(messages) {
        if (!this.client) {
            throw new Error('Anthropic provider not initialized');
        }
        const systemMessage = messages.find(m => m.role === 'system');
        const userMessages = messages.filter(m => m.role !== 'system');
        try {
            const stream = await this.client.messages.create({
                model: this.config.model || 'claude-3-sonnet-20240229',
                max_tokens: this.config.maxTokens || 4096,
                temperature: this.config.temperature || 0.7,
                system: systemMessage?.content,
                messages: userMessages.map(msg => ({
                    role: msg.role,
                    content: msg.content,
                })),
                stream: true,
            });
            for await (const chunk of stream) {
                if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
                    yield {
                        content: chunk.delta.text,
                        done: false,
                        metadata: {
                            type: chunk.type,
                        },
                    };
                }
                if (chunk.type === 'message_stop') {
                    yield {
                        content: '',
                        done: true,
                        metadata: {
                            type: chunk.type,
                        },
                    };
                    break;
                }
            }
        }
        catch (error) {
            throw new Error(`Anthropic streaming error: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async getModels() {
        // Anthropic doesn't provide a models endpoint, so return known models
        return [
            {
                id: 'claude-3-5-sonnet-20241022',
                name: 'Claude 3.5 Sonnet',
                provider: this.getName(),
                maxTokens: 200000,
                multimodal: true,
            },
            {
                id: 'claude-3-5-haiku-20241022',
                name: 'Claude 3.5 Haiku',
                provider: this.getName(),
                maxTokens: 200000,
                multimodal: true,
            },
            {
                id: 'claude-3-opus-20240229',
                name: 'Claude 3 Opus',
                provider: this.getName(),
                maxTokens: 200000,
                multimodal: true,
            },
            {
                id: 'claude-3-sonnet-20240229',
                name: 'Claude 3 Sonnet',
                provider: this.getName(),
                maxTokens: 200000,
                multimodal: true,
            },
            {
                id: 'claude-3-haiku-20240307',
                name: 'Claude 3 Haiku',
                provider: this.getName(),
                maxTokens: 200000,
                multimodal: true,
            },
        ];
    }
}
