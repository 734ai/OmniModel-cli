#!/usr/bin/env node
/**
 * @license
 * Copyright 2025 OmniModel Team
 * SPDX-License-Identifier: Apache-2.0
 */
import './src/omniform.js';
import { main } from './src/omniform.js';
// --- Global Entry Point ---
main().catch((error) => {
    console.error('An unexpected critical error occurred:');
    if (error instanceof Error) {
        console.error(error.stack);
    }
    else {
        console.error(String(error));
    }
    process.exit(1);
});
