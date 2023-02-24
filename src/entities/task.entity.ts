import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { taskRepository } from '../services/task.service';
import Model from './model.entity';
import { Project } from './project.entity';
import { TaskColumn } from './taskColumn.entity';
import { User } from './user.entity';

@Entity('tasks')
export class Task extends Model {
  @Column()
  order: number;

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

  @BeforeInsert()
  async updateOrder() {
    console.log('taskColumn', this.taskColumn.id)
    
    const task = await taskRepository
      .createQueryBuilder('tasks')
      .select('order')
      .where('taskColumnId = :taskColumnId', { taskColumnId: this.taskColumn.id })
      .orderBy('order', 'DESC')
      .getRawOne();

    console.log('task', task)
    if (task) {
      this.order = task.order + 1;
    } else {
      this.order = 0
    }
  }
}
