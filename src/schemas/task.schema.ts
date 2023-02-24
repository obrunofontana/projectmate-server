import { object, string, TypeOf } from 'zod';

export const createTaskSchema = object({
  body: object({
    title: string({
      required_error: 'Título é obrigatório',
    }),
    projectId: string({
      required_error: 'Id do projeto é obrigatório',
    }),
    taskColumnId: string({
      required_error: 'Id da coluna é obrigatório',
    }),
  }),
});

const params = {
  params: object({
    taskId: string(),
  }),
};

export const getTaskSchema = object({
  ...params,
});

export const getTasksColumnsSchema = object({
  ...params,
});

export const updateTaskSchema = object({
  ...params,
  body: object({
    title: string()
  }).partial(),
});

export const deleteTaskSchema = object({
  ...params,
});

export type CreateTaskInput = TypeOf<typeof createTaskSchema>['body'];
export type GetTaskInput = TypeOf<typeof getTaskSchema>['params'];
export type GetTasksInput = TypeOf<typeof getTasksColumnsSchema>['params'];
export type UpdateTaskInput = TypeOf<typeof updateTaskSchema>;
export type DeleteTaskInput = TypeOf<typeof deleteTaskSchema>['params'];
