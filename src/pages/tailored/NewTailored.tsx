
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WizardLayout from '@/components/wizard/WizardLayout';
import WizardStep from '@/components/wizard/WizardStep';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

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
      
      <WizardLayout>
        <div className="divide-y">
          <WizardStep
            isActive={currentStep === 1}
            isCompleted={currentStep > 1}
            stepNumber={1}
            title="Select Base Resume"
          >
            {/* Step content will be added here */}
          </WizardStep>

          <WizardStep
            isActive={currentStep === 2}
            isCompleted={currentStep > 2}
            stepNumber={2}
            title="Preview Resume"
          >
            {/* Step content will be added here */}
          </WizardStep>

          <WizardStep
            isActive={currentStep === 3}
            isCompleted={currentStep > 3}
            stepNumber={3}
            title="Add Job Description"
          >
            {/* Step content will be added here */}
          </WizardStep>

          <WizardStep
            isActive={currentStep === 4}
            isCompleted={currentStep > 4}
            stepNumber={4}
            title="Review Requirements"
          >
            {/* Step content will be added here */}
          </WizardStep>

          <WizardStep
            isActive={currentStep === 5}
            isCompleted={currentStep > 5}
            stepNumber={5}
            title="Advanced Settings"
          >
            {/* Step content will be added here */}
          </WizardStep>

          <WizardStep
            isActive={currentStep === 6}
            isCompleted={currentStep > 6}
            stepNumber={6}
            title="Preview Results"
          >
            {/* Step content will be added here */}
          </WizardStep>

          <WizardStep
            isActive={currentStep === 7}
            isCompleted={currentStep > 7}
            stepNumber={7}
            title="Download Documents"
          >
            {/* Step content will be added here */}
          </WizardStep>
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
  );
};

export default NewTailored;
