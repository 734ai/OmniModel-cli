import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * @license
 * Copyright 2025 Muzan Sano
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { Text, Box } from 'ink';
import { Colors } from '../../colors.js';
export const ErrorMessage = ({ text }) => {
    const prefix = '✕ ';
    const prefixWidth = prefix.length;
    return (_jsxs(Box, { flexDirection: "row", marginBottom: 1, children: [_jsx(Box, { width: prefixWidth, children: _jsx(Text, { color: Colors.AccentRed, children: prefix }) }), _jsx(Box, { flexGrow: 1, children: _jsx(Text, { wrap: "wrap", color: Colors.AccentRed, children: text }) })] }));
};
