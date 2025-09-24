// Search course
const getCourse = document.getElementById("searchCourse")
getCourse.addEventListener("click", (e) => {
  e.preventDefault();

  const courseParam = document.getElementById("courseParam").value.trim();

  if (!courseParam) {
    console.error("Please enter a course");
    return;
  }

  fetch(`http://localhost:3003/course/?${encodeURIComponent(courseParam)}`,{
    method:"GET",
    headers: {
    'Content-Type': 'application/json'
  }
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log("Fetched course:", data);

      // Show in page (optional)
      const results = document.getElementById("results");
      if (results) {
        results.textContent = JSON.stringify(data, null, 2);
      }
    })
    .catch((error) => {
      console.error("Error fetching data", error);
    });
});
