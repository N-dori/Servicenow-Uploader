
import { Request, Response } from 'express'
import ExcelJS from "exceljs";
// import { formatUsername } from './upload.service';
import { snInsert } from '../../servicenow.utils';
import { devConfig } from "../../config/dev";

export interface RawExcelRow {
  name: string | number | null;
  order: string | number | null;
  code: string | number | null;
}

export interface TransformedRow {
  name: string | null;
  order: string | number | null;
  code: string | number | null;
}



export const transformData = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(req.file.buffer as any);

    const worksheet = workbook.getWorksheet(1);
    if (!worksheet) {
      res.status(400).json({ error: "Excel sheet is empty or invalid" });
      return;
    }

    const rows: RawExcelRow[] = [];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // skip header
      
      rows.push({
        name: row.getCell(1).value as string | number | null,
        order: row.getCell(2).value as string | number | null,
        code: row.getCell(3).value as string | number | null,

      });
    })
    // Transform to strongly typed output
    const transformed: TransformedRow[] = rows.map(r => ({
      name: (r.name ?? null)?.toString() ?? null,
      order: r.order ? r.order : null,
      code: r.code ? r.code : null,
    }));

    
    const table =  ''

    const results: any[] = [];
    
    for (const item of transformed) {
      try {
        const snRes = await snInsert(table, item);
        results.push({ success: true, data: snRes });
      } catch (err: any) {
        results.push({ success: false, error: err.message, item });
      }
    }
    
    res.json({
      success: true,
      count: rows.length,
      data: results
    });
    console.log('results: ', results);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process Excel file" });
  }
};


