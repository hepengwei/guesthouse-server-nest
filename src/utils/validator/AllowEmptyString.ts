import { ValidationTypes, getMetadataStorage } from 'class-validator';
import { ValidationMetadata } from 'class-validator/cjs/metadata/ValidationMetadata';

// 允许字段为空，包括undefined、null和空字符串，为空则跳过后面的装饰器，直接通过验证
const AllowEmptyString = (validationOptions?) => {
  return function (object, propertyName) {
    const args = {
      type: ValidationTypes.CONDITIONAL_VALIDATION,
      target: object.constructor,
      propertyName,
      constraints: [
        function (object) {
          return (
            object[propertyName] !== null &&
            object[propertyName] !== undefined &&
            object[propertyName] !== ''
          );
        },
      ],
      validationOptions,
    };
    getMetadataStorage().addValidationMetadata(new ValidationMetadata(args));
  };
};

export default AllowEmptyString;
