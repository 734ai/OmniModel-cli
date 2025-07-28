/**
 * @license
 * Copyright 2025 OmniModel Team
 * SPDX-License-Identifier: Apache-2.0
 */
import { ModelProvider, type ProviderRegistry } from './types.js';
export declare class DefaultProviderRegistry implements ProviderRegistry {
    private providers;
    register(provider: ModelProvider): void;
    get(name: string): ModelProvider | undefined;
    list(): string[];
    getAvailable(): ModelProvider[];
    clear(): void;
}
export declare const providerRegistry: DefaultProviderRegistry;
//# sourceMappingURL=registry.d.ts.map