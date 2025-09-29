const path = require("path")
const fs = require("fs")
const express = require("express")
const{findCourse,findCourseByDay}=require("./filter")
const {excelJson} = require("./structured-excel-json")
const cors = require("cors")
const multer= require("multer")

const app = express();

app.use(cors());



app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"./public/index.html"))
    
})

const storage = multer.diskStorage({
  destination:(req,file,cb)=>cb(null,"src/"),
  filename:(req,file,cb)=>cb(null,Date.now()+"-"+file.originalname)
});
const upload = multer({storage});

app.post("/file", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const filePath = path.join(__dirname, req.file.path);
  try {
    const data = excelJson(filePath); // must return structured data
    return res.json({
      success: true,
      structured: data,
      filename: req.file.originalname
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to process Excel file" });
  }
});


app.get("/course/:course", (req, res) => {
  const courseParam = decodeURIComponent(req.params.course);
  const course = findCourse(courseParam);
  console.log(courseParam)
  if (!course) return res.status(404).json({ error: "Course not found" });
  return res.json(course);
  
});
app.use(express.static('public'));


app.get("/course/:course/day/:day", (req, res) => {
  const courseParam = decodeURIComponent(req.params.course);
  const dayParam = decodeURIComponent(req.params.day);
  const dayObj = findCourseByDay(courseParam, dayParam);
  if (!dayObj) return res.status(404).json({ error: "Day not found for this course" });
  res.json(dayObj);
});

app.listen(3003,()=>console.log("listening to port: 3003 "))
