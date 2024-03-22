import { HttpException, FileTypeValidator } from '@nestjs/common';

export class FileFieldsValidator {
  private fileType: string | RegExp;
  constructor(fileType: string | RegExp) {
    this.fileType = fileType;
  }
  transform(fileRequest: object) {
    const validator = new FileTypeValidator({
      fileType: this.fileType,
    });

    for (const key in fileRequest) {
      for (const file of fileRequest[key]) {
        if (!validator.isValid(file))
          throw new HttpException(validator.buildErrorMessage(), 400);
      }
    }
    return fileRequest;
  }
}
