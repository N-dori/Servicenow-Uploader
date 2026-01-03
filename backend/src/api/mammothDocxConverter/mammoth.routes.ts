import express from 'express'
import {docxConverter} from './mammoth.controller'

const router = express.Router()

router.post(
  "/mammoth",
  express.raw({
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    limit: "20mb",
  }),
  docxConverter
);

export default router