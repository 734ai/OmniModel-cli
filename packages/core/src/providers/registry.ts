/**
 * @license
 * Copyright 2025 OmniModel Team
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModelProvider, type ProviderRegistry } from './types.js';

export class DefaultProviderRegistry implements ProviderRegistry {
  private providers = new Map<string, ModelProvider>();

  register(provider: ModelProvider): void {
    this.providers.set(provider.getName(), provider);
  }

  get(name: string): ModelProvider | undefined {
    return this.providers.get(name);
  }

  list(): string[] {
    return Array.from(this.providers.keys());
  }

  getAvailable(): ModelProvider[] {
    return Array.from(this.providers.values()).filter(p => p.isInitialized());
  }

  clear(): void {
    this.providers.clear();
  }
}

// Global registry instance
export const providerRegistry = new DefaultProviderRegistry();
