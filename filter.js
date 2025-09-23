const data = require("./data.json")
const structured = require("./structured.json")

// const courses =data.find(items=>{
//     items["Unit Name"] === "BBAM Y1S1"

// })
// const strCourse= structured.find(item=>{item.course==="BBAM Y1S1"})
// console.log(strCourse);
const strCourse = structured.filter(item => { return item["course"] === "BBAM Y1S1"});
console.log(strCourse);
