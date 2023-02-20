import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import Model from './model.entity';
import { Task } from './task.entity';
import { TaskColumn } from './taskColumn.entity';
import { User } from './user.entity';

@Entity('projects')
export class Project extends Model {
  @Column({
    unique: true,
  })
  title: string;

  @Column({
    default: '#FFF',
  })
  color: string;

  @Column({
    default: false,
  })
  public: boolean;

  @ManyToOne(() => User, (user) => user.projects)
  @JoinColumn()
  creator: User;

  @OneToMany(() => TaskColumn, (taskColumn) => taskColumn.project)
  taskColumns: TaskColumn[];

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];
}
