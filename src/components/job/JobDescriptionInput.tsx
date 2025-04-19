import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { AlertCircle, Link, FileText, Loader2 } from 'lucide-react';

const sampleExtractedData = {
  title: "Senior Frontend Developer",
  company: "TechCorp Solutions",
  technicalSkills: [
    "React", "TypeScript", "GraphQL", "Next.js", "Testing (Jest, Cypress)",
    "CSS-in-JS", "Webpack", "Git"
  ],
  functionalSkills: [
    "Team Leadership", "Agile Methodologies", "Code Reviews",
    "Technical Documentation", "Mentoring", "Project Planning"
  ]
};

const JobDescriptionInput: React.FC = () => {
  const { toast } = useToast();
  const [jobUrl, setJobUrl] = useState('');
  const [jobText, setJobText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('url');
  const [extractedData, setExtractedData] = useState<typeof sampleExtractedData | null>(null);
  
  useEffect(() => {
    setError(null);
  }, [jobUrl, jobText]);
  
  const validateUrl = (url: string) => {
    if (!url) return false;
    
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  };
  
  const handleUrlSubmit = async () => {
    setError(null);
    
    if (!validateUrl(jobUrl)) {
      setError('Please enter a valid URL');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      setExtractedData(sampleExtractedData);
      
      toast({
        title: 'Job description extracted',
        description: 'Job details have been successfully extracted from the URL.'
      });
    } catch (error) {
      console.error('Error extracting job description:', error);
      toast({
        variant: 'destructive',
        title: 'Extraction error',
        description: 'There was an error extracting the job description from the URL.'
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleTextSubmit = async () => {
    setError(null);
    
    if (!jobText.trim() || jobText.length < 50) {
      setError('Please enter a valid job description (minimum 50 characters)');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setExtractedData(sampleExtractedData);
      
      toast({
        title: 'Job description processed',
        description: 'Your job description has been successfully processed.'
      });
    } catch (error) {
      console.error('Error processing job description:', error);
      toast({
        variant: 'destructive',
        title: 'Processing error',
        description: 'There was an error processing your job description.'
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleSubmit = () => {
    if (activeTab === 'url') {
      handleUrlSubmit();
    } else {
      handleTextSubmit();
    }
  };
  
  return (
    <div className="space-y-6">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Job Description</CardTitle>
          <CardDescription>
            Enter a job posting URL or paste the job description
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {error && (
            <div className="flex items-center p-3 mb-4 text-sm rounded bg-destructive/15 text-destructive gap-2">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}
          
          <Tabs 
            defaultValue="url" 
            className="w-full"
            onValueChange={value => setActiveTab(value)}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="url">Job URL</TabsTrigger>
              <TabsTrigger value="paste">Paste Description</TabsTrigger>
            </TabsList>
            
            <TabsContent value="url" className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Enter the URL of the job posting:
                </p>
                
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Link className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="https://example.com/job-posting"
                      className="pl-10"
                      value={jobUrl}
                      onChange={e => setJobUrl(e.target.value)}
                    />
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground">
                  We'll extract the job description, requirements, and company information.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="paste" className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Paste the complete job description:
                </p>
                
                <Textarea
                  placeholder="Paste the job description, including job title, company, requirements, and responsibilities..."
                  className="min-h-[300px]"
                  value={jobText}
                  onChange={e => setJobText(e.target.value)}
                />
                
                <p className="text-xs text-muted-foreground">
                  Include all sections of the job posting for best results.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          
          <Button onClick={handleSubmit} disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Analyze Job Description'
            )}
          </Button>
        </CardFooter>
      </Card>

      {extractedData && (
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>{extractedData.title}</CardTitle>
            <CardDescription>{extractedData.company}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {extractedData.technicalSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Functional Skills</h3>
              <div className="flex flex-wrap gap-2">
                {extractedData.functionalSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-md bg-secondary/50 px-2 py-1 text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JobDescriptionInput;
