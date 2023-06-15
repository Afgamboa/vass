import express from 'express';
import fs from 'fs'
import cors from 'cors'
import multer from 'multer'
const port = 3001;
const app = express();
app.use(cors())

app.listen(port, async () => {
  console.log("server running in port:", port);
});
const upload = multer({ dest: "uploads/" })

app.use("/fileProcess", await upload.single("file"), async (req, res) => {
  const words = req.body.words ? req.body.words.toLowerCase().split(",") : [];

  fs.readFile(req.file.path, (err, data) => {
    if (err) throw err;
    const content = data.toString().toLowerCase();
    const wordsInFile = content.split(/\s+/);
  
    let result = {
      totalWords: wordsInFile.length,
      wordCounts: {},
    };
  
    words.forEach((word) => {
      const lowercaseWord = word.toLowerCase();
      let count = 0;
  
      wordsInFile.forEach((w) => { 
        if (w === lowercaseWord) {
          count++;
        }
      });
  
      if (count > 0) {
        result.wordCounts[lowercaseWord] = count;
      }
    });
  
    return res.status(200).json({message: "Archivo procesado", result})
  });

  //console.log(response)
  //res.status(200).json({message: "Archivo procesado", response})


});


// app.use('/fileProcess', async (req, res) => {

//   console.log("hola mundo", req)

// })