export * from './types';

export function generateId(): string {
  return crypto.randomUUID();
}

export function timestamp(): number {
  return Math.floor(Date.now() / 1000);
}
