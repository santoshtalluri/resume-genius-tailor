
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { UploadCloud, File, FileText } from 'lucide-react';

const ResumeUpload: React.FC = () => {
  const { toast } = useToast();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file type
      if (!file.name.endsWith('.pdf') && !file.name.endsWith('.docx')) {
        toast({
          variant: 'destructive',
          title: 'Invalid file format',
          description: 'Please upload a PDF or DOCX file.'
        });
        return;
      }
      
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: 'destructive',
          title: 'File too large',
          description: 'Maximum file size is 5MB.'
        });
        return;
      }
      
      setUploadedFile(file);
      toast({
        title: 'File uploaded',
        description: `${file.name} has been uploaded.`
      });
    }
  };
  
  const handleTextInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeText(e.target.value);
  };
  
  const handleSubmitFile = async () => {
    if (!uploadedFile) {
      toast({
        variant: 'destructive',
        title: 'No file selected',
        description: 'Please upload a resume file first.'
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Mock file processing - would be an API call in production
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: 'Resume processed',
        description: 'Your resume has been successfully uploaded and processed.'
      });
      
      // Here would redirect to the next step or update state
    } catch (error) {
      console.error('Error processing resume file:', error);
      toast({
        variant: 'destructive',
        title: 'Processing error',
        description: 'There was an error processing your resume file.'
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleSubmitText = async () => {
    if (!resumeText.trim()) {
      toast({
        variant: 'destructive',
        title: 'No content',
        description: 'Please enter your resume content first.'
      });
      return;
    }
    
    setIsParsing(true);
    
    try {
      // Mock text processing - would be an API call in production
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: 'Resume processed',
        description: 'Your resume content has been successfully processed.'
      });
      
      // Here would redirect to the next step or update state
    } catch (error) {
      console.error('Error processing resume text:', error);
      toast({
        variant: 'destructive',
        title: 'Processing error',
        description: 'There was an error processing your resume content.'
      });
    } finally {
      setIsParsing(false);
    }
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Upload Your Resume</CardTitle>
        <CardDescription>
          Upload your existing resume or paste its content to get started
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload File</TabsTrigger>
            <TabsTrigger value="paste">Paste Content</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
              <UploadCloud className="h-10 w-10 text-muted-foreground mb-4" />
              
              <p className="text-sm text-muted-foreground mb-2">
                Drag and drop your resume file, or click to browse
              </p>
              
              <p className="text-xs text-muted-foreground mb-4">
                Supported formats: PDF, DOCX (Max 5MB)
              </p>
              
              <label className="cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.docx"
                  onChange={handleFileUpload}
                />
                <Button variant="outline" type="button">
                  Browse Files
                </Button>
              </label>
            </div>
            
            {uploadedFile && (
              <div className="flex items-center gap-2 p-2 rounded bg-secondary">
                <File className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium flex-1 truncate">
                  {uploadedFile.name}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setUploadedFile(null)}
                >
                  Remove
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="paste" className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Paste your resume content below:
              </p>
              
              <Textarea
                placeholder="Paste your resume content here..."
                className="min-h-[300px]"
                value={resumeText}
                onChange={handleTextInput}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        
        <Tabs defaultValue="upload" className="hidden">
          <TabsContent value="upload">
            <Button 
              onClick={handleSubmitFile} 
              disabled={!uploadedFile || isUploading}
            >
              {isUploading ? 'Processing...' : 'Continue'}
            </Button>
          </TabsContent>
          
          <TabsContent value="paste">
            <Button 
              onClick={handleSubmitText} 
              disabled={!resumeText.trim() || isParsing}
            >
              {isParsing ? 'Processing...' : 'Continue'}
            </Button>
          </TabsContent>
        </Tabs>
        
        <Button 
          onClick={
            document.querySelector('[data-state="active"][value="upload"]') 
              ? handleSubmitFile 
              : handleSubmitText
          }
          disabled={
            (document.querySelector('[data-state="active"][value="upload"]') 
              ? !uploadedFile || isUploading
              : !resumeText.trim() || isParsing)
          }
        >
          {isUploading || isParsing ? 'Processing...' : 'Continue'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResumeUpload;
