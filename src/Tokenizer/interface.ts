export enum EventType {
  status = "status",
  extract = "extract",
  cut = "cut",
}

export interface EventData<T = any> {
  type: EventType;
  data: T;
}

export interface ExtractResult {
  word: string;
  weight: number;
}
