import { IsEmail, IsString, IsOptional, MinLength, ValidateIf } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class LoginDto {
  @ApiProperty({
    description: "Correo electrónico del usuario",
    example: "usuario@ejemplo.com",
    required: false,
  })
  @IsEmail()
  @IsOptional()
  @ValidateIf((o) => !o.telefono)
  email?: string

  @ApiProperty({
    description: "Teléfono del usuario",
    example: "+573001234567",
    required: false,
  })
  @IsString()
  @IsOptional()
  @ValidateIf((o) => !o.email)
  telefono?: string

  @ApiProperty({
    description: "Contraseña del usuario",
    example: "Contraseña123",
    required: true,
  })
  @IsString()
  @MinLength(6)
  password: string
}
