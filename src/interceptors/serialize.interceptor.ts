/**
 * 序列化响应数据的后置拦截器
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

@Injectable()
export default class SerializeInterceptor implements NestInterceptor {
  constructor(private readonly dto: any) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((res) => {
        return plainToInstance(this.dto, res, {
          excludeExtraneousValues: true, // 设置为true后，所有经过该后置拦截器的接口响应DTO都需要设置Expose或Exclude；如果是false，则数据中存在但DTO中没有定义的属性不会被过滤掉
          enableCircularCheck: true, // 设置为true后，深层次的对象才能成功的被序列化
          enableImplicitConversion: true, // 自动转换类型
        });
      }),
    );
  }
}
