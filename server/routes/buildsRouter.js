import express from 'express'
import {
  getAllBuilds,
  getBuildById,
  createBuild,
  updateBuild,
  deleteBuild
} from '../controllers/buildsController.js'

const router = express.Router()

router.get('/', getAllBuilds)
router.get('/:id', getBuildById)
router.post('/', createBuild)
router.put('/:id', updateBuild)
router.delete('/:id', deleteBuild)

export default router
