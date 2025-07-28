/**
 * @license
 * Copyright 2025 Muzan Sano
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { createContext } from 'react';
import { StreamingState } from '../types.js';
export const StreamingContext = createContext(undefined);
export const useStreamingContext = () => {
    const context = React.useContext(StreamingContext);
    if (context === undefined) {
        throw new Error('useStreamingContext must be used within a StreamingContextProvider');
    }
    return context;
};
