
import React from 'react';
import JobDescriptionInput from '@/components/job/JobDescriptionInput';

const NewJob = () => {
  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Add Job Description</h2>
        <p className="text-muted-foreground">
          Add a job description to tailor your resume for a specific position
        </p>
      </div>
      
      <JobDescriptionInput />
    </div>
  );
};

export default NewJob;
