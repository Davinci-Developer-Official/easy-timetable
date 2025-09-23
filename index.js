const path = require("path")
const fs = require("fs")
const express = require("express")
const{findCourse,findCourseByDay}=require("./filter")
const cors = require("cors")

const app = express();

app.use(cors());

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"./public/index.html"))
    
})

app.get("/course/:course", (req, res) => {
  const courseParam = decodeURIComponent(req.params.course);
  const course = findCourse(courseParam);
  if (!course) return res.status(404).json({ error: "Course not found" });
  res.json(course);
});

app.get("/course/:course/day/:day", (req, res) => {
  const courseParam = decodeURIComponent(req.params.course);
  const dayParam = decodeURIComponent(req.params.day);
  const dayObj = findCourseByDay(courseParam, dayParam);
  if (!dayObj) return res.status(404).json({ error: "Day not found for this course" });
  res.json(dayObj);
});

app.listen(3003,()=>console.log("listening to port: 3003 "))
