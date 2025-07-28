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

export interface FilterFilesOptions {
  respectGitIgnore?: boolean;
  respectOmniformIgnore?: boolean;
}

export class FileDiscoveryService {
  private gitIgnoreFilter: GitIgnoreParser | null = null;
  private omniformIgnoreFilter: GitIgnoreParser | null = null;

  constructor(public projectRoot: string) {
    this.initialize();
  }

  private initialize(): void {
    this.loadGitIgnore();
    this.loadOmniformIgnore();
  }

  private loadGitIgnore(): void {
    if (isGitRepository(this.projectRoot)) {
      this.gitIgnoreFilter = new GitIgnoreParser(this.projectRoot);
      this.gitIgnoreFilter.loadGitRepoPatterns();
    }
  }

  private loadOmniformIgnore(): void {
    const omniformIgnorePath = path.join(this.projectRoot, OMNIFORM_IGNORE_FILE_NAME);
    this.omniformIgnoreFilter = new GitIgnoreParser(this.projectRoot);
    this.omniformIgnoreFilter.loadPatterns(OMNIFORM_IGNORE_FILE_NAME);
  }

  /**
   * Filters a list of file paths based on git ignore rules
   */
  filterFiles(
    filePaths: string[],
    options: FilterFilesOptions = {
      respectGitIgnore: true,
      respectOmniformIgnore: true,
    }
  ): string[] {
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
  shouldGitIgnoreFile(filePath: string): boolean {
    if (this.gitIgnoreFilter) {
      return this.gitIgnoreFilter.isIgnored(filePath);
    }
    return false;
  }

  /**
   * Checks if a single file should be omniform-ignored
   */
  private shouldOmniformIgnoreFile(filePath: string): boolean {
    if (this.omniformIgnoreFilter) {
      return this.omniformIgnoreFilter.isIgnored(filePath);
    }
    return false;
  }

  /**
   * Unified method to check if a file should be ignored based on filtering options
   */
  shouldIgnoreFile(
    filePath: string,
    options: FilterFilesOptions = {}
  ): boolean {
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
  getOmniformIgnorePatterns(): string[] {
    return this.omniformIgnoreFilter?.getPatterns() ?? [];
  }
}
