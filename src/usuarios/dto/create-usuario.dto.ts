import { IsEmail, IsString, IsOptional, MinLength, IsEnum, IsBoolean } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateUsuarioDto {
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
    required: false,
  })
  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string

  @ApiProperty({
    description: "Indica si el usuario tiene la versión PRO",
    default: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  es_pro?: boolean = false
}
