/**
 * @license
 * Copyright 2025 Muzan Sano
 * SPDX-License-Identifier: Apache-2.0
 */

// Simplified telemetry SDK for build compatibility
import { DiagConsoleLogger, DiagLogLevel, diag } from '@opentelemetry/api';
import { Config } from '../config/config.js';

// Track initialization state
let initialized = false;

/**
 * Check if telemetry SDK is initialized
 */
export function isTelemetrySdkInitialized(): boolean {
  return initialized;
}

/**
 * Initialize telemetry (no-op for build compatibility)
 */
export function initializeTelemetry(config: Config): void {
  // Set up diagnostics
  diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);
  
  initialized = true;
  
  // TODO: Initialize actual telemetry when OpenTelemetry packages are available
  console.log('Telemetry initialization skipped - packages not available');
}

/**
 * Shutdown telemetry (no-op for build compatibility)
 */
export async function shutdownTelemetry(): Promise<void> {
  initialized = false;
  
  // TODO: Shutdown actual telemetry when OpenTelemetry packages are available
  console.log('Telemetry shutdown skipped - packages not available');
}
