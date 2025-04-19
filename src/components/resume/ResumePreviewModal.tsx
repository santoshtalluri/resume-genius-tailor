
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ResumeType } from '@/lib/types';

interface ResumePreviewModalProps {
  resume: ResumeType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ResumePreviewModal: React.FC<ResumePreviewModalProps> = ({
  resume,
  open,
  onOpenChange,
}) => {
  if (!resume) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{resume.name}</DialogTitle>
          <DialogDescription>
            Last modified: {new Date(resume.lastModified).toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview" className="pt-4">
            <div className="border rounded-md p-6 bg-white">
              <h1 className="text-2xl font-bold mb-1">{resume.personalInfo.name}</h1>
              <p className="text-muted-foreground mb-4">
                {resume.personalInfo.email} • {resume.personalInfo.phone} • {resume.personalInfo.location}
              </p>
              
              <div className="mb-4">
                <h2 className="text-lg font-semibold border-b pb-1 mb-2">Summary</h2>
                <p>{resume.summary}</p>
              </div>
              
              <div className="mb-4">
                <h2 className="text-lg font-semibold border-b pb-1 mb-2">Experience</h2>
                {resume.experience.map((exp, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{exp.title} at {exp.company}</h3>
                      <span className="text-sm text-muted-foreground">{exp.period}</span>
                    </div>
                    <p className="text-sm mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="mb-4">
                <h2 className="text-lg font-semibold border-b pb-1 mb-2">Education</h2>
                {resume.education.map((edu, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{edu.degree} - {edu.institution}</h3>
                      <span className="text-sm text-muted-foreground">{edu.year}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div>
                <h2 className="text-lg font-semibold border-b pb-1 mb-2">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {resume.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="pt-4 space-y-4">
            <div>
              <h3 className="text-md font-semibold mb-2">Resume Information</h3>
              <ul className="space-y-2">
                <li><span className="font-medium">Created:</span> {new Date(resume.created).toLocaleDateString()}</li>
                <li><span className="font-medium">Last Modified:</span> {new Date(resume.lastModified).toLocaleDateString()}</li>
                <li><span className="font-medium">File Format:</span> {resume.format}</li>
                <li><span className="font-medium">Word Count:</span> {resume.wordCount}</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-md font-semibold mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {resume.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-md font-semibold mb-2">Actions</h3>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">Edit Resume</Button>
                <Button size="sm" variant="outline">Download PDF</Button>
                <Button size="sm" variant="outline">Download DOCX</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          <Button>Use This Resume</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResumePreviewModal;
