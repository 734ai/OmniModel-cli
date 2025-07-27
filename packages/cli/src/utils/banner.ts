/**
 * @license
 * Copyright 2025 OmniModel Team
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ASCII Banner Display Utility
 * Phase 8: Testing & Documentation
 */

import chalk from 'chalk';

const OMNINO_BANNER = `
 ██████╗ ███╗   ███╗███╗   ██╗██╗███╗   ██╗ ██████╗ 
██╔═══██╗████╗ ████║████╗  ██║██║████╗  ██║██╔═══██╗
██║   ██║██╔████╔██║██╔██╗ ██║██║██╔██╗ ██║██║   ██║
██║   ██║██║╚██╔╝██║██║╚██╗██║██║██║╚██╗██║██║   ██║
╚██████╔╝██║ ╚═╝ ██║██║ ╚████║██║██║ ╚████║╚██████╔╝
 ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═══╝╚═╝╚═╝  ╚═══╝ ╚═════╝ 
                                                     
    🚀 OmniModel CLI - Universal AI Model Interface
    📦 Multi-Provider AI Orchestration Platform
    ⚡ Google Gemini • OpenAI • Anthropic • xAI • Ollama
`;

const SIMPLE_BANNER = `
╔══════════════════════════════════════════════════════════╗
║                     🚀 OMNINO CLI                       ║
║            Universal AI Model Interface                  ║
║    Multi-Provider AI Orchestration Platform            ║
║                                                          ║
║  ⚡ Providers: Gemini • OpenAI • Anthropic • xAI        ║
║  🎯 Commands: chat • code • edit • multimodal           ║
║  🔧 Features: Plugins • Workflows • Agent Orchestration ║
╚══════════════════════════════════════════════════════════╝
`;

/**
 * Display the full ASCII banner with colors
 */
export function displayBanner(): void {
  console.log(chalk.cyan(OMNINO_BANNER));
  console.log(chalk.gray('    Version 1.0.0 | Phase 8: Testing & Documentation'));
  console.log(chalk.gray('    Repository: https://github.com/734ai/OmniModel-cli.git'));
  console.log('');
}

/**
 * Display a simple banner for compact output
 */
export function displaySimpleBanner(): void {
  console.log(chalk.cyan(SIMPLE_BANNER));
  console.log('');
}

/**
 * Display version information only
 */
export function displayVersion(): void {
  console.log(chalk.bold('OMNINO CLI v1.0.0'));
  console.log(chalk.gray('Universal AI Model Interface'));
  console.log('');
}
