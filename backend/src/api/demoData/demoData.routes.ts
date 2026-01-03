import express from 'express'
import {transformData} from './demoData.controller'

const router = express.Router()

router.post("/demoData", transformData);

export default router