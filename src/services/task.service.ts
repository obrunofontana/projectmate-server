import {
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
} from "typeorm";
import { Project } from "../entities/project.entity";
import { Task } from "../entities/task.entity";
import { TaskColumn } from "../entities/taskColumn.entity";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../utils/data-source";

const taskRepository = AppDataSource.getRepository(Task);

export const createTask = async (
  input: Partial<Task>,
  creator: User,
  project: Project,
  taskColumn: TaskColumn
) => {
  return await taskRepository.save(
    taskRepository.create({ ...input, creator, project, taskColumn })
  );
};

export const getTask = async (taskId: string) => {
  return await taskRepository.findOneBy({ id: taskId });
};

export const findTasks = async (
  where: FindOptionsWhere<Project> = {},
  select: FindOptionsSelect<Project> = {},
  relations: FindOptionsRelations<Project> = {}
) => {
  return await taskRepository.find({
    where,
    select,
    relations,
  });
};
