import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { PlusCircle, File, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface Attachment {
  name: string | null;
  file: File | null;
}

interface AttachmentFormProps {
  initialData: { attachments: Attachment[] };
  courseId: string;
}

const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    console.log('Accepted Files:', acceptedFiles);
    setFiles([file]); // Set files as an array with the dropped file
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '.pdf, .doc, .docx, .jpg, .jpeg, .png, .gif',
    maxFiles: 1,
  });

  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();

  const onSubmit = async () => {
    try {
      const formData = new FormData();
  
      formData.append('uid', courseId);
  
      if (files.length > 0) {
        formData.append('file', files[0], files[0].name); 
      }
  
  
      console.log('Final FormData:', formData);
  
      await axios.post(`http://127.0.0.1:8000/attachment/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      toast.success('Course updated');
      toggleEdit();
      router.refresh();
      window.location.reload();
    } catch (error) {
      toast.error('Something went wrong');
    }
  };
  

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course attachments
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a file
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData?.attachments?.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">No attachments yet</p>
          )}
          {initialData?.attachments?.length > 0 && (
            <div className="space-y-2">
              {initialData?.attachments.map((attachment) => (
                <div
                  key={attachment.uid}
                  className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">{attachment.name}</p>
                  {deletingId === attachment.uid && (
                    <div>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <div
            {...getRootProps({
              className: `dropzone ${
                isDragActive ? 'active' : ''
              } border-dashed border-2 border-gray-400 p-4 rounded-md`,
            })}
          >
            <input {...getInputProps()} />
            <p className="text-gray-600">
              {isDragActive ? 'Drop the files here' : 'Drag \'n\' drop some files'}
            </p>
          </div>
          {files.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-semibold">Selected Files:</p>
              <ul>
                {files.map((file) => (
                  <li key={file.name} className="text-sm mt-2">
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Button
            onClick={onSubmit}
            variant="primary"
            disabled={files.length === 0}
            className="mt-4"
          >
            Upload Files
          </Button>
          <div className="text-xs text-muted-foreground mt-4">
            Add anything your students might need to complete the course.
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;
