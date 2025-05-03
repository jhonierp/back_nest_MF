import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Modulo } from "../../modulos/entities/modulo.entity"
import { BaseEntity } from "../../common/base.entity"

@Entity("submodulos")
export class Submodulo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nombre: string

  @ManyToOne(
    () => Modulo,
    (modulo) => modulo.submodulos,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "modulo_id" })
  modulo: Modulo

  @Column()
  modulo_id: number
}
