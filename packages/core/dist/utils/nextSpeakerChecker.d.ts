/**
 * @license
 * Copyright 2025 Muzan Sano
 * SPDX-License-Identifier: Apache-2.0
 */
import { ModelClient } from '../core/client.js';
import { OmniChat } from '../core/omniChat.js';
export interface NextSpeakerResponse {
    reasoning: string;
    next_speaker: 'user' | 'model';
}
export declare function checkNextSpeaker(chat: OmniChat, geminiClient: ModelClient, abortSignal: AbortSignal): Promise<NextSpeakerResponse | null>;
//# sourceMappingURL=nextSpeakerChecker.d.ts.map