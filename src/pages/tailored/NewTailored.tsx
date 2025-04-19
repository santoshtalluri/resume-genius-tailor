
import React from 'react';
import TailoringForm from '@/components/tailoring/TailoringForm';

const NewTailored = () => {
  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Create Tailored Resume</h2>
        <p className="text-muted-foreground">
          Generate a customized resume and cover letter optimized for a specific job
        </p>
      </div>
      
      <TailoringForm />
    </div>
  );
};

export default NewTailored;
