import { Request, Response } from "express";
import { snInsert } from "../../servicenow.utils"
import mammoth from 'mammoth'

export async function docxConverter(req: Request, res: Response) {
    try {
       
        const binaryDocx = req.body; // extract the buffer  data from req

        console.log("received file data length:", binaryDocx?.length);

    if (!binaryDocx || !binaryDocx.length) {
      return res.status(400).json({ error: "Empty file received" });
    }
        // convert with mammoth lib to html
        // optional setting can be added here 
        var options = {
            styleMap: [
                    "p[style-name='Section Title'] => h1:fresh",
                    "p[style-name='Subsection Title'] => h2:fresh"
            ]
        }; 
        const result = await mammoth.convertToHtml( {buffer: binaryDocx} )
        const html = result.value
        const massages = result.messages
      
        const response = {
            htmlContent : html ,
            massages
        }

        console.log('mammoth result', response)

        
        // find the record sys_attachment table

        // insert the html to html_content field 


       
    } catch (error) {
        console.error("Mammoth failed with error:", error);
        res.status(500).json({ error: "Mammoth failed with error" });
    }
}
