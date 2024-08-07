import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export default class CustomDateInterceptor implements NestInterceptor {
  constructor(private readonly options: string[]) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    console.log('前置拦截执行', req);
    return next.handle().pipe(
      map((res) => {
        console.log('后置拦截执行', res, this.options);
        return res;
      }),
    );
  }
}
