import { Module, DynamicModule } from '@nestjs/common';
import { SharedUserRepository } from './repositories/sharedUserRepository.repository';
import { UploadFileService } from './services/uploadFile.service';
import { S3Service } from './services/s3.service';
import { UploadFileController } from './controllers/uploadFile.controller';
import { UploadFileUseCase } from './useCase/uploadFile.useCase';
@Module({
  providers: [UploadFileService, S3Service, UploadFileUseCase],
  controllers: [UploadFileController],
})
export class SharedModule {
  static forRoot(): DynamicModule {
    return {
      module: SharedModule,
      providers: [SharedUserRepository],
      exports: [],
      imports: [],
    };
  }
}
