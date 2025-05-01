import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional } from 'class-validator';

export class SignInRequestDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'andrea@yopmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '12345678',
  })
  @IsString()
  password: string;
}

export class AuthTokenResponseDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  @IsString()
  accessToken: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  @IsString()
  refreshToken: string;

  @ApiProperty({
    type: Number,
    required: true,
    example: '75394f7c-429f-4f07-9f9e-9214eae0b398',
  })
  @IsOptional()
  userId?: number;
}
export interface TokenPayloadModel {
  sub: number;
  email: string;
}
