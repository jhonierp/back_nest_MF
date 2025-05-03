import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Proyecto } from "../../proyectos/entities/proyecto.entity"
import { CategoriaTransaccion } from "../../categorias-transaccion/entities/categoria-transaccion.entity"
import { BaseEntity } from "../../common/base.entity"

@Entity("transacciones")
export class Transaccion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "decimal", precision: 10, scale: 2 })
  monto: number

  @Column({ type: "date" })
  fecha: Date

  @Column({ nullable: true })
  descripcion: string

  @Column({ nullable: true })
  comprobante_url: string

  @ManyToOne(
    () => Proyecto,
    (proyecto) => proyecto.transacciones,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "proyecto_id" })
  proyecto: Proyecto

  @Column()
  proyecto_id: number

  @ManyToOne(
    () => CategoriaTransaccion,
    (categoria) => categoria.transacciones,
  )
  @JoinColumn({ name: "categoria_id" })
  categoria: CategoriaTransaccion

  @Column()
  categoria_id: number
}
