import { IsOptional, IsPositive, IsInt } from "class-validator"
import { Type } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger"

export class PaginationDto {
  @ApiProperty({
    description: "Número de página",
    default: 1,
    required: false,
  })
  @IsOptional()
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  page?: number = 1

  @ApiProperty({
    description: "Elementos por página",
    default: 10,
    required: false,
  })
  @IsOptional()
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  limit?: number = 10
}
