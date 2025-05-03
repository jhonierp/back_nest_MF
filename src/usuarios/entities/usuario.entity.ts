import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Proyecto } from '../../proyectos/entities/proyecto.entity';
import { Notificacion } from '../../notificaciones/entities/notificacion.entity';
import { ForoComentario } from '../../foro-comentarios/entities/foro-comentario.entity';
import { SoporteTecnico } from '../../soporte-tecnico/entities/soporte-tecnico.entity';

import { Rol } from '../../roles/entities/rol.entity';
import { BaseEntity } from '../../common/base.entity';

@Entity('usuarios')
export class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  telefono: string;

  @Column({
    type: 'enum',
    enum: ['google', 'telefono'],
    default: 'telefono',
  })
  tipo_autenticacion: string;

  @Column({ default: false })
  es_pro: boolean;

  @Column({ nullable: true })
  @Exclude()
  password: string;

  @Column({
    name: 'fecha_registro',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha_registro: Date;

  @OneToMany(() => Proyecto, (proyecto) => proyecto.usuario)
  proyectos: Proyecto[];

  @OneToMany(() => Notificacion, (notificacion) => notificacion.usuario)
  notificaciones: Notificacion[];

  @OneToMany(() => ForoComentario, (foroComentario) => foroComentario.usuario)
  foro_comentarios: ForoComentario[];

  @OneToMany(() => SoporteTecnico, (soporteTecnico) => soporteTecnico.usuario)
  soporte_tecnico: SoporteTecnico[];

  @ManyToMany(() => Rol, (rol) => rol.usuarios)
  @JoinTable({
    name: 'usuario_roles',
    joinColumn: { name: 'usuario_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'rol_id', referencedColumnName: 'id' },
  })
  roles: Rol[];
}
