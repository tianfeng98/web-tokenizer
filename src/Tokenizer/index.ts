import { joinUrl } from "@/utils";
import type { EventData, ExtractResult } from "./interface";
import { EventType } from "./interface";

export interface ParticipleOptions {
  workersPath?: string;
  workerType?: "specific" | "share";
  onInit?: (instance: Tokenizer) => void;
}

class Tokenizer {
  private worker: Worker | SharedWorker["port"];
  loading = true;
  options: ParticipleOptions = {
    workerType: "specific",
  };
  private extractResolve?: (result: ExtractResult[]) => void;
  private cutResolve?: (result: string[]) => void;
  constructor(options: ParticipleOptions) {
    this.options = { ...this.options, ...options };
    const {
      workersPath = joinUrl(
        "https://unpkg.com/web-tokenizer@latest/dist",
        "workers",
      ),
    } = this.options;
    const workerUrl = joinUrl(workersPath, "/worker.js");
    const sharedWorkerUrl = joinUrl(workersPath, "/sharedWorker.js");
    const workerOptions: WorkerOptions = {
      name: "tokenizer",
      type: "module",
    };
    this.worker =
      this.options.workerType === "share"
        ? new SharedWorker(sharedWorkerUrl, workerOptions).port
        : new Worker(workerUrl, workerOptions);
    this.listen();
  }

  private listen() {
    this.worker.onmessage = (event: MessageEvent<EventData>) => {
      const { type, data } = event.data;
      switch (type) {
        case EventType.status:
          this.loading = false;
          this.options.onInit?.(this);
          break;
        case EventType.extract:
          if (this.extractResolve) {
            this.extractResolve(data);
            this.extractResolve = void 0;
          }
          break;
        case EventType.cut:
          if (this.cutResolve) {
            this.cutResolve(data);
            this.cutResolve = void 0;
          }
          break;
      }
    };
  }

  extract(data: string) {
    return new Promise<ExtractResult[]>((resolve, reject) => {
      if (this.loading) {
        reject("Initialization is not complete");
      } else {
        this.extractResolve = resolve;
        const message: EventData = {
          type: EventType.extract,
          data,
        };
        this.worker.postMessage(message);
      }
    });
  }

  cut(data: string) {
    return new Promise<string[]>((resolve, reject) => {
      if (this.loading) {
        reject("Initialization is not complete");
      } else {
        this.cutResolve = resolve;
        const message: EventData = {
          type: EventType.cut,
          data,
        };
        this.worker.postMessage(message);
      }
    });
  }
}

export default Tokenizer;
