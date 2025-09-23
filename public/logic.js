const { response } = require("express");

const courseParam = document.getElementById("courseParam").value;
const dayParam = document.getElementById("dayParam").value;
const courseParam1 = document.getElementById("courseParam1").value;

document.getElementById("searchCourse").addEventListener("click",(e)=>{
    e.preventDefault;
    fetch(`http://localhost:3000/course/${courseParam}`,{
        method:"GET"
    }).then(res=>{
        if(res.ok){
            return res.json()
        }else{
            throw new Error(`HTTP error! status: ${response.status}`)
        }
    }).then(data=>{
        console.log(data)
    }).catch(error=>{
       
            console.error("Error fetching data",error)
        }
    )
})