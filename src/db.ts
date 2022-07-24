import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { omit } from 'lodash';
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

  public getStorage<T>(entity: string, config: StorageConfig) {
    if (!this.storage[entity]) {
      this.storage[entity] = new Storage<T>(config);
    }

    return this.storage[entity];
  }
}

interface StorageConfig {
  verbose?: boolean | undefined;
}

export class Storage<T> extends Object {
  #config: StorageConfig;

  constructor(config: StorageConfig) {
    super();
    this.#config = config;
  }

  public async findAll(): Promise<T[]> {
    return Object.values(this).map((value) => omit(value, 'password'));
  }

  public async findOne(id: string): Promise<T> {
    const item = this[id];

    if (!item) throw new HttpErrorByCode[HttpStatus.NOT_FOUND]();

    return omit(item, 'password');
  }

  public async create(input): Promise<T> {
    const id = uuidv4();
    const metadata = this.#config.verbose
      ? {
          version: 1,
          createdAt: +new Date(),
          updatedAt: +new Date(),
        }
      : {};

    const item = { id, ...input, ...metadata };

    this[id] = item;

    return omit(item, 'password');
  }

  public async update(id: string, input): Promise<T> {
    const wantedItem = this[id];

    if (!wantedItem) throw new HttpErrorByCode[HttpStatus.NOT_FOUND]();

    const metadata = this.#config.verbose
      ? {
          version: wantedItem.version ? ++wantedItem.version : 2,
          updatedAt: +new Date(),
        }
      : {};

    const item = { ...wantedItem, ...input, id, ...metadata };
    this[id] = item;

    console.log('item', item);

    return omit(item, 'password');
  }

  public async deleteOne(id: string): Promise<void> {
    if (!this[id]) throw new HttpErrorByCode[HttpStatus.NOT_FOUND]();

    delete this[id];
  }
}

export function Entity<T>(value: string, config: StorageConfig = {}) {
  return function (target: any, propertyKey: string) {
    const storage = InMemoryDB.instance.getStorage<T>(value, config);

    Object.defineProperty(target, propertyKey, {
      get: () => storage,
    });
  };
}
