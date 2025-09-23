const excelToJson = require("convert-excel-to-json");
const path = require("path");
const fs = require("fs")

const result = excelToJson({
  sourceFile: path.join(__dirname, "./src/RUIRU CAMPUS DRAFT SEPTEMBER - DECEMBER 2025 TEACHING TIMETABLE (1).xlsx"),
  header: { rows: 1 }, // first row is header
  columnToKey: {
    A: "Unit Code",
    B: "Unit Name",
    C: "Day",
    D: "Time"
  }
});
if(fs.existsSync("./data.json")){
    fs.appendFile("./data.json",JSON.stringify(result,null,2),()=>{
        console.log("new data updated: ", result)
        return;
    })
}else{
    fs.writeFileSync("./data.json",JSON.stringify(result,null,2),()=>{
        console.log("new file created and data added: ",result)
        return;
    })
}
// console.log(JSON.stringify(result, null, 2));
