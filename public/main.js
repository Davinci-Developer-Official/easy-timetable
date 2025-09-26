

document.addEventListener("DOMContentLoaded",(e)=>{
    e.preventDefault();
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
  if(courseYr.length===0&&courseSem.length===0){
    searchParam = `${courseAbrev.value.toUpperCase()}`
  }

  console.log(searchParam + " " + day.value);

  searchTableAndDay.addEventListener("click", (e) => {
  e.preventDefault();

  const courseAbrev = document.getElementById("courseAbrev1").value.trim().toUpperCase();
  const courseYr = document.getElementById("courseYr1").value.trim().toUpperCase();
  const courseSem = document.getElementById("courseSem1").value.trim().toUpperCase();
  const day = document.getElementById("day").value.trim();

  // Step 1: fetch all courses with that abbreviation
  let endpoint = `http://localhost:3003/course/abrev/${encodeURIComponent(courseAbrev)}`;

  fetch(endpoint)
    .then((response) => {
      if (!response.ok) throw new Error("Response issue");
      return response.json();
    })
    .then((courses) => {
      if (!Array.isArray(courses)) {
        results.innerHTML = `<p>No results found</p>`;
        return [];
      }

      // Step 2: filter by year if provided
      let filtered = courses;
      if (courseYr) {
        filtered = filtered.filter((c) => c.course.includes(courseYr));
      }

      // Step 3: filter by semester if provided
      if (courseSem) {
        filtered = filtered.filter((c) => c.course.includes(courseSem));
      }

      // Step 4: flatten timetable data + filter by day if needed
      let rows = [];
      filtered.forEach((c) => {
        c.timetable.forEach((slot) => {
          if (!day || slot.day.toUpperCase() === day.toUpperCase()) {
            slot.slots.forEach((s) => {
              if (s.value && s.value.trim().length > 0) {
                rows.push({
                  day: slot.day,
                  time: s.time,
                  value: s.value,
                });
              }
            });
          }
        });
      });

      // Render results
      if (rows.length > 0) {
        results.innerHTML = `
          <table border="1" cellpadding="5">
            <tr>
              <th>Day</th>
              <th>Time</th>
              <th>Class</th>
            </tr>
            ${rows
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
        results.innerHTML = `<p>No timetable slots found for your query.</p>`;
      }
    })
    .catch((error) => {
      console.error(error);
    });
});


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
          <style>
            .timetable-table {
              border-collapse: collapse;
              width: 100%;
              font-family: 'Segoe UI', Arial, sans-serif;
              background: #fff;
              box-shadow: 0 2px 8px rgba(0,0,0,0.08);
              margin: 20px 0;
              font-size: 1rem;
            }
            .timetable-table th, .timetable-table td {
              border: 1px solid #e0e0e0;
              padding: 12px 16px;
              text-align: left;
              word-break: break-word;
            }
            .timetable-table th {
              background: #032141;
              color: #fff;
              font-weight: 600;
              letter-spacing: 0.5px;
            }
            .timetable-table tr:nth-child(even) {
              background: #f5f7fa;
            }
            .timetable-table tr:hover {
              background: #e3f2fd;
              transition: background 0.2s;
            }
            // @media (max-width: 600px) {
            //   .timetable-table, .timetable-table thead, .timetable-table tbody, .timetable-table th, .timetable-table td, .timetable-table tr {
            //     display: block;
            //     width: 100%;
            //   }
            //   .timetable-table thead {
            //     display: none;
            //   }
            //   .timetable-table tr {
            //     margin-bottom: 15px;
            //     box-shadow: 0 1px 4px rgba(0,0,0,0.04);
            //     background: #fff;
            //     border-radius: 6px;
            //     overflow: hidden;
            //   }
            //   .timetable-table td {
            //     border: none;
            //     border-bottom: 1px solid #e0e0e0;
            //     position: relative;
            //     padding-left: 50%;
            //     min-height: 40px;
            //   }
            //   .timetable-table td:before {
            //     position: absolute;
            //     top: 12px;
            //     left: 16px;
            //     width: 45%;
            //     white-space: nowrap;
            //     font-weight: bold;
            //     color: #032141;
            //     content: attr(data-label);
            //   }
            //   .timetable-table td:last-child {
            //     border-bottom: 0;
            //   }
            }
          </style>
          <table class="timetable-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Time</th>
                <th>Class</th>
              </tr>
            </thead>
            <tbody>
              ${data
                .map(
                  (item) => `
                  <tr>
                    <td data-label="Day">${item.day}</td>
                    <td data-label="Time">${item.time}</td>
                    <td data-label="Class">${item.value}</td>
                  </tr>`
                )
                .join("")}
            </tbody>
          </table>
        `;  } else {
        results.innerHTML = `<p>${data.message || data.error}</p>`;
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

const uploadFile = document.getElementById("upload");

uploadFile.addEventListener("click", async (e) => {
  e.preventDefault(); // prevent reload

  const fileInput = document.getElementById("timetable");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please choose file first");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  let resultBox = document.getElementById("results");
  resultBox.textContent = `Uploading: ${file.name}...\n`;

  try {
    fetch("http://localhost:3003/file", {
  method: "POST",
  body: formData,
})
  .then((response) => {
    response.preventDefault()
    if (!response.ok) {
      return response.text().then((text) => {
        resultBox.textContent += `Upload failed: ${text}`;
        throw new Error(text);
      });
    }
    return response.json();
  })
  .then((data) => {
    resultBox.textContent =
      `Uploaded: ${file.name}\n\n` +
      (data.structured
        ? JSON.stringify(data.structured, null, 2)
        : JSON.stringify(data, null, 2));
  })
  .catch((error) => {
    console.error(error);
  });

  } catch (error) {
    console.error("Upload error:", error);
    resultBox.textContent = "Error uploading file. Check if server is running.";
  }
});


})