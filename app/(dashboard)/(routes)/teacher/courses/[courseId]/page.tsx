import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import axios  from "axios";
import toast from "react-hot-toast";
import { useState } from "react";


const CourseIdPage = async({
    params
}:{
    params: {courseId: string}
}) => {
    const [Course, setCourse] = useState([])
    const {userId} = auth()
    if(!userId){
        return redirect("/")
    }

    try {

        const course = await axios.get(`http://127.0.0.1:8000/?uid=${params.courseId}`,{
                        headers: {
                            'Content-Type': 'application/json',
                            
                        }
                }
            )
    } catch (error) {

        if (error.response && error.response.status === 400) {
            
            return redirect("/")
            
          } else {
            toast.error("Something went wrong")
          }
    }

    
    
    


    return ( 
        <>
            <div>
               <p>Course Id: {params.courseId}</p>
               

            </div>
        </>
     );
}
 
export default CourseIdPage;