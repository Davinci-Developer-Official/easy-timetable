// const data = require("./data.json")
const structured = require("./structured.json")

// const courses =data.find(items=>{
//     items["Unit Name"] === "BBAM Y1S1"

// })
// const strCourse= structured.find(item=>{item.course==="BBAM Y1S1"})
// console.log(strCourse);

//find course
// find course
async function findCourse(courseParam){
    const strCourse = structured.filter(item => item["course"] === courseParam);

if (strCourse.length) {
  // timetable
  const timetable = strCourse[0].timetable;

  if (timetable && timetable.length) {
    // filled slots with day info
    const filledSlots = timetable.flatMap(day =>
      day.slots
        .filter(slot => slot.value !== "")
        .map(slot => ({
          day: day.day,   // keep day
          ...slot         // keep slot details
        }))
    );

     console.log(filledSlots);
     return filledSlots;
  }
}
}

async function findCourseByDay(courseParam,dayname){
    const strCourse = structured.filter(item => item["course"] === courseParam);
    //find course by day
if (strCourse.length) {
  const timetable = strCourse[0].timetable;

  // function to get filled slots for a given day
  function getSlotsByDay(dayName) {
    const dayData = timetable.find(d => d.day.toLowerCase() === dayName.toLowerCase());
    if (!dayData) return [];

    return dayData.slots
      .filter(slot => slot.value !== "")
      .map(slot => ({
        day: dayData.day,
        ...slot
      }));
  }

//   // Example usage:
//   const daySlots = getSlotsByDay("Tuesday");
//   console.log("Monday Slots:", daySlots);  
console.log(`fetched ${dayname} infromation`)
  return daySlots;
}
}

module.exports={
    findCourse,
    findCourseByDay
}
///extra -----stuff

async function getByUnitCode(){
    const strCourse = structured.filter(item => item["course"] === "BBAM Y1S1");
    //find by unit code
if (strCourse.length) {
  // timetable
  const timetable = strCourse[0].timetable;

  if (timetable) {
    // search by unit keyword
    function getSlotsByUnit(keyword) {
      const matches = [];
      timetable.forEach(day => {
        day.slots.forEach(slot => {
          if (slot.value && slot.value.toLowerCase().includes(keyword.toLowerCase())) {
            matches.push({
              day: day.day,
              ...slot
            });
          }
        });
      });
      return matches;
    }

    // example usage
    const accountingSlots = getSlotsByUnit("accounting");
   // console.log(accountingSlots);
  }
}}

// //filled slots
// const filledSlots = timetable.flatMap(day =>
//   day.slots.filter(slot => slot.value !== "")
// );
// console.log(filledSlots);
// //day specific
// const monday = timetable.find(day => day.day === "Monday");
// console.log(monday);
// //unit key word
//  const search = "Accounting";
//  const results = timetable.flatMap(day =>
//    day.slots
//      .filter(slot => slot.value.includes(search))
//      .map(slot => ({ day: day.day, time: slot.time, unit: slot.value }))
//  );
//  console.log(results);



