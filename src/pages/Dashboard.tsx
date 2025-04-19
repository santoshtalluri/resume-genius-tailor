
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Upload, Briefcase, Plus, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Mock data - would be fetched from API in production
  const resumeCount = 0;
  const jobDescriptionCount = 0;
  const tailoredResumeCount = 0;

  const handleNavigateWithCheck = (path: string, requiredCount: number, requiredItem: string) => {
    if (requiredCount === 0) {
      toast.error(`You need to add at least one ${requiredItem} first`);
      return;
    }
    navigate(path);
  };
  
  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-6">
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user?.username}</h2>
            <p className="text-muted-foreground">
              Create, manage, and tailor your resumes for specific job applications
            </p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">My Resumes</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{resumeCount}</div>
                <p className="text-xs text-muted-foreground">
                  Base resumes available for tailoring
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/resumes')}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  View Resumes
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Job Descriptions</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{jobDescriptionCount}</div>
                <p className="text-xs text-muted-foreground">
                  Stored job postings for applications
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/jobs')}
                >
                  <Briefcase className="mr-2 h-4 w-4" />
                  View Jobs
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Tailored Resumes</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tailoredResumeCount}</div>
                <p className="text-xs text-muted-foreground">
                  Optimized for specific job applications
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/tailored')}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  View Tailored Resumes
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
        
        <section className="mt-6">
          <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button 
              variant="default" 
              className="justify-start h-auto py-4"
              onClick={() => navigate('/resumes/new')}
            >
              <Upload className="mr-2 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Upload Resume</div>
                <div className="text-xs text-primary-foreground/70">Add a new base resume</div>
              </div>
            </Button>
            
            <Button 
              variant="default" 
              className="justify-start h-auto py-4"
              onClick={() => navigate('/jobs/new')}
            >
              <Plus className="mr-2 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Add Job Description</div>
                <div className="text-xs text-primary-foreground/70">From URL or text</div>
              </div>
            </Button>
            
            <Button 
              variant="default" 
              className={`justify-start h-auto py-4 ${(resumeCount === 0 || jobDescriptionCount === 0) ? 'opacity-70' : ''}`}
              onClick={() => {
                if (resumeCount === 0 || jobDescriptionCount === 0) {
                  toast.error('You need both a resume and job description to create a tailored resume');
                } else {
                  navigate('/tailored/new');
                }
              }}
            >
              {(resumeCount === 0 || jobDescriptionCount === 0) && (
                <Lock className="absolute top-2 right-2 h-4 w-4 text-primary-foreground/70" />
              )}
              <FileText className="mr-2 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Create Tailored Resume</div>
                <div className="text-xs text-primary-foreground/70">
                  {(resumeCount === 0 || jobDescriptionCount === 0) 
                    ? "Requires resume and job description" 
                    : "Optimize for a specific job"}
                </div>
              </div>
            </Button>
            
            {user?.role === 'admin' && (
              <Button 
                variant="default" 
                className="justify-start h-auto py-4"
                onClick={() => navigate('/admin/users')}
              >
                <Plus className="mr-2 h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Manage Users</div>
                  <div className="text-xs text-primary-foreground/70">Admin controls</div>
                </div>
              </Button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
