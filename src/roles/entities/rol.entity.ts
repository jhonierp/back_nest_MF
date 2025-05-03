import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm"
import { BaseEntity } from "../../common/base.entity"
import { Usuario } from "../../usuarios/entities/usuario.entity"

@Entity("roles")
export class Rol extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  nombre: string

  @ManyToMany(
    () => Usuario,
    (usuario) => usuario.roles,
  )
  usuarios: Usuario[]
}
