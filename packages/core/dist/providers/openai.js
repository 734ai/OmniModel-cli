/**
 * @license
 * Copyright 2025 OmniModel Team
 * SPDX-License-Identifier: Apache-2.0
 */
import OpenAI from 'openai';
import { ModelProvider } from './types.js';
export class OpenAIProvider extends ModelProvider {
    client;
    constructor() {
        super('openai');
    }
    async initialize(config) {
        if (!config.apiKey) {
            throw new Error('OpenAI API key is required');
        }
        this.client = new OpenAI({
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
            throw new Error('OpenAI provider not initialized');
        }
        const openaiMessages = messages.map(msg => ({
            role: msg.role,
            content: msg.content,
        }));
        try {
            const response = await this.client.chat.completions.create({
                model: this.config.model || 'gpt-4',
                messages: openaiMessages,
                temperature: this.config.temperature || 0.7,
                max_tokens: this.config.maxTokens,
            });
            const choice = response.choices[0];
            if (!choice?.message?.content) {
                throw new Error('No response content from OpenAI');
            }
            return {
                content: choice.message.content,
                model: response.model,
                usage: response.usage ? {
                    promptTokens: response.usage.prompt_tokens,
                    completionTokens: response.usage.completion_tokens,
                    totalTokens: response.usage.total_tokens,
                } : undefined,
                finishReason: choice.finish_reason || undefined,
                metadata: {
                    id: response.id,
                    created: response.created,
                },
            };
        }
        catch (error) {
            throw new Error(`OpenAI API error: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async *stream(messages) {
        if (!this.client) {
            throw new Error('OpenAI provider not initialized');
        }
        const openaiMessages = messages.map(msg => ({
            role: msg.role,
            content: msg.content,
        }));
        try {
            const stream = await this.client.chat.completions.create({
                model: this.config.model || 'gpt-4',
                messages: openaiMessages,
                temperature: this.config.temperature || 0.7,
                max_tokens: this.config.maxTokens,
                stream: true,
            });
            for await (const chunk of stream) {
                const choice = chunk.choices[0];
                if (choice?.delta?.content) {
                    yield {
                        content: choice.delta.content,
                        done: false,
                        metadata: {
                            id: chunk.id,
                            model: chunk.model,
                        },
                    };
                }
                if (choice?.finish_reason) {
                    yield {
                        content: '',
                        done: true,
                        metadata: {
                            finishReason: choice.finish_reason,
                        },
                    };
                    break;
                }
            }
        }
        catch (error) {
            throw new Error(`OpenAI streaming error: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async getModels() {
        if (!this.client) {
            throw new Error('OpenAI provider not initialized');
        }
        try {
            const response = await this.client.models.list();
            return response.data
                .filter(model => model.id.includes('gpt'))
                .map(model => ({
                id: model.id,
                name: model.id,
                provider: this.name,
                multimodal: model.id.includes('gpt-4') && !model.id.includes('gpt-4-turbo-preview'),
            }));
        }
        catch (error) {
            // Return common models if API call fails
            return [
                { id: 'gpt-4', name: 'GPT-4', provider: this.name, multimodal: true },
                { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', provider: this.name, multimodal: true },
                { id: 'gpt-4o', name: 'GPT-4o', provider: this.name, multimodal: true },
                { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: this.name, multimodal: false },
            ];
        }
    }
}
