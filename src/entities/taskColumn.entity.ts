import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import Model from './model.entity';
import { Project } from './project.entity';
import { Task } from './task.entity';

@Entity('taskColumns')
export class TaskColumn extends Model {
  @Column()
  title: string;

  @Column({
    default: '#FFF',
  })
  color: string;

  @ManyToOne(() => Project, (project) => project.taskColumns)
  @JoinColumn()
  project: Project;

  @OneToMany(() => Task, (task) => task.taskColumn)
  tasks?: Task[];
}
