export interface IStorage {
  getItem(key: string): string
  setItem(key: string, item: string): void
  removeItem(key: string): void
  clear(): void
}