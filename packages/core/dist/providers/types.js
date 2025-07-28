/**
 * @license
 * Copyright 2025 OmniModel Team
 * SPDX-License-Identifier: Apache-2.0
 */
export class ModelProvider {
    name;
    config;
    initialized = false;
    constructor(name) {
        this.name = name;
        this.config = {};
    }
    getName() {
        return this.name;
    }
    isInitialized() {
        return this.initialized;
    }
    getConfig() {
        return { ...this.config };
    }
}
