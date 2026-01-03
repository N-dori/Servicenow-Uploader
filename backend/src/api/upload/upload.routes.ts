import express from 'express'
import {transformData} from './upload.controller'
import multer from "multer";
const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("file"), transformData);

export default router