import express from 'express';
import {
  createTaskColumnHandler,
  deleteTaskColumnHandler,
  getTaskColumnHandler,
  getTaskColumnsHandler,
  updateTaskColumnHandler,
} from '../controllers/taskColumn.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import {
  createTaskColumnSchema,
  deleteTaskColumnSchema,
  getTaskColumnSchema,
  updateTaskColumnSchema,
} from '../schemas/taskColumn.schema';

const router = express.Router();

router.use(deserializeUser, requireUser);
router
  .route('/')
  .post(
    validate(createTaskColumnSchema),
    createTaskColumnHandler
  )
  .get(getTaskColumnsHandler);

router
  .route('/:taskColumnId')
  .get(validate(getTaskColumnSchema), getTaskColumnHandler)
  .patch(validate(updateTaskColumnSchema), updateTaskColumnHandler)
  .delete(validate(deleteTaskColumnSchema), deleteTaskColumnHandler);

export default router;
