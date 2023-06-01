const ExcelModel = require("./models/excelModel");
const fs = require('fs');
class ExcelController {
  uploadFile(req, res) {

    const filePath = req.file.path;

    // Createig an instance of the ExcelModel
    const excelModel = new ExcelModel(filePath);

    try {
      excelModel.loadFile();

      const sheetName = 'Sheet1';
      const data = excelModel.extractData(sheetName);

      const processedData = data.map((row) => ({
        Sum: row.Number1 + row.Number2,                 // Addition: Sum = Number1 + Number2
        Difference: row.Number1 - row.Number2           // Subtraction: Difference = Number1 - Number2
      }));

      return res.json(processedData);
    } catch (error) {
      console.error('Error processing file:', error);

      // Check for unauthorized access error
      if (error.message === 'Unauthorized access') {
        res.status(403).json({ error: 'Unauthorized access' });
      } else {
        // Return a general error response
        res.status(500).json({ error: 'An error occurred while processing the file.' });
      }
    }
  }

  readFile(req, res) {
    
    const filePath = req.params.filePath; 

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Read the file and send it as a response
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return res.status(500).json({ error: 'Error reading file' });
      }
      res.status(200).send(data);
    });
  }

  writeFile(req, res) {
    
    const filePath = req.body.filePath; 
    const content = req.body.content; 

    // Write the content to the file
    fs.writeFile(filePath, content, err => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).json({ error: 'Error writing file' });
      }
      res.status(200).json({ message: 'File written successfully' });
    });
  }

  deleteFile(req, res) {

    const filePath = req.params.filePath; 
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Delete the file
    fs.unlink(filePath, err => {
      if (err) {
        console.error('Error deleting file:', err);
        return res.status(500).json({ error: 'Error deleting file' });
      }
      res.status(200).json({ message: 'File deleted successfully' });
    });
  }
}

module.exports = ExcelController;
