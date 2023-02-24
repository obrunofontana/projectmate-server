import {
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere
} from 'typeorm';
import { TaskColumn } from '../entities/taskColumn.entity';
import { Project } from '../entities/project.entity'
import { AppDataSource } from '../utils/data-source';

export const taskColumnRepository = AppDataSource.getRepository(TaskColumn);

export const createTaskColumn = async (input: Partial<TaskColumn>, project: Project) => {
  return await taskColumnRepository.save(taskColumnRepository.create({ ...input, project }));
};

export const getTaskColumn = async (taskColumnId: string) => {
  return await taskColumnRepository.findOneBy({ id: taskColumnId });
};

export const findTaskColumns = async (
  where: FindOptionsWhere<TaskColumn> = {},
  select: FindOptionsSelect<TaskColumn> = {},
  relations: FindOptionsRelations<TaskColumn> = {}
) => {
  return await taskColumnRepository.find({
    where,
    select,
    relations,
  });
};
