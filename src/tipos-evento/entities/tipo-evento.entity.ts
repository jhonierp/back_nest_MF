import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Evento } from "../../eventos/entities/evento.entity"
import { BaseEntity } from "../../common/base.entity"

@Entity("tipos_evento")
export class TipoEvento extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  nombre: string

  @OneToMany(
    () => Evento,
    (evento) => evento.tipo_evento,
  )
  eventos: Evento[]
}
