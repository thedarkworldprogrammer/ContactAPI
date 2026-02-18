import express from 'express'
import { deleteById, getContact, getContactById, save, updateById } from '../controller/contactController.js'
import { isAuthenticate } from '../middlewares/Auth.js'

const router = express.Router()

router.post('/save',isAuthenticate,save)
router.get('/getAllContact',getContact)
router.get('/:id',getContactById)
router.put('/:id',updateById)
router.delete('/:id',deleteById)

export const contactRoutes = router