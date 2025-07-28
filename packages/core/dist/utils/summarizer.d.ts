/**
 * @license
 * Copyright 2025 Muzan Sano
 * SPDX-License-Identifier: Apache-2.0
 */
import { ToolResult } from '../tools/tools.js';
import { ModelClient } from '../core/client.js';
/**
 * A function that summarizes the result of a tool execution.
 *
 * @param result The result of the tool execution.
 * @returns The summary of the result.
 */
export type Summarizer = (result: ToolResult, geminiClient: ModelClient, abortSignal: AbortSignal) => Promise<string>;
/**
 * The default summarizer for tool results.
 *
 * @param result The result of the tool execution.
 * @param geminiClient The Gemini client to use for summarization.
 * @param abortSignal The abort signal to use for summarization.
 * @returns The summary of the result.
 */
export declare const defaultSummarizer: Summarizer;
export declare const llmSummarizer: Summarizer;
export declare function summarizeToolOutput(textToSummarize: string, geminiClient: ModelClient, abortSignal: AbortSignal, maxOutputTokens?: number): Promise<string>;
//# sourceMappingURL=summarizer.d.ts.map