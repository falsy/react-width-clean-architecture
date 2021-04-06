import { IStorage } from "./interfaces/iStorage"

class Storage implements IStorage {

  private readonly storage: Storage

  constructor() {
    this.storage = (window as any).localStorage
  }

  getItem(key: string) {
    return this.storage.getItem(key)
  }

  setItem(key: string, item: string) {
    this.storage.setItem(key, item)
  }

  removeItem(key: string) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }

}

export default Storage