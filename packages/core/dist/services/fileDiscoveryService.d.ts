/**
 * @license
 * Copyright 2025 Muzan Sano
 * SPDX-License-Identifier: Apache-2.0
 */
export interface FileDiscoveryOptions {
    respectGitIgnore?: boolean;
    respectOmniformIgnore?: boolean;
}
export interface FilterFilesOptions {
    respectGitIgnore?: boolean;
    respectOmniformIgnore?: boolean;
}
export declare class FileDiscoveryService {
    projectRoot: string;
    private gitIgnoreFilter;
    private omniformIgnoreFilter;
    constructor(projectRoot: string);
    private initialize;
    private loadGitIgnore;
    private loadOmniformIgnore;
    /**
     * Filters a list of file paths based on git ignore rules
     */
    filterFiles(filePaths: string[], options?: FilterFilesOptions): string[];
    /**
     * Checks if a single file should be git-ignored
     */
    shouldGitIgnoreFile(filePath: string): boolean;
    /**
     * Checks if a single file should be omniform-ignored
     */
    private shouldOmniformIgnoreFile;
    /**
     * Unified method to check if a file should be ignored based on filtering options
     */
    shouldIgnoreFile(filePath: string, options?: FilterFilesOptions): boolean;
    /**
     * Returns loaded patterns from .omniformignore
     */
    getOmniformIgnorePatterns(): string[];
}
//# sourceMappingURL=fileDiscoveryService.d.ts.map