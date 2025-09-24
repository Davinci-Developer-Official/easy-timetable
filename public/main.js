document.addEventListener("DOMContentLoaded",()=>{
    const searchTable = document.getElementById("searchCourse");
    const searchTableAndDay= document.getElementById("searchDay");
    console.log("working")
//     searchTable.addEventListener("click",(e)=>{
//         e.preventDefault();
//         const courseName = document.getElementById("courseName")
//         const courseAbrev = document.getElementById("courseAbrev")
//         const courseYr = document.getElementById("courseYr")
//         const courseSem = document.getElementById("courseSem")
//         const modAbrev= courseAbrev.value
//         const searchParam = `${courseAbrev.value.toUpperCase()} ${courseYr.value.toUpperCase()}${courseSem.value.toUpperCase()}`
//         console.log(searchParam)
        
//         fetch(`http://localhost:3003/course/${encodeURIComponent(searchParam)}`)
//         .then((response)=>{
//             if(!response.ok) console.log("not working well response issue")
//             return response.json()
//         })
//         .then((data)=>{
//             console.log(data)
//             if (Array.isArray(data)) {
//   results.innerHTML = `
//     <table border="1" cellpadding="5">
//       <tr>
//         <th>Day</th>
//         <th>Time</th>
//         <th>Class</th>
//       </tr>
//       ${data
//         .map(
//           item => `
//           <tr>
//             <td>${item.day}</td>
//             <td>${item.time}</td>
//             <td>${item.value}</td>
//           </tr>`
//         )
//         .join("")}
//     </table>
//   `;
// } else {
//   results.innerHTML = `<p>${data.message || data.error}</p>`;
// }

//         })
//         .catch((error)=>{
//             console.error(error)
//         })
//     })

    searchTableAndDay.addEventListener("click", (e) => {
  e.preventDefault();

  const courseAbrev = document.getElementById("courseAbrev1");
  const courseYr = document.getElementById("courseYr1");
  const courseSem = document.getElementById("courseSem1");
  const day = document.getElementById("day");

  const searchParam = `${courseAbrev.value.toUpperCase()} ${courseYr.value.toUpperCase()}${courseSem.value.toUpperCase()}`;
  console.log(searchParam + " " + day.value);

  if (courseAbrev.value.length === 0 || courseYr.value.length === 0 || courseSem.value.length === 0) {
    console.log("Missing required course fields");
    return;
  }

  // decide API endpoint based on whether day is filled
  let endpoint = `http://localhost:3003/course/${encodeURIComponent(searchParam)}`;
  if (day.value.trim().length > 0) {
    endpoint += `/day/${encodeURIComponent(day.value)}`;
  }

  fetch(endpoint)
    .then((response) => {
      if (!response.ok) console.log("Response issue");
      return response.json();
    })
    .then((data) => {
    //   console.log(data);
      if (Array.isArray(data)) {
        results.innerHTML = `
          <table border="1" cellpadding="5">
            <tr>
              <th>Day</th>
              <th>Time</th>
              <th>Class</th>
            </tr>
            ${data
              .map(
                (item) => `
                <tr>
                  <td>${item.day}</td>
                  <td>${item.time}</td>
                  <td>${item.value}</td>
                </tr>`
              )
              .join("")}
          </table>
        `;
      } else {
        results.innerHTML = `<p>${data.message || data.error}</p>`;
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

})