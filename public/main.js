document.addEventListener("DOMContentLoaded",()=>{
    const searchTable = document.getElementById("searchCourse");
    const searchTableAndDay= document.getElementById("searchDay");
    console.log("working")
    searchTable.addEventListener("click",(e)=>{
        e.preventDefault();
        const courseName = document.getElementById("courseName")
        const courseAbrev = document.getElementById("courseAbrev")
        const courseYr = document.getElementById("courseYr")
        const courseSem = document.getElementById("courseSem")
        const modAbrev= courseAbrev.value
        const searchParam = `${courseAbrev.value.toUpperCase()} ${courseYr.value.toUpperCase()}${courseSem.value.toUpperCase()}`
        console.log(searchParam)
        
        fetch(`http://localhost:3003/course/${encodeURIComponent(searchParam)}`)
        .then((response)=>{
            if(!response.ok) console.log("not working well response issue")
            return response.json()
        })
        .then((data)=>{
            console.log(data)
            document.getElementById("results").innerHTML = JSON.stringify(data)
        })
        .catch((error)=>{
            console.error(error)
        })
    })

    searchTableAndDay.addEventListener("click",(e)=>{
        e.preventDefault();
        const courseName = document.getElementById("courseName1")
        const courseAbrev = document.getElementById("courseAbrev1")
        const courseYr = document.getElementById("courseYr1")
        const courseSem = document.getElementById("courseSem1")
        const day = document.getElementById("day")
        const modAbrev= courseAbrev.value
        const searchParam = `${courseAbrev.value.toUpperCase()} ${courseYr.value.toUpperCase()}${courseSem.value.toUpperCase()}`
        console.log(searchParam+day.value)
        
        fetch(`http://localhost:3003/course/${encodeURIComponent(searchParam)}/day/${encodeURIComponent(day.value)}`)
        .then((response)=>{
            if(!response.ok) console.log("not working well response issue")
            return response.json()
        })
        .then((data)=>{
            console.log(data)
            document.getElementById("results").innerHTML = JSON.stringify(data)
        })
        .catch((error)=>{
            console.error(error)
        })
    })
})