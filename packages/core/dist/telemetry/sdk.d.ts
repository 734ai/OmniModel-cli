/**
 * @license
 * Copyright 2025 Muzan Sano
 * SPDX-License-Identifier: Apache-2.0
 */
import { Config } from '../config/config.js';
/**
 * Check if telemetry SDK is initialized
 */
export declare function isTelemetrySdkInitialized(): boolean;
/**
 * Initialize telemetry (no-op for build compatibility)
 */
export declare function initializeTelemetry(config: Config): void;
/**
 * Shutdown telemetry (no-op for build compatibility)
 */
export declare function shutdownTelemetry(): Promise<void>;
//# sourceMappingURL=sdk.d.ts.map