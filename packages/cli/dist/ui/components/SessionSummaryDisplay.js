import { jsx as _jsx } from "react/jsx-runtime";
/**
 * @license
 * Copyright 2025 Muzan Sano
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { StatsDisplay } from './StatsDisplay.js';
export const SessionSummaryDisplay = ({ duration, }) => (_jsx(StatsDisplay, { title: "Agent powering down. Goodbye!", duration: duration }));
