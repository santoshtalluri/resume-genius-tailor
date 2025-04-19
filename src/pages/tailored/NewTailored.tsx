
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WizardLayout from '@/components/wizard/WizardLayout';
import WizardStep from '@/components/wizard/WizardStep';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import ResumeUpload from '@/components/resume/ResumeUpload';

const TOTAL_STEPS = 7;

const NewTailored = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
      toast.success('Step completed successfully');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigate(-1);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 1:
        return <ResumeUpload />;
      case 2:
        return <div className="p-6">Preview of your selected resume will appear here</div>;
      case 3:
        return <div className="p-6">Job description input form will appear here</div>;
      case 4:
        return <div className="p-6">Job requirements review will appear here</div>;
      case 5:
        return <div className="p-6">Advanced settings controls will appear here</div>;
      case 6:
        return <div className="p-6">Generated resume and cover letter preview will appear here</div>;
      case 7:
        return <div className="p-6">Download options for your documents will appear here</div>;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Create Tailored Resume
        </h2>
        <p className="text-muted-foreground">
          Follow the steps below to generate your customized resume and cover letter
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4 lg:col-span-3">
          <WizardLayout>
            <div className="divide-y">
              <WizardStep
                isActive={currentStep === 1}
                isCompleted={currentStep > 1}
                stepNumber={1}
                title="Select Base Resume"
              >
                <div className="text-muted-foreground">Select or upload your base resume</div>
              </WizardStep>

              <WizardStep
                isActive={currentStep === 2}
                isCompleted={currentStep > 2}
                stepNumber={2}
                title="Preview Resume"
              >
                <div className="text-muted-foreground">Preview your selected resume</div>
              </WizardStep>

              <WizardStep
                isActive={currentStep === 3}
                isCompleted={currentStep > 3}
                stepNumber={3}
                title="Add Job Description"
              >
                <div className="text-muted-foreground">Enter job description details</div>
              </WizardStep>

              <WizardStep
                isActive={currentStep === 4}
                isCompleted={currentStep > 4}
                stepNumber={4}
                title="Review Requirements"
              >
                <div className="text-muted-foreground">Review job requirements</div>
              </WizardStep>

              <WizardStep
                isActive={currentStep === 5}
                isCompleted={currentStep > 5}
                stepNumber={5}
                title="Advanced Settings"
              >
                <div className="text-muted-foreground">Configure advanced tailoring settings</div>
              </WizardStep>

              <WizardStep
                isActive={currentStep === 6}
                isCompleted={currentStep > 6}
                stepNumber={6}
                title="Preview Results"
              >
                <div className="text-muted-foreground">Preview tailored resume and cover letter</div>
              </WizardStep>

              <WizardStep
                isActive={currentStep === 7}
                isCompleted={currentStep > 7}
                stepNumber={7}
                title="Download Documents"
              >
                <div className="text-muted-foreground">Download your tailored documents</div>
              </WizardStep>
            </div>
          </WizardLayout>
        </div>
        
        <div className="md:col-span-8 lg:col-span-9">
          <WizardLayout>
            <div className="p-4 min-h-[500px]">
              {renderStepContent(currentStep)}
            </div>
            
            <div className="p-6 border-t flex justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              <Button
                onClick={handleNext}
                disabled={currentStep === TOTAL_STEPS}
              >
                {currentStep === TOTAL_STEPS ? 'Complete' : (
                  <>
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </WizardLayout>
        </div>
      </div>
    </div>
  );
};

export default NewTailored;
