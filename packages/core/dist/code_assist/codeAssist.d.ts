/**
 * @license
 * Copyright 2025 Muzan Sano
 * SPDX-License-Identifier: Apache-2.0
 */
import { AuthType, ContentGenerator } from '../core/contentGenerator.js';
import { HttpOptions } from './server.js';
import { Config } from '../config/config.js';
export declare function createCodeAssistContentGenerator(httpOptions: HttpOptions, authType: AuthType, config: Config, sessionId?: string): Promise<ContentGenerator>;
//# sourceMappingURL=codeAssist.d.ts.map