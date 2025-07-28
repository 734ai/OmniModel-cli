/**
 * @license
 * Copyright 2025 Muzan Sano
 * SPDX-License-Identifier: Apache-2.0
 */
export declare enum TelemetryTarget {
    GCP = "gcp",
    LOCAL = "local"
}
declare const DEFAULT_TELEMETRY_TARGET = TelemetryTarget.LOCAL;
declare const DEFAULT_OTLP_ENDPOINT = "http://localhost:4317";
export { DEFAULT_TELEMETRY_TARGET, DEFAULT_OTLP_ENDPOINT };
export { initializeTelemetry, shutdownTelemetry, isTelemetrySdkInitialized, } from './sdk.js';
export { logCliConfiguration, logUserPrompt, logToolCall, logApiRequest, logApiError, logApiResponse, logFlashFallback, } from './loggers.js';
export { StartSessionEvent, EndSessionEvent, UserPromptEvent, ToolCallEvent, ApiRequestEvent, ApiErrorEvent, ApiResponseEvent, FlashFallbackEvent, } from './types.js';
export type { TelemetryEvent } from './types.js';
export { SpanStatusCode, ValueType } from '@opentelemetry/api';
export declare const SemanticAttributes: {
    readonly HTTP_METHOD: "http.method";
    readonly HTTP_URL: "http.url";
    readonly HTTP_STATUS_CODE: "http.status_code";
};
export * from './uiTelemetry.js';
//# sourceMappingURL=index.d.ts.map