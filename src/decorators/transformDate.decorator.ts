/**
 * 格式化时间的装饰器
 */
import { Transform, TransformFnParams } from 'class-transformer';
import { format } from 'date-fns';

const TransformDate = (dateFormat?: string) => {
  return Transform((params: TransformFnParams) => {
    const value = params.obj[params.key];
    if (value) {
      // 转换时间格式
      if (!dateFormat) {
        dateFormat = 'yyyy-MM-dd HH:mm:ss';
      }
      return format(value, dateFormat);
    }
    return '';
  });
};

export default TransformDate;
