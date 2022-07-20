import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export default class InMemoryDB {
  private static _instance: InMemoryDB;
  protected storage = {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static get instance(): InMemoryDB {
    if (!InMemoryDB._instance) {
      InMemoryDB._instance = new InMemoryDB();
    }

    return InMemoryDB._instance;
  }

  public getStorage<T>(entity: string) {
    if (!this.storage[entity]) {
      this.storage[entity] = new Storage<T>();
    }

    return this.storage[entity];
  }
}

export class Storage<T> extends Object {
  public async findAll(): Promise<T[]> {
    return Object.values(this);
  }

  public async findOne(id: string): Promise<T> {
    const item = this[id];

    if (!item) throw new HttpErrorByCode[HttpStatus.NOT_FOUND]();

    return item;
  }

  public async create(input): Promise<T> {
    const id = uuidv4();
    const item = { id, ...input };

    this[id] = item;

    return item;
  }

  public async update(id: string, input): Promise<T> {
    if (!this[id]) throw new HttpErrorByCode[HttpStatus.NOT_FOUND]();

    const item = { ...this[id], ...input, id };
    this[id] = item;

    return item;
  }

  public async deleteOne(id: string): Promise<void> {
    if (!this[id]) throw new HttpErrorByCode[HttpStatus.NOT_FOUND]();

    delete this[id];
  }
}

export function Entity<T>(value: string) {
  return function (target: any, propertyKey: string) {
    const storage = InMemoryDB.instance.getStorage<T>(value);

    Object.defineProperty(target, propertyKey, {
      get: () => storage,
    });
  };
}
