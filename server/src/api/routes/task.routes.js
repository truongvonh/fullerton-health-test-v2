import { Router } from 'express'
import {
  getTasksController,
  addTaskController,
  deleteTaskController,
  updateTaskController
} from '../controller/task.controller'
import { valueRequired, isNumber } from '../middlewares/common'
import { verifyToken } from '../middlewares/verifyToken'

const taskRouter = Router()

taskRouter.get('/', verifyToken, getTasksController )

taskRouter.post('/',
  [
    (req, res, next) => valueRequired([req.body.name])(req, res, next),
    verifyToken
  ],
  addTaskController
)

taskRouter.put('/', verifyToken, updateTaskController)

taskRouter.delete('/',
  [
    (req, res, next) => isNumber([req.body.id])(req, res, next),
    (req, res, next) => valueRequired([req.body.id])(req, res, next),
    verifyToken
  ],
  deleteTaskController
)

export default taskRouter
