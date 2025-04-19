
import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface WizardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const WizardLayout = ({ children, className }: WizardLayoutProps) => {
  return (
    <Card className={cn(
      "w-full max-w-4xl mx-auto bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 backdrop-blur-sm border border-primary/10",
      className
    )}>
      {children}
    </Card>
  );
};

export default WizardLayout;
