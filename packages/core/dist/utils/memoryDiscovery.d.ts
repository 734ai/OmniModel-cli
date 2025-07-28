/**
 * @license
 * Copyright 2025 Muzan Sano
 * SPDX-License-Identifier: Apache-2.0
 */
import { FileDiscoveryService } from '../services/fileDiscoveryService.js';
import { FileFilteringOptions } from '../config/config.js';
/**
 * Loads hierarchical GEMINI.md files and concatenates their content.
 * This function is intended for use by the server.
 */
export declare function loadServerHierarchicalMemory(currentWorkingDirectory: string, debugMode: boolean, fileService: FileDiscoveryService, extensionContextFilePaths?: string[], fileFilteringOptions?: FileFilteringOptions, maxDirs?: number): Promise<{
    memoryContent: string;
    fileCount: number;
}>;
//# sourceMappingURL=memoryDiscovery.d.ts.map