import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Usuario } from "../../usuarios/entities/usuario.entity"
import { BaseEntity } from "../../common/base.entity"

@Entity("soporte_tecnico")
export class SoporteTecnico extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  asunto: string

  @Column({ type: "text" })
  mensaje: string

  @Column({ type: "enum", enum: ["abierto", "en_proceso", "resuelto", "cerrado"] })
  estado: string

  @Column({ nullable: true })
  respuesta: string

  @Column({ nullable: true })
  adjunto_url: string

  @ManyToOne(
    () => Usuario,
    (usuario) => usuario.soporte_tecnico,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "usuario_id" })
  usuario: Usuario

  @Column()
  usuario_id: number
}
