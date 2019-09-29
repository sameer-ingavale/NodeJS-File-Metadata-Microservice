const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
var upload = multer({ dest: "uploads/" });

const app = express();

app.use(bodyParser.json());

app.use(express.static("public"));

app.post("/upload", upload.single("file"), (req, res) => {
  const fileSize = Math.round(req.file.size / 1000);

  if (req.file) {
    return res.json({
      Name: req.file.originalname,
      Type: req.file.mimetype,
      Size: `${fileSize} kilobytes`
    });
  } else {
    return res.status(404).json("No file found");
  }
});

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
