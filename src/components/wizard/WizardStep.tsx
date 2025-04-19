
import React from 'react';
import { cn } from '@/lib/utils';

interface WizardStepProps {
  children: React.ReactNode;
  isActive: boolean;
  isCompleted: boolean;
  stepNumber: number;
  title: string;
}

const WizardStep = ({ 
  children, 
  isActive, 
  isCompleted, 
  stepNumber, 
  title 
}: WizardStepProps) => {
  return (
    <div className={cn(
      "relative p-6",
      isActive ? "opacity-100" : "opacity-50",
      isCompleted && "bg-primary/5"
    )}>
      <div className="flex items-center gap-4 mb-4">
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
          isCompleted ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        )}>
          {stepNumber}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="ml-12">
        {children}
      </div>
    </div>
  );
};

export default WizardStep;
