/**
 * @license
 * Copyright 2025 OmniModel Team
 * SPDX-License-Identifier: Apache-2.0
 */
import { type MultiModelConfig } from '../multiModelClient.js';
import { type ProviderConfig } from '../providers/types.js';
export interface OmniformConfig extends MultiModelConfig {
    version: string;
    theme?: string;
    editor?: string;
    profiles?: Record<string, MultiModelConfig>;
}
export declare class ConfigManager {
    private configDir;
    private configPath;
    private config?;
    constructor();
    load(): Promise<OmniformConfig>;
    save(): Promise<void>;
    updateProvider(providerName: string, config: ProviderConfig): Promise<void>;
    setDefaultProvider(providerName: string): Promise<void>;
    getConfigFromEnvironment(): Partial<MultiModelConfig>;
    private getDefaultConfig;
    private validateAndMigrate;
}
//# sourceMappingURL=configManager.d.ts.map