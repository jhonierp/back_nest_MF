import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { S3Service } from './s3.service';

@Injectable()
export class UploadFileService {
  constructor(private readonly s3: S3Service) {}

  async uploadFile(file: Express.Multer.File) {
    const { originalname, mimetype, buffer } = file;

    return await this.s3_upload(
      buffer,
      process.env.AWS_BUCKET_NAME,
      originalname,
      mimetype,
    );
  }

  async s3_upload(
    fileBuffer: Buffer,
    bucket: string,
    name: string,
    mimetype: string,
  ) {
    const params = {
      Bucket: bucket,
      Key: name,
      Body: fileBuffer,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'us-east-2',
      },
    };

    try {
      const s3Response = await this.s3.gets3Instance().upload(params).promise();
      return s3Response;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteFile(url: string) {
    const key = decodeURIComponent(this.getKeyFromUrlS3(url)).replace(
      /\+/g,
      ' ',
    );
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    };

    try {
      const s3Response = await this.s3
        .gets3Instance()
        .deleteObject(params)
        .promise();

      return s3Response;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private getKeyFromUrlS3(urlString): string {
    return urlString.replace(
      'https://myawstestbuckethm.s3.us-east-2.amazonaws.com/',
      '',
    );
  }
}
