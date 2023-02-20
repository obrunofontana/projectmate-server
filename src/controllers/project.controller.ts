import { NextFunction, Request, Response } from 'express';
import {
  CreateProjectInput,
  DeleteProjectInput,
  GetProjectInput,
  UpdateProjectInput,
} from '../schemas/project.schema';
import { createProject, findProjects, getProject } from '../services/project.service';
import { findUserById } from '../services/user.service';
import AppError from '../utils/appError';

export const createProjectHandler = async (
  req: Request<{}, {}, CreateProjectInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findUserById(res.locals.user.id as string);

    const project = await createProject(req.body, user!);

    return res.status(201).json({
      status: 'success',
      data: {
        project,
      },
    });
  } catch (err: any) {
    if (err.code === '23505') {
      return res.status(409).json({
        status: 'fail',
        message: 'Projeto com este título já existe!',
      });
    }
    next(err);
  }
};

export const getProjectHandler = async (
  req: Request<GetProjectInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const project = await getProject(req.params.projectId);

    if (!project) {
      return next(new AppError(404, 'Projeto com ID informado não existe'));
    }

    return res.status(200).json({
      status: 'success',
      data: {
        project,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getProjectsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projects = await findProjects({}, {}, {});

    return res.status(200).json({
      status: 'success',
      results: projects.length,
      data: {
        projects,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateProjectHandler = async (
  req: Request<UpdateProjectInput['params'], {}, UpdateProjectInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const project = await getProject(req.params.projectId);

    if (!project) {
      return next(new AppError(404, 'Projeto com ID informado não existe'));
    }

    Object.assign(project, req.body);

    const updatedProject = await project.save();

    return res.status(200).json({
      status: 'success',
      data: {
        project: updatedProject,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteProjectHandler = async (
  req: Request<DeleteProjectInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const project = await getProject(req.params.projectId);

    if (!project) {
      return next(new AppError(404, 'Projeto com ID informado não encontrado'));
    }

    await project.remove();

    return res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};
