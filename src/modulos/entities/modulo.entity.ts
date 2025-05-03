import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Submodulo } from "../../submodulos/entities/submodulo.entity"
import { ForoComentario } from "../../foro-comentarios/entities/foro-comentario.entity"
import { BaseEntity } from "../../common/base.entity"

@Entity("modulos")
export class Modulo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  nombre: string

  @OneToMany(
    () => Submodulo,
    (submodulo) => submodulo.modulo,
  )
  submodulos: Submodulo[]

  @OneToMany(
    () => ForoComentario,
    (foroComentario) => foroComentario.modulo,
  )
  foro_comentarios: ForoComentario[]
}
