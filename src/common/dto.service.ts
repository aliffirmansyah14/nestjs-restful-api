import { Injectable } from '@nestjs/common';

@Injectable()
export class DtoService {
  convert<T extends {}>(data: T, allowedKeys: (keyof T)[]): Partial<T> {
    if (typeof data !== 'object' || data === null) return data;
    const dto = {} as T;

    for (const key of allowedKeys) {
      if (!data[key]) continue;
      if (data[key] === null) continue;
      dto[key] = data[key];
    }
    //  Object.keys(data).forEach((key) => {
    //    if (allowedKeys.includes(key as keyof T)) {
    //      dto[key] = data[key];
    //    }
    //  });
    return dto;
  }
}
