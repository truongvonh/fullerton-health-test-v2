import db from './../db/models'
import { jsonSuccess, jsonError } from '../../utils/result'

const { Tasks } = db

export const getTasksController = async (req, res) => {
  try {
    const data = await Tasks.findAll({
      attributes: ['id', 'name', 'status']
    })
    if (!data.length)
      res.json(jsonError('no data'))
    else res.json(jsonSuccess(data))
  } catch (err) {
    res.json(jsonError('network error'))
  }
}

export const addTaskController = async (req, res) => {
  const { name, status } = req.body
  try {
    await Tasks.create({ name, status: (status || false) })
    res.json(jsonSuccess('create success'))
  } catch (error) {
    res.json(jsonError('network error'))
  }
}

export const deleteTaskController = async (req, res) => {
  const { id } = req.body
  try {
    const result = await Tasks.destroy({ where: { id } })
    if (!result) res.json(jsonError('not found item to delete'))
    else res.json(jsonSuccess('success'))
  } catch (error) {
    res.json(jsonError('network error'))
  }
}

export const updateTaskController = async (req, res) => {
  const { id, name, status } = req.body
  try {
    const result = await Tasks.update(
      { name, status },
      { where: { id }}
    )
    if (!result[0]) res.json(jsonError('not found item to update'))
    else res.json(jsonSuccess('success'))
  } catch (error) {
    res.json(jsonError('network error'))
  }
}
