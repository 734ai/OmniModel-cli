/**
 * @license
 * Copyright 2025 OmniModel Team
 * SPDX-License-Identifier: Apache-2.0
 */
export class DefaultProviderRegistry {
    providers = new Map();
    register(provider) {
        this.providers.set(provider.getName(), provider);
    }
    get(name) {
        return this.providers.get(name);
    }
    list() {
        return Array.from(this.providers.keys());
    }
    getAvailable() {
        return Array.from(this.providers.values()).filter(p => p.isInitialized());
    }
    clear() {
        this.providers.clear();
    }
}
// Global registry instance
export const providerRegistry = new DefaultProviderRegistry();
