import { Request, Response } from "express";
import { snInsert } from "../../servicenow.utils"
import mammoth from 'mammoth'

export async function sayHello(req: Request, res: Response) {
    try {
        res.status(200).json({ message: "Hello World!" });
    } catch (error) {
        console.error("Hello World! failed with error:", error);
        res.status(500).json({ error: "Mammoth failed with error" });
    }
}
