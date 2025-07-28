/**
 * @license
 * Copyright 2025 Muzan Sano
 * SPDX-License-Identifier: Apache-2.0
 */

import * as fs from 'node:fs';

// Telemetry types and constants - simplified for build compatibility
type ExportResult = { code: number; error?: any };
const ExportResultCode = { SUCCESS: 0, FAILED: 1 };
type ReadableSpan = any;
type SpanExporter = { export: (spans: any[], callback: any) => void };
type ReadableLogRecord = any;
type LogRecordExporter = { export: (logs: any[], callback: any) => void };
type ResourceMetrics = any;
type PushMetricExporter = { export: (metrics: any[], callback: any) => void };
const AggregationTemporality = { CUMULATIVE: 'cumulative' };

class FileExporter {
  protected writeStream: fs.WriteStream;

  constructor(filePath: string) {
    this.writeStream = fs.createWriteStream(filePath, { flags: 'a' });
  }

  protected serialize(data: unknown): string {
    return JSON.stringify(data, null, 2) + '\n';
  }

  shutdown(): Promise<void> {
    return new Promise((resolve) => {
      this.writeStream.end(resolve);
    });
  }
}

export class FileSpanExporter extends FileExporter implements SpanExporter {
  export(
    spans: ReadableSpan[],
    resultCallback: (result: ExportResult) => void,
  ): void {
    const data = spans.map((span) => this.serialize(span)).join('');
    this.writeStream.write(data, (err) => {
      resultCallback({
        code: err ? ExportResultCode.FAILED : ExportResultCode.SUCCESS,
        error: err || undefined,
      });
    });
  }
}

export class FileLogExporter extends FileExporter implements LogRecordExporter {
  export(
    logs: ReadableLogRecord[],
    resultCallback: (result: ExportResult) => void,
  ): void {
    const data = logs.map((log) => this.serialize(log)).join('');
    this.writeStream.write(data, (err) => {
      resultCallback({
        code: err ? ExportResultCode.FAILED : ExportResultCode.SUCCESS,
        error: err || undefined,
      });
    });
  }
}

export class FileMetricExporter
  extends FileExporter
  implements PushMetricExporter
{
  export(
    metrics: ResourceMetrics,
    resultCallback: (result: ExportResult) => void,
  ): void {
    const data = this.serialize(metrics);
    this.writeStream.write(data, (err) => {
      resultCallback({
        code: err ? ExportResultCode.FAILED : ExportResultCode.SUCCESS,
        error: err || undefined,
      });
    });
  }

  getPreferredAggregationTemporality(): string {
    return AggregationTemporality.CUMULATIVE;
  }

  async forceFlush(): Promise<void> {
    return Promise.resolve();
  }
}
