import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Business } from '@prisma/client';
import { tap } from 'rxjs';
import { Business_Hot_Keywords } from 'utils/redis';

@Injectable()
export class PersistDataInterceptor implements NestInterceptor {
  constructor(@InjectRedis() private redis: Redis) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle();
  }
  //   const req = context.switchToHttp().getRequest();

  //   const { search } = req.query as BusinessesQuery;
  //   if (!search) return next.handle();

  //   const listKeyWordsInRedis = await this.redis.get(Business_Hot_Keywords);

  //   const hotKeyWords: Record<string, number> =
  //     JSON.parse(listKeyWordsInRedis || null) || {};

  //   req.hotKeyWords = Object.entries(hotKeyWords)
  //     .sort((a, b) => b[1] - a[1])
  //     .slice(0, 12)
  //     .map(i => i[0]);

  //   return next.handle().pipe(
  //     tap(async ({ data }: PaginatedResponse<Business>) => {
  //       data.forEach(business => {
  //         if (hotKeyWords[business.name]) hotKeyWords[business.name]++;
  //         else hotKeyWords[business.name] = 1;
  //       });

  //       await this.redis.set(
  //         Business_Hot_Keywords,
  //         JSON.stringify(hotKeyWords)
  //       );
  //     })
  //   );
  // }
}
