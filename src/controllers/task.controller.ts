import { NextFunction, Request, Response } from 'express';
import {
  CreateTaskInput,
  DeleteTaskInput,
  GetTaskInput,
  GetTasksInput,
  UpdateTaskInput,
} from '../schemas/task.schema';
import { createTask, getTask, findTasks } from '../services/task.service';
import { getProject } from '../services/project.service';
import { getTaskColumn } from '../services/taskColumn.service';
import AppError from '../utils/appError';
import { findUserById } from '../services/user.service';

export const createTaskHandler = async (
  req: Request<{}, {}, CreateTaskInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectId, taskColumnId, ...props } = req.body;

    const user = await findUserById(res.locals.user.id as string);
    
    const project = await getProject(projectId);

    if (!project) {
      return next(new AppError(404, 'Projeto com ID informado não existe'));
    }

    const taskColumn = await getTaskColumn(taskColumnId);

    if (!taskColumn) {
      return next(new AppError(404, 'Coluna com ID informado não existe'));
    }

    const task = await createTask(props, user!, project!, taskColumn!);

    return res.status(201).json({
      status: 'success',
      data: {
        task,
      },
    });
  } catch (err: any) {
    if (err.code === '23505') {
      return res.status(409).json({
        status: 'fail',
        message: 'Coluna com este título já existe!',
      });
    }
    next(err);
  }
};

export const getTaskHandler = async (
  req: Request<GetTaskInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await getTask(req.params.taskId);

    if (!task) {
      return next(new AppError(404, 'Tarefa com ID informado não existe'));
    }

    return res.status(200).json({
      status: 'success',
      data: {
        task,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getTasksHandler = async (
  req: Request<GetTasksInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasks = await findTasks({}, {}, {});

    return res.status(200).json({
      status: 'success',
      results: tasks.length,
      data: {
        tasks,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateTaskHandler = async (
  req: Request<UpdateTaskInput['params'], {}, UpdateTaskInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await getTask(req.params.taskId);

    if (!task) {
      return next(new AppError(404, 'Tarefa com ID informado não existe'));
    }

    Object.assign(task, req.body);

    const updated = await task.save();

    return res.status(200).json({
      status: 'success',
      data: {
        task: updated
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteTaskHandler = async (
  req: Request<DeleteTaskInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await getTask(req.params.taskId);

    if (!task) {
      return next(new AppError(404, 'Tarefa com ID informado não encontrado'));
    }

    await task.remove();

    return res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};
