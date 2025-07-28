/**
 * @license
 * Copyright 2025 Muzan Sano
 * SPDX-License-Identifier: Apache-2.0
 */
import { ModelClient } from '../core/client.js';
import { EditToolParams } from '../tools/edit.js';
/**
 * Defines the structure of the parameters within CorrectedEditResult
 */
interface CorrectedEditParams {
    file_path: string;
    old_string: string;
    new_string: string;
}
/**
 * Defines the result structure for ensureCorrectEdit.
 */
export interface CorrectedEditResult {
    params: CorrectedEditParams;
    occurrences: number;
}
/**
 * Attempts to correct edit parameters if the original old_string is not found.
 * It tries unescaping, and then LLM-based correction.
 * Results are cached to avoid redundant processing.
 *
 * @param currentContent The current content of the file.
 * @param originalParams The original EditToolParams
 * @param client The ModelClient for LLM calls.
 * @returns A promise resolving to an object containing the (potentially corrected)
 *          EditToolParams (as CorrectedEditParams) and the final occurrences count.
 */
export declare function ensureCorrectEdit(filePath: string, currentContent: string, originalParams: EditToolParams, // This is the EditToolParams from edit.ts, without \'corrected\'
client: ModelClient, abortSignal: AbortSignal): Promise<CorrectedEditResult>;
export declare function ensureCorrectFileContent(content: string, client: ModelClient, abortSignal: AbortSignal): Promise<string>;
export declare function correctOldStringMismatch(geminiClient: ModelClient, fileContent: string, problematicSnippet: string, abortSignal: AbortSignal): Promise<string>;
/**
 * Adjusts the new_string to align with a corrected old_string, maintaining the original intent.
 */
export declare function correctNewString(geminiClient: ModelClient, originalOldString: string, correctedOldString: string, originalNewString: string, abortSignal: AbortSignal): Promise<string>;
export declare function correctNewStringEscaping(geminiClient: ModelClient, oldString: string, potentiallyProblematicNewString: string, abortSignal: AbortSignal): Promise<string>;
export declare function correctStringEscaping(potentiallyProblematicString: string, client: ModelClient, abortSignal: AbortSignal): Promise<string>;
/**
 * Unescapes a string that might have been overly escaped by an LLM.
 */
export declare function unescapeStringForGeminiBug(inputString: string): string;
/**
 * Counts occurrences of a substring in a string
 */
export declare function countOccurrences(str: string, substr: string): number;
export declare function resetEditCorrectorCaches_TEST_ONLY(): void;
export {};
//# sourceMappingURL=editCorrector.d.ts.map