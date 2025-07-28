/**
 * @license
 * Copyright 2025 Muzan Sano
 * SPDX-License-Identifier: Apache-2.0
 */
import { GitIgnoreParser } from '../utils/gitIgnoreParser.js';
import { isGitRepository } from '../utils/gitUtils.js';
import * as path from 'path';
const OMNIFORM_IGNORE_FILE_NAME = '.omniformignore';
export class FileDiscoveryService {
    projectRoot;
    gitIgnoreFilter = null;
    omniformIgnoreFilter = null;
    constructor(projectRoot) {
        this.projectRoot = projectRoot;
        this.initialize();
    }
    initialize() {
        this.loadGitIgnore();
        this.loadOmniformIgnore();
    }
    loadGitIgnore() {
        if (isGitRepository(this.projectRoot)) {
            this.gitIgnoreFilter = new GitIgnoreParser(this.projectRoot);
            this.gitIgnoreFilter.loadGitRepoPatterns();
        }
    }
    loadOmniformIgnore() {
        const omniformIgnorePath = path.join(this.projectRoot, OMNIFORM_IGNORE_FILE_NAME);
        this.omniformIgnoreFilter = new GitIgnoreParser(this.projectRoot);
        this.omniformIgnoreFilter.loadPatterns(OMNIFORM_IGNORE_FILE_NAME);
    }
    /**
     * Filters a list of file paths based on git ignore rules
     */
    filterFiles(filePaths, options = {
        respectGitIgnore: true,
        respectOmniformIgnore: true,
    }) {
        return filePaths.filter((filePath) => {
            if (options.respectGitIgnore && this.shouldGitIgnoreFile(filePath)) {
                return false;
            }
            if (options.respectOmniformIgnore && this.shouldOmniformIgnoreFile(filePath)) {
                return false;
            }
            return true;
        });
    }
    /**
     * Checks if a single file should be git-ignored
     */
    shouldGitIgnoreFile(filePath) {
        if (this.gitIgnoreFilter) {
            return this.gitIgnoreFilter.isIgnored(filePath);
        }
        return false;
    }
    /**
     * Checks if a single file should be omniform-ignored
     */
    shouldOmniformIgnoreFile(filePath) {
        if (this.omniformIgnoreFilter) {
            return this.omniformIgnoreFilter.isIgnored(filePath);
        }
        return false;
    }
    /**
     * Unified method to check if a file should be ignored based on filtering options
     */
    shouldIgnoreFile(filePath, options = {}) {
        const { respectGitIgnore = true, respectOmniformIgnore = true } = options;
        if (respectGitIgnore && this.shouldGitIgnoreFile(filePath)) {
            return true;
        }
        if (respectOmniformIgnore && this.shouldOmniformIgnoreFile(filePath)) {
            return true;
        }
        return false;
    }
    /**
     * Returns loaded patterns from .omniformignore
     */
    getOmniformIgnorePatterns() {
        return this.omniformIgnoreFilter?.getPatterns() ?? [];
    }
}
