import { object, string, TypeOf } from 'zod';

export const createProjectSchema = object({
  body: object({
    title: string({
      required_error: 'Título é obrigatório',
    }),
    color: string({
      required_error: 'Cor é obrigatório',
    }),
  }),
});

const params = {
  params: object({
    projectId: string(),
  }),
};

export const getProjectSchema = object({
  ...params,
});

export const updateProjectSchema = object({
  ...params,
  body: object({
    title: string(),
    color: string(),
  }).partial(),
});

export const deleteProjectSchema = object({
  ...params,
});

export type CreateProjectInput = TypeOf<typeof createProjectSchema>['body'];
export type GetProjectInput = TypeOf<typeof getProjectSchema>['params'];
export type UpdateProjectInput = TypeOf<typeof updateProjectSchema>;
export type DeleteProjectInput = TypeOf<typeof deleteProjectSchema>['params'];
