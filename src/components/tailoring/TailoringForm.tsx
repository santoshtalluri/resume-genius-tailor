
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { AlertCircle, FileText, Briefcase, Loader2, Download } from 'lucide-react';

const TailoringForm: React.FC = () => {
  const { toast } = useToast();
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [selectedJobId, setSelectedJobId] = useState('');
  const [additionalInstructions, setAdditionalInstructions] = useState('');
  const [generateCoverLetter, setGenerateCoverLetter] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Mock data - would be fetched from API in production
  const resumes = [
    { id: '1', name: 'Software Developer Resume' },
    { id: '2', name: 'Marketing Resume' },
  ];
  
  const jobs = [
    { id: '1', title: 'Senior Software Engineer at Tech Corp' },
    { id: '2', title: 'Frontend Developer at Startup Inc.' },
  ];
  
  const handleGenerate = async () => {
    setError(null);
    
    if (!selectedResumeId) {
      setError('Please select a resume');
      return;
    }
    
    if (!selectedJobId) {
      setError('Please select a job description');
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // Mock generation process - would be an API call in production
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      setIsGenerated(true);
      
      toast({
        title: 'Documents generated',
        description: 'Your tailored resume and cover letter have been successfully generated.'
      });
    } catch (error) {
      console.error('Error generating documents:', error);
      toast({
        variant: 'destructive',
        title: 'Generation error',
        description: 'There was an error generating your documents.'
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleDownload = () => {
    toast({
      title: 'Documents downloaded',
      description: 'Your tailored resume and cover letter have been downloaded.'
    });
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Create Tailored Application Materials</CardTitle>
        <CardDescription>
          Generate a custom resume and cover letter optimized for a specific job
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {error && (
          <div className="flex items-center p-3 text-sm rounded bg-destructive/15 text-destructive gap-2">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="resume-select">Select Resume</Label>
          <Select 
            value={selectedResumeId} 
            onValueChange={setSelectedResumeId}
            disabled={isGenerating}
          >
            <SelectTrigger id="resume-select" className="w-full">
              <SelectValue placeholder="Select a resume" />
            </SelectTrigger>
            <SelectContent>
              {resumes.map(resume => (
                <SelectItem key={resume.id} value={resume.id}>
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    {resume.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {!resumes.length && (
            <p className="text-xs text-muted-foreground mt-1">
              No resumes found. Please <a href="/resumes/new" className="text-primary underline">upload a resume</a> first.
            </p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="job-select">Select Job Description</Label>
          <Select 
            value={selectedJobId} 
            onValueChange={setSelectedJobId}
            disabled={isGenerating}
          >
            <SelectTrigger id="job-select" className="w-full">
              <SelectValue placeholder="Select a job description" />
            </SelectTrigger>
            <SelectContent>
              {jobs.map(job => (
                <SelectItem key={job.id} value={job.id}>
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-2" />
                    {job.title}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {!jobs.length && (
            <p className="text-xs text-muted-foreground mt-1">
              No job descriptions found. Please <a href="/jobs/new" className="text-primary underline">add a job description</a> first.
            </p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="instructions">Additional Instructions (Optional)</Label>
          <Textarea
            id="instructions"
            placeholder="Add any specific instructions for tailoring your resume..."
            value={additionalInstructions}
            onChange={e => setAdditionalInstructions(e.target.value)}
            disabled={isGenerating}
            className="min-h-[100px]"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="cover-letter"
            checked={generateCoverLetter}
            onCheckedChange={setGenerateCoverLetter}
            disabled={isGenerating}
          />
          <Label htmlFor="cover-letter">Generate Cover Letter</Label>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline" disabled={isGenerating}>
          Cancel
        </Button>
        
        {isGenerated ? (
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download Documents
          </Button>
        ) : (
          <Button onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Tailored Documents'
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default TailoringForm;
