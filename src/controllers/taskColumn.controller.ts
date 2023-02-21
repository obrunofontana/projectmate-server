import { NextFunction, Request, Response } from 'express';
import {
  CreateTaskColumnInput,
  DeleteTaskColumnInput,
  GetTaskColumnInput,
  GetTaskColumnsInput,
  UpdateTaskColumnInput,
} from '../schemas/taskColumn.schema';
import { createTaskColumn, findTaskColumns, getTaskColumn } from '../services/taskColumn.service';
import { getProject } from '../services/project.service';
import AppError from '../utils/appError';

export const createTaskColumnHandler = async (
  req: Request<{}, {}, CreateTaskColumnInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const project = await getProject(req.body.projectId);

    if (!project) {
      return next(new AppError(404, 'Projeto com ID informado não existe'));
    }

    const taskColumn = await createTaskColumn(req.body, project!);

    return res.status(201).json({
      status: 'success',
      data: {
        taskColumn,
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

export const getTaskColumnHandler = async (
  req: Request<GetTaskColumnInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskColumn = await getTaskColumn(req.params.taskColumnId);

    if (!taskColumn) {
      return next(new AppError(404, 'Coluna com ID informado não existe'));
    }

    return res.status(200).json({
      status: 'success',
      data: {
        taskColumn,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getTaskColumnsHandler = async (
  req: Request<GetTaskColumnsInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskColumns = await findTaskColumns({
      project: {
        id: req.params.projectId
      }
    }, {}, {});

    return res.status(200).json({
      status: 'success',
      results: taskColumns.length,
      data: {
        taskColumns,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateTaskColumnHandler = async (
  req: Request<UpdateTaskColumnInput['params'], {}, UpdateTaskColumnInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskColumn = await getTaskColumn(req.params.taskColumnId);

    if (!taskColumn) {
      return next(new AppError(404, 'Coluna com ID informado não existe'));
    }

    Object.assign(taskColumn, req.body);

    const updatedTaskColumn = await taskColumn.save();

    return res.status(200).json({
      status: 'success',
      data: {
        taskColumn: updatedTaskColumn,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteTaskColumnHandler = async (
  req: Request<DeleteTaskColumnInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskColumn = await getTaskColumn(req.params.taskColumnId);

    if (!taskColumn) {
      return next(new AppError(404, 'Coluna com ID informado não encontrado'));
    }

    await taskColumn.remove();

    return res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};
