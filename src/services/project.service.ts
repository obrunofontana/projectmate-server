import {
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere
} from 'typeorm';
import { Project } from '../entities/project.entity';
import { User } from '../entities/user.entity';
import { AppDataSource } from '../utils/data-source';

export const projectRepository = AppDataSource.getRepository(Project);

export const createProject = async (input: Partial<Project>, creator: User) => {
  return await projectRepository.save(projectRepository.create({ ...input, creator }));
};

export const getProject = async (projectId: string) => {
  return await projectRepository.findOneBy({ id: projectId });
};

export const findProjects = async (
  where: FindOptionsWhere<Project> = {},
  select: FindOptionsSelect<Project> = {},
  relations: FindOptionsRelations<Project> = {}
) => {
  return await projectRepository.find({
    where,
    select,
    relations,
  });
};
