
import React from 'react';
import ResumeUpload from '@/components/resume/ResumeUpload';

const NewResume = () => {
  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Upload Resume</h2>
        <p className="text-muted-foreground">
          Upload your existing resume or paste its content to add it to your profile
        </p>
      </div>
      
      <ResumeUpload />
    </div>
  );
};

export default NewResume;
