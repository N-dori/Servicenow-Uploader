import { Request, Response } from "express";
import { snInsert, snUpdate } from "../../servicenow.utils";
import mammoth from "mammoth";

export async function docxConverter(req: Request, res: Response) {
  try {
    // 1. Access the Metadata from Headers
    const revisionId = req.headers["x-revision-id"];
    const table = req.headers["table"];
    const instance = req.headers["x-instance"];
    const user = req.headers["x-user"];
    const password = req.headers["x-password"]; // Optional/Security check
  
    console.log("revisionId result", revisionId);
    console.log("password result", password);
    console.log("user result", user);
    console.log("instance result", instance);
    console.log("table result", table);
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
        "p[style-name='Subsection Title'] => h2:fresh",
      ],
    };
    const result = await mammoth.convertToHtml({ buffer: binaryDocx });
    const html = result.value;
    const massages = result.messages;

    const response = {
      htmlContent: html,
      massages,
    };

    console.log("mammoth result", response);


    // insert the html to html_content field
    const payload = {
        html_content: html 
    };

    // 2. Call the update function
    // revisionId is the sys_id of the record to update
    if (!revisionId || typeof revisionId !== "string" || !table || typeof table !== "string") {
      return res.status(400).json({ error: "Missing or invalid revisionId or table in headers" });
    }
    const snResult = await snUpdate(table, revisionId, payload);

    // 3. Return success to ServiceNow
    res.status(200).json({ 
        success: true, 
        message: "HTML content updated in ServiceNow",
        record: snResult.result.sys_id 
    });
  } catch (error) {
    console.error("Mammoth failed with error:", error);
    res.status(500).json({ error: "Mammoth failed with error" });
  }
}
