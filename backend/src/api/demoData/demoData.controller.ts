import { Request, Response } from "express";
import { snInsert } from "../../servicenow.utils"
import { devConfig } from "../../config/dev";
export async function transformData(req: Request, res: Response) {
    try {
        const rows = req.body; // <-- JSON array from frontend

        const table = ''; // change this
        if (!Array.isArray(rows) || !table) {
            return res.status(400).json({ error: "Invalid demo data format or no table" });
        }

        const results = [];

        for (const item of rows) {
            try {
                const snRes = await snInsert(table, item);
                results.push({ success: true, data: snRes });
            } catch (err: any) {
                results.push({
                    success: false,
                    error: err.message,
                    item
                });
            }
        }

        res.json({
            success: true,
            count: rows.length,
            results
        });

        console.log("Demo Data Results:", results);

    } catch (error) {
        console.error("Demo data error:", error);
        res.status(500).json({ error: "Failed to process demo data" });
    }
}
