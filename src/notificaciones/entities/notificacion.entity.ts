import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Usuario } from "../../usuarios/entities/usuario.entity"
import { BaseEntity } from "../../common/base.entity"

@Entity("notificaciones")
export class Notificacion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  titulo: string

  @Column({ type: "text" })
  mensaje: string

  @Column({ default: false })
  leida: boolean

  @Column({ type: "enum", enum: ["sistema", "alerta", "recordatorio", "informacion"] })
  tipo: string

  @ManyToOne(
    () => Usuario,
    (usuario) => usuario.notificaciones,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "usuario_id" })
  usuario: Usuario

  @Column()
  usuario_id: number
}
