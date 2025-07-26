/**
 * @license
 * Copyright 2025 Muzan Sano
 * SPDX-License-Identifier: Apache-2.0
 */

import { GitIgnoreParser, GitIgnoreFilter } from '../utils/gitIgnoreParser.js';
import { isGitRepository } from '../utils/gitUtils.js';
import * as path from 'path';

const OMNIFORM_IGNORE_FILE_NAME = '.omniformignore';

export interface FileDiscoveryOptions {
  respectGitIgnore?: boolean;
  respectOmniformIgnore?: boolean;
}

export class FileDiscoveryService {
  private gitIgnoreFilter: GitIgnoreFilter | null = null;
  private omniformIgnoreFilter: GitIgnoreFilter | null = null;
  private projectRoot: string;

  constructor(projectRoot: string) {
    this.projectRoot = path.resolve(projectRoot);
    if (isGitRepository(this.projectRoot)) {
      const parser = new GitIgnoreParser(this.projectRoot);
      try {
        parser.loadGitRepoPatterns();
      } catch (_error) {
        // ignore file not found
      }
      this.gitIgnoreFilter = parser;
    }
    const gParser = new GitIgnoreParser(this.projectRoot);
    try {
      gParser.loadPatterns(OMNIFORM_IGNORE_FILE_NAME);
    } catch (_error) {
      // ignore file not found
    }
    this.omniformIgnoreFilter = gParser;
  }

  /**
   * Filters a list of file paths based on git ignore rules
   */
  filterFiles(
    filePaths: string[],
    options: FilterFilesOptions = {
      respectGitIgnore: true,
      respectOmniformIgnore: true,
    },
  ): string[] {
    return filePaths.filter((filePath) => {
      if (options.respectGitIgnore && this.shouldGitIgnoreFile(filePath)) {
        return false;
      }
      if (
        options.respectOmniformIgnore &&
        this.shouldOmniIgnoreFile(filePath)
      ) {
        return false;
      }
      return true;
    });
  }

  /**
   * Checks if a single file should be git-ignored
   */
  shouldGitIgnoreFile(filePath: string): boolean {
    if (this.gitIgnoreFilter) {
      return this.gitIgnoreFilter.isIgnored(filePath);
    }
    return false;
  }

  /**
   * Checks if a single file should be omni-ignored
   */
  shouldOmniIgnoreFile(filePath: string): boolean {
    if (this.geminiIgnoreFilter) {
      return this.geminiIgnoreFilter.isIgnored(filePath);
    }
    return false;
  }

  /**
   * Unified method to check if a file should be ignored based on filtering options
   */
  shouldIgnoreFile(
    filePath: string,
    options: FilterFilesOptions = {},
  ): boolean {
    const { respectGitIgnore = true, respectGeminiIgnore = true } = options;

    if (respectGitIgnore && this.shouldGitIgnoreFile(filePath)) {
      return true;
    }
    if (respectGeminiIgnore && this.shouldOmniIgnoreFile(filePath)) {
      return true;
    }
    return false;
  }

  /**
   * Returns loaded patterns from .omniformignore
   */
  getOmniIgnorePatterns(): string[] {
    return this.geminiIgnoreFilter?.getPatterns() ?? [];
  }
}
