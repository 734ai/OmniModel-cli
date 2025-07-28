/**
 * @license
 * Copyright 2025 OmniModel Team
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Jest Test Setup and Configuration
 * Phase 8: Testing & Documentation
 */

import path from 'path';

// Setup environment variables for testing
if (!process.env.GOOGLE_API_KEY && !process.env.CI) {
  console.warn('GOOGLE_API_KEY not set - some tests may be skipped');
}

if (!process.env.OPENAI_API_KEY && !process.env.CI) {
  console.warn('OPENAI_API_KEY not set - some tests may be skipped');
}

// Configure Jest timeout
jest.setTimeout(30000); // 30 seconds for API calls

// Store original console for tests that need it
const originalConsole = console;

// Mock console methods for cleaner test output (can be overridden in individual tests)
global.console = {
  ...originalConsole,
  // Comment out these lines in individual tests if you need console output
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};

// Reset console mocks before each test
beforeEach(() => {
  if (global.console.log.mockClear) {
    global.console.log.mockClear();
    global.console.error.mockClear();
    global.console.warn.mockClear();
    global.console.info.mockClear();
    global.console.debug.mockClear();
  }
});

// Helper function to restore console for specific tests
global.restoreConsole = () => {
  global.console = originalConsole;
};

// Helper function to mock console again
global.mockConsole = () => {
  global.console = {
    ...originalConsole,
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
  };
};

// Set up test environment
global.testConfig = {
  timeout: 30000,
  skipApiTests: !process.env.GOOGLE_API_KEY && !process.env.OPENAI_API_KEY,
  hasGoogleKey: !!process.env.GOOGLE_API_KEY,
  hasOpenAIKey: !!process.env.OPENAI_API_KEY,
};

console.log('🧪 Test environment configured');
console.log(`⏱️  Test timeout: ${global.testConfig.timeout}ms`);
console.log(`🔑 API tests: ${global.testConfig.skipApiTests ? 'SKIPPED' : 'ENABLED'}`);
console.log(`🔑 Google API: ${global.testConfig.hasGoogleKey ? 'AVAILABLE' : 'MISSING'}`);
console.log(`🔑 OpenAI API: ${global.testConfig.hasOpenAIKey ? 'AVAILABLE' : 'MISSING'}`);
