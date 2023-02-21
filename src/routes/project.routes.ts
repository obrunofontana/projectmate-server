import express from 'express';
import {
  createProjectHandler,
  deleteProjectHandler,
  getProjectHandler,
  getProjectsHandler,
  updateProjectHandler,
} from '../controllers/project.controller';
import { getTaskColumnsHandler } from '../controllers/taskColumn.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import {
  createProjectSchema,
  deleteProjectSchema,
  getProjectSchema,
  updateProjectSchema,
} from '../schemas/project.schema';

const router = express.Router();

router.use(deserializeUser, requireUser);
router
  .route('/')
  .post(
    validate(createProjectSchema),
    createProjectHandler
  )
  .get(getProjectsHandler);

router
  .route('/:projectId')
  .get(validate(getProjectSchema), getProjectHandler)
  .patch(validate(updateProjectSchema), updateProjectHandler)
  .delete(validate(deleteProjectSchema), deleteProjectHandler);

router
  .route('/:projectId/taskColumns')
  .get(validate(getProjectSchema), getTaskColumnsHandler)

export default router;
