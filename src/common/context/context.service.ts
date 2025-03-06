import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

export const USER_CONTEXT_KEY = 'user_context';

@Injectable()
export class ContextService {
  constructor(private cls: AsyncLocalStorage<Map<string, any>>) {}

  set<T = any>(key: string, value: T) {
    this.cls.getStore()?.set(key, value);
  }

  get<T = any>(key: string): T {
    return this.cls.getStore().get(key);
  }

  run(fn: () => void, initialData: Record<string, any> = {}) {
    const store = new Map(Object.entries(initialData));
    this.cls.run(store, fn);
  }
}
