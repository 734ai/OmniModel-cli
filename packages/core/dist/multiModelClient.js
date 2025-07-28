/**
 * @license
 * Copyright 2025 OmniModel Team
 * SPDX-License-Identifier: Apache-2.0
 */
import { providerRegistry } from './providers/registry.js';
export class MultiModelClient {
    config;
    currentProvider;
    constructor(config) {
        this.config = config;
        this.currentProvider = config.defaultProvider || undefined;
    }
    async initialize() {
        // Initialize all providers based on config
        for (const [providerName, providerConfig] of Object.entries(this.config.providers)) {
            const provider = providerRegistry.get(providerName);
            if (provider && provider.validateConfig(providerConfig)) {
                try {
                    await provider.initialize(providerConfig);
                    console.log(`✓ Initialized ${providerName} provider`);
                }
                catch (error) {
                    console.warn(`⚠ Failed to initialize ${providerName}: ${error instanceof Error ? error.message : String(error)}`);
                }
            }
        }
    }
    setProvider(providerName) {
        const provider = providerRegistry.get(providerName);
        if (!provider) {
            throw new Error(`Provider '${providerName}' not found`);
        }
        if (!provider.isInitialized()) {
            throw new Error(`Provider '${providerName}' not initialized`);
        }
        this.currentProvider = providerName;
    }
    getCurrentProvider() {
        if (!this.currentProvider) {
            throw new Error('No provider selected');
        }
        const provider = providerRegistry.get(this.currentProvider);
        if (!provider) {
            throw new Error(`Current provider '${this.currentProvider}' not found`);
        }
        if (!provider.isInitialized()) {
            throw new Error(`Current provider '${this.currentProvider}' not initialized`);
        }
        return provider;
    }
    async chat(messages, providerName) {
        const provider = providerName ?
            this.getProviderByName(providerName) :
            this.getCurrentProvider();
        return provider.chat(messages);
    }
    async *stream(messages, providerName) {
        const provider = providerName ?
            this.getProviderByName(providerName) :
            this.getCurrentProvider();
        yield* provider.stream(messages);
    }
    async getModels(providerName) {
        if (providerName) {
            const provider = this.getProviderByName(providerName);
            return provider.getModels();
        }
        // Get models from all available providers
        const allModels = [];
        for (const provider of providerRegistry.getAvailable()) {
            try {
                const models = await provider.getModels();
                allModels.push(...models);
            }
            catch (error) {
                console.warn(`Failed to get models from ${provider.getName()}: ${error instanceof Error ? error.message : String(error)}`);
            }
        }
        return allModels;
    }
    getAvailableProviders() {
        return providerRegistry.getAvailable().map(p => p.getName());
    }
    getProviderByName(providerName) {
        const provider = providerRegistry.get(providerName);
        if (!provider) {
            throw new Error(`Provider '${providerName}' not found`);
        }
        if (!provider.isInitialized()) {
            throw new Error(`Provider '${providerName}' not initialized`);
        }
        return provider;
    }
}
