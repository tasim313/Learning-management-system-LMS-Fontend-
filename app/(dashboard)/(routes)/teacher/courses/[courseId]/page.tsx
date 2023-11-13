"use client";

import { redirect } from "next/navigation";
import axios  from "axios";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";


const CourseIdPage = ({
    params
}:{
    params: {courseId: string}
}) => {


    const [Course, setCourse] = useState<any>(null)
    const [completionStatus, setCompletionStatus] = useState({
        totalFields: 0,
        completedFields: 0,
        completionText: '(0/0)',
        isComplete: false,
      });
    
    useEffect(() => {
        const fetchData = async () => {
         
    
          try {
            const { data: courseData } = await axios.get(
              `http://127.0.0.1:8000/?uid=${params.courseId}`,
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );
            setCourse(courseData);

            // Calculate completion status
            const requiredFields = [
                courseData?.title,
                courseData?.description,
                courseData?.imageUrl,
                courseData?.price,
                courseData?.uid,
              ];

            const totalFields = requiredFields.length
            const completedFields = requiredFields.filter(Boolean).length;
            const completionText = `(${completedFields}/${totalFields})`;
            const isComplete = requiredFields.every(Boolean);

            setCompletionStatus({
                totalFields,
                completedFields,
                completionText,
                isComplete,
            });
      
          } catch (error) {
            if (axios.isAxiosError(error) && error.response && error.response.status === 400) {
                return redirect("/")
            } else {
              toast.error("Something went wrong");
            }
          }
        };
    
        fetchData();
      }, [params.courseId]);
    
    console.log("Course", Course)



    return ( 
        <>
            <div className="p-6">
               <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">
                        Course Setup
                    </h1>
                    <span>
                        Complete all fields {completionStatus.completionText}
                    </span>
                </div>
               </div>
            </div>
        </>
     );
}
 
export default CourseIdPage;