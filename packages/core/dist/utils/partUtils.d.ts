/**
 * @license
 * Copyright 2025 Muzan Sano
 * SPDX-License-Identifier: Apache-2.0
 */
import { GenerateContentResponse, PartListUnion } from '@google/genai';
/**
 * Converts a PartListUnion into a string.
 * If verbose is true, includes summary representations of non-text parts.
 */
export declare function partToString(value: PartListUnion, options?: {
    verbose?: boolean;
}): string;
export declare function getResponseText(response: GenerateContentResponse): string | null;
//# sourceMappingURL=partUtils.d.ts.map