import { IsEmail, IsString, IsOptional, MinLength, IsEnum } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class RegisterDto {
  @ApiProperty({
    description: "Nombre del usuario",
    example: "Juan Pérez",
    required: true,
  })
  @IsString()
  nombre: string

  @ApiProperty({
    description: "Correo electrónico del usuario",
    example: "usuario@ejemplo.com",
    required: true,
  })
  @IsEmail()
  email: string

  @ApiProperty({
    description: "Teléfono del usuario",
    example: "+573001234567",
    required: false,
  })
  @IsString()
  @IsOptional()
  telefono?: string

  @ApiProperty({
    description: "Tipo de autenticación",
    enum: ["google", "telefono"],
    default: "telefono",
    required: false,
  })
  @IsEnum(["google", "telefono"])
  @IsOptional()
  tipo_autenticacion?: "google" | "telefono" = "telefono"

  @ApiProperty({
    description: "Contraseña del usuario",
    example: "Contraseña123",
    required: true,
  })
  @IsString()
  @MinLength(6)
  password: string
}
