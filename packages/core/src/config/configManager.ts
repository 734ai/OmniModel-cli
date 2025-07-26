/**
 * @license
 * Copyright 2025 OmniModel Team
 * SPDX-License-Identifier: Apache-2.0
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';
import * as yaml from 'yaml';
import { type MultiModelConfig } from '../multiModelClient.js';
import { type ProviderConfig } from '../providers/types.js';

export interface OmniformConfig extends MultiModelConfig {
  version: string;
  theme?: string;
  editor?: string;
  profiles?: Record<string, MultiModelConfig>;
}

export class ConfigManager {
  private configDir: string;
  private configPath: string;
  private config?: OmniformConfig;

  constructor() {
    this.configDir = join(homedir(), '.omniform');
    this.configPath = join(this.configDir, 'config.yml');
  }

  async load(): Promise<OmniformConfig> {
    if (this.config) {
      return this.config;
    }

    if (!existsSync(this.configPath)) {
      this.config = this.getDefaultConfig();
      await this.save();
      return this.config;
    }

    try {
      const configContent = readFileSync(this.configPath, 'utf-8');
      this.config = yaml.parse(configContent) as OmniformConfig;
      
      // Validate and migrate config if needed
      this.config = this.validateAndMigrate(this.config);
      
      return this.config;
    } catch (error) {
      console.warn(`Failed to load config: ${error instanceof Error ? error.message : String(error)}`);
      this.config = this.getDefaultConfig();
      return this.config;
    }
  }

  async save(): Promise<void> {
    if (!this.config) {
      throw new Error('No config to save');
    }

    if (!existsSync(this.configDir)) {
      mkdirSync(this.configDir, { recursive: true });
    }

    try {
      const configContent = yaml.stringify(this.config, {
        indent: 2,
        lineWidth: 120,
      });
      writeFileSync(this.configPath, configContent, 'utf-8');
    } catch (error) {
      throw new Error(`Failed to save config: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async updateProvider(providerName: string, config: ProviderConfig): Promise<void> {
    if (!this.config) {
      await this.load();
    }
    
    if (!this.config) {
      throw new Error('Failed to load config');
    }

    this.config.providers[providerName] = config;
    await this.save();
  }

  async setDefaultProvider(providerName: string): Promise<void> {
    if (!this.config) {
      await this.load();
    }
    
    if (!this.config) {
      throw new Error('Failed to load config');
    }

    this.config.defaultProvider = providerName;
    await this.save();
  }

  getConfigFromEnvironment(): Partial<MultiModelConfig> {
    const providers: Record<string, ProviderConfig> = {};

    // OpenAI
    if (process.env.OPENAI_API_KEY) {
      providers.openai = {
        apiKey: process.env.OPENAI_API_KEY,
        baseUrl: process.env.OPENAI_BASE_URL,
        model: process.env.OPENAI_MODEL || 'gpt-4',
      };
    }

    // Anthropic
    if (process.env.ANTHROPIC_API_KEY) {
      providers.anthropic = {
        apiKey: process.env.ANTHROPIC_API_KEY,
        baseUrl: process.env.ANTHROPIC_BASE_URL,
        model: process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20241022',
      };
    }

    // Google Gemini
    if (process.env.GOOGLE_API_KEY) {
      providers.gemini = {
        apiKey: process.env.GOOGLE_API_KEY,
        baseUrl: process.env.GOOGLE_BASE_URL,
        model: process.env.GOOGLE_MODEL || 'gemini-2.5-pro',
      };
    }

    // xAI Grok
    if (process.env.XAI_API_KEY) {
      providers.xai = {
        apiKey: process.env.XAI_API_KEY,
        baseUrl: process.env.XAI_BASE_URL || 'https://api.x.ai/v1',
        model: process.env.XAI_MODEL || 'grok-2',
      };
    }

    // Ollama
    if (process.env.OLLAMA_HOST) {
      providers.ollama = {
        baseUrl: process.env.OLLAMA_HOST,
        model: process.env.OLLAMA_MODEL || 'llama3',
      };
    }

    return {
      providers,
      defaultProvider: process.env.OMNIFORM_DEFAULT_PROVIDER,
    };
  }

  private getDefaultConfig(): OmniformConfig {
    const envConfig = this.getConfigFromEnvironment();
    
    return {
      version: '0.1.0',
      theme: 'default',
      defaultProvider: envConfig.defaultProvider || 'openai',
      providers: envConfig.providers || {
        openai: {
          model: 'gpt-4',
        },
        anthropic: {
          model: 'claude-3-5-sonnet-20241022',
        },
        gemini: {
          model: 'gemini-2.5-pro',
        },
      },
    };
  }

  private validateAndMigrate(config: any): OmniformConfig {
    // Ensure required fields exist
    const validated: OmniformConfig = {
      version: config.version || '0.1.0',
      theme: config.theme || 'default',
      defaultProvider: config.defaultProvider,
      providers: config.providers || {},
      profiles: config.profiles,
    };

    // Merge environment config
    const envConfig = this.getConfigFromEnvironment();
    if (envConfig.providers) {
      validated.providers = { ...validated.providers, ...envConfig.providers };
    }
    if (envConfig.defaultProvider && !validated.defaultProvider) {
      validated.defaultProvider = envConfig.defaultProvider;
    }

    return validated;
  }
}
