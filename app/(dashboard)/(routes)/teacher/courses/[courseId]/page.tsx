"use client";

import { useRouter } from "next/navigation";
import axios  from "axios";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { IconBadge } from "@/components/icon-badge";
import { CircleDollarSign, LayoutDashboard, ListChecks } from "lucide-react";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import ImageForm from "./_components/image-form";
import CategoryForm from "./_components/category-form";
import PriceForm from "./_components/price-form";


const CourseIdPage = ({
    params
}:{
    params: {courseId: string}
}) => {

    const router = useRouter();
    const [Course, setCourse] = useState<any>(null)
    const [Categories, setCategory] = useState<any>(null)
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
            setCourse(courseData[0]);

            // Calculate completion status
            const requiredFields = [
                courseData?.title,
                courseData?.description,
                courseData?.imageUrl,
                courseData?.price,
                courseData?.uid,
              ];

            const totalFields = requiredFields.length
            const completedFields = requiredFields.filter(
              field => field !== null && field !== undefined
            ).length;
            const completionText = `(${completedFields}/${totalFields})`;
            const isComplete = completedFields === totalFields;
    
            setCompletionStatus({
                totalFields,
                completedFields,
                completionText,
                isComplete,
            });
      
          } catch (error) {
            if (axios.isAxiosError(error) && error.response && error.response.status === 400) {
              router.push("/")
            } else {
              toast.error("Something went wrong");
            }
          }
        };
    
        fetchData();
      }, [params.courseId]);
    
    
      useEffect(() => {
        const fetchData = async () => {
         
          try {
            const { data: categoryData } = await axios.get(
              `http://127.0.0.1:8000/category/`,
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );
            setCategory(categoryData);
      
          } catch (error) {
            if (axios.isAxiosError(error) && error.response && error.response.status === 400) {
              router.push("/")
            } else {
              toast.error("Something went wrong");
            }
          }
        };
    
        fetchData();
      }, []);


    console.log("Category", Categories)



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
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                    <div>
                      <div className="flex items-center gap-x-2">
                            <IconBadge icon={LayoutDashboard}/>
                            <h2 className="text-xl">
                              Customized Your Course
                            </h2>
                      </div>
                      <TitleForm initialData={Course} courseId={Course?.uid}/>
                      <DescriptionForm initialData={Course} courseId={Course?.uid}/>
                      <ImageForm initialData={Course} courseId={Course?.uid}/>
                      <CategoryForm
                        initialData={Course}
                        courseId={Course?.uid}
                        options={Categories?.map((category) => ({
                          label: category.name,
                          value: category.uid
                        }))}
                      />

                    </div>
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center gap-x-2">
                          <IconBadge icon={ListChecks}/>
                          <h2 className="text-xl">
                            Course Chapters
                          </h2>
                        </div>
                        <div>
                          TODO: Chapters 
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-x-2">
                           <IconBadge icon={CircleDollarSign}/>
                           <h2 className="text-xl">Sell your course</h2>
                        </div>
                        <PriceForm initialData={Course} courseId={Course?.uid}/>
                      </div>
                    </div>
               </div>
            </div>
        </>
     );
}
 
export default CourseIdPage;