import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Transaccion } from "../../transacciones/entities/transaccion.entity"
import { BaseEntity } from "../../common/base.entity"

@Entity("categorias_transaccion")
export class CategoriaTransaccion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nombre: string

  @Column({ type: "enum", enum: ["ingreso", "egreso"] })
  tipo: string

  @Column({ nullable: true })
  descripcion: string

  @OneToMany(
    () => Transaccion,
    (transaccion) => transaccion.categoria,
  )
  transacciones: Transaccion[]
}
