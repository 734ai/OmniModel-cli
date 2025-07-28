/**
 * @license
 * Copyright 2025 Muzan Sano
 * SPDX-License-Identifier: Apache-2.0
 */
import { Content } from '@google/genai';
import { HistoryItemWithoutId } from '../types.js';
import { Config, GitService, Logger } from '@google/gemini-cli-core';
import { LoadedSettings } from '../../config/settings.js';
import { UseHistoryManagerReturn } from '../hooks/useHistoryManager.js';
import { SessionStatsState } from '../contexts/SessionContext.js';
export var CommandKind;
(function (CommandKind) {
    CommandKind["BUILT_IN"] = "built-in";
    CommandKind["FILE"] = "file";
})(CommandKind || (CommandKind = {}));
