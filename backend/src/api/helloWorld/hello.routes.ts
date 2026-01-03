import express from 'express'
import {sayHello} from './hello.controller'

const router = express.Router()

router.get(
  "/hello",sayHello
);

export default router