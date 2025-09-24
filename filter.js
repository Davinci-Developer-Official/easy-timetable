// const data = require("./data.json")
const structured = require("./structured.json")

// const courses =data.find(items=>{
//     items["Unit Name"] === "BBAM Y1S1"

// })
// const strCourse= structured.find(item=>{item.course==="BBAM Y1S1"})
// console.log(strCourse);

//find course
// find course
 function findCourse(courseParam){
    // const strCourse = structured.find(item => item["course"] === courseParam);
    const strCourse1 = structured.filter(item=>item.course.toUpperCase().includes(courseParam.toUpperCase()))
if (strCourse1.length) {
  // timetable
  const timetable = strCourse1[0].timetable;

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
      return filledSlots.length ? filledSlots : null;
  }
}
}

function findCourseByDay(courseParam, dayName) {
  // 1. Find the course
  const course = structured.find(item =>
    item.course?.toUpperCase().includes(courseParam.toUpperCase())
  );

  if (!course) {
    return { error: "Course not found" };
  }

  // 2. Find the day in the timetable
  const dayData = course.timetable.find(
    d => d.day?.toUpperCase() === dayName.toUpperCase()
  );

  if (!dayData) {
    return { error: `No data for ${dayName}` };
  }

  // 3. Get only slots with values
  const filledSlots = (dayData.slots || [])
    .filter(slot => slot.value && slot.value.trim() !== "")
    .map(slot => ({
      day: dayData.day,
      ...slot
    }));

  return filledSlots.length ? filledSlots : { message: `No classes on ${dayName}` };
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




const rest = structured.find(item=>item.course.toUpperCase().includes("BBAM"));
console.log(JSON.stringify(rest))