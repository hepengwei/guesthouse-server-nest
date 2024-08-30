/**
 * 全局过滤器，捕获所有异常
 */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  LoggerService,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { createResponseData } from '@/utils/util';
import * as requestIp from 'request-ip';

@Catch()
export class GlobalFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = exception.getStatus?.();

    if (exception instanceof NotFoundException) {
      response.status(200).json(createResponseData(404, exception.message));
    } else if (exception instanceof UnauthorizedException) {
      response.status(200).json(createResponseData(401, '未登录或登录已过期'));
    } else if (exception instanceof ForbiddenException) {
      response.status(200).json(createResponseData(403, '暂无权限'));
    } else if (exception instanceof BadRequestException) {
      response.status(200).json(
        createResponseData(
          status || 500,
          // @ts-ignore
          exception.response?.message[0] || exception.message,
        ),
      );
    } else if (exception instanceof HttpException) {
      const errorData = this._createErrorData(exception, request);
      this.logger.warn(JSON.stringify(errorData), exception.stack);
      response
        .status(200)
        .json(createResponseData(status || 500, exception.message));
    } else {
      const errorData = this._createErrorData(exception, request);
      this.logger.error(JSON.stringify(errorData), exception.stack);
      response
        .status(200)
        .json(createResponseData(status || 500, exception.message));
    }
  }

  private _createErrorData(exception, request) {
    const errorData = {
      error: exception.message || 'Internal Server Error',
      headers: request.headers,
      body: request.body,
      query: request.query,
      params: request.params,
      ip: requestIp.getClientIp(request),
    };
    return errorData;
  }
}
