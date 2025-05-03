import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Usuario } from "../../usuarios/entities/usuario.entity"
import { Modulo } from "../../modulos/entities/modulo.entity"
import { BaseEntity } from "../../common/base.entity"

@Entity("foro_comentarios")
export class ForoComentario extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  titulo: string

  @Column({ type: "text" })
  contenido: string

  @Column({ nullable: true })
  imagen_url: string

  @Column({ default: 0 })
  likes: number

  @Column({ nullable: true })
  comentario_padre_id: number

  @ManyToOne(
    () => Usuario,
    (usuario) => usuario.foro_comentarios,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "usuario_id" })
  usuario: Usuario

  @Column()
  usuario_id: number

  @ManyToOne(
    () => Modulo,
    (modulo) => modulo.foro_comentarios,
  )
  @JoinColumn({ name: "modulo_id" })
  modulo: Modulo

  @Column()
  modulo_id: number
}
