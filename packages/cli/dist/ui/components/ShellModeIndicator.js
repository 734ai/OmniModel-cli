import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * @license
 * Copyright 2025 Muzan Sano
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { Box, Text } from 'ink';
import { Colors } from '../colors.js';
export const ShellModeIndicator = () => (_jsx(Box, { children: _jsxs(Text, { color: Colors.AccentYellow, children: ["shell mode enabled", _jsx(Text, { color: Colors.Gray, children: " (esc to disable)" })] }) }));
