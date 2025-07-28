/**
 * @license
 * Copyright 2025 Muzan Sano
 * SPDX-License-Identifier: Apache-2.0
 */
import * as fs from 'node:fs';
type ExportResult = {
    code: number;
    error?: any;
};
type ReadableSpan = any;
type SpanExporter = {
    export: (spans: any[], callback: any) => void;
};
type ReadableLogRecord = any;
type LogRecordExporter = {
    export: (logs: any[], callback: any) => void;
};
type ResourceMetrics = any;
type PushMetricExporter = {
    export: (metrics: any[], callback: any) => void;
};
declare class FileExporter {
    protected writeStream: fs.WriteStream;
    constructor(filePath: string);
    protected serialize(data: unknown): string;
    shutdown(): Promise<void>;
}
export declare class FileSpanExporter extends FileExporter implements SpanExporter {
    export(spans: ReadableSpan[], resultCallback: (result: ExportResult) => void): void;
}
export declare class FileLogExporter extends FileExporter implements LogRecordExporter {
    export(logs: ReadableLogRecord[], resultCallback: (result: ExportResult) => void): void;
}
export declare class FileMetricExporter extends FileExporter implements PushMetricExporter {
    export(metrics: ResourceMetrics, resultCallback: (result: ExportResult) => void): void;
    getPreferredAggregationTemporality(): string;
    forceFlush(): Promise<void>;
}
export {};
//# sourceMappingURL=file-exporters.d.ts.map