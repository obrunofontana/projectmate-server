import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import Model from './model.entity';
import { Project } from './project.entity';
import { TaskColumn } from './taskColumn.entity';
import { User } from './user.entity';

@Entity('tasks')
export class Task extends Model {
  @Column({
    unique: true,
  })
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn()
  creator: User;

  @ManyToOne(() => TaskColumn, (taskColumn) => taskColumn.tasks)
  @JoinColumn()
  taskColumn: TaskColumn;

  @ManyToOne(() => Project, (project) => project.tasks)
  @JoinColumn()
  project: Project;
}
