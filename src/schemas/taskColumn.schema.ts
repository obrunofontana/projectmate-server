import { object, string, TypeOf } from 'zod';

export const createTaskColumnSchema = object({
  body: object({
    title: string({
      required_error: 'Título é obrigatório',
    }),
    color: string({
      required_error: 'Cor é obrigatório',
    }),
    projectId: string({
      required_error: 'Id do projeto é obrigatório',
    }),
  }),
});

const params = {
  params: object({
    taskColumnId: string(),
    projectId: string(),
  }),
};

export const getTaskColumnSchema = object({
  ...params,
});

export const getTaskColumnsSchema = object({
  ...params,
});

export const updateTaskColumnSchema = object({
  ...params,
  body: object({
    title: string(),
    color: string(),
  }).partial(),
});

export const deleteTaskColumnSchema = object({
  ...params,
});

export type CreateTaskColumnInput = TypeOf<typeof createTaskColumnSchema>['body'];
export type GetTaskColumnInput = TypeOf<typeof getTaskColumnSchema>['params'];
export type GetTaskColumnsInput = TypeOf<typeof getTaskColumnsSchema>['params'];
export type UpdateTaskColumnInput = TypeOf<typeof updateTaskColumnSchema>;
export type DeleteTaskColumnInput = TypeOf<typeof deleteTaskColumnSchema>['params'];
