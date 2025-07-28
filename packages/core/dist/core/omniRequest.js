/**
 * @license
 * Copyright 2025 Muzan Sano
 * SPDX-License-Identifier: Apache-2.0
 */
import { partToString } from '../utils/partUtils.js';
export function partListUnionToString(value) {
    return partToString(value, { verbose: true });
}
