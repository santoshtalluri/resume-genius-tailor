
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, FileText, Calendar, Building, ExternalLink } from 'lucide-react';
import { formatDistance } from 'date-fns';
import { Badge } from '@/components/ui/badge';

// Sample tailored resume data
const sampleTailoredResumes = [
  {
    id: '1',
    title: 'Software Engineer - TechCorp',
    company: 'TechCorp',
    baseResume: 'Software Engineer Resume',
    created: '2024-04-15T11:20:00Z',
    matchScore: 85,
    status: 'completed'
  },
  {
    id: '2',
    title: 'Product Manager - InnoTech',
    company: 'InnoTech Solutions',
    baseResume: 'Product Manager Resume',
    created: '2024-04-08T15:45:00Z',
    matchScore: 78,
    status: 'completed'
  },
  {
    id: '3',
    title: 'UX Designer - Creative Agency',
    company: 'Creative Agency Inc',
    baseResume: 'UX Designer Resume',
    created: '2024-04-02T09:30:00Z',
    matchScore: 92,
    status: 'completed'
  }
];

const TailoredResumesPage = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tailored Resumes</h2>
          <p className="text-muted-foreground">
            View and manage your job-specific tailored resumes
          </p>
        </div>
        <Link to="/tailored/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Tailored Resume
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleTailoredResumes.map((resume) => (
          <Card key={resume.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">{resume.title}</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Building className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  <span className="text-muted-foreground">{resume.company}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    <span>
                      {formatDistance(new Date(resume.created), new Date(), { addSuffix: true })}
                    </span>
                  </div>
                  
                  <Badge 
                    className={
                      resume.matchScore >= 90 ? "bg-green-100 text-green-800 hover:bg-green-100" : 
                      resume.matchScore >= 75 ? "bg-blue-100 text-blue-800 hover:bg-blue-100" : 
                      "bg-amber-100 text-amber-800 hover:bg-amber-100"
                    }
                    variant="outline"
                  >
                    {resume.matchScore}% Match
                  </Badge>
                </div>
                
                <div className="text-sm">
                  <span className="text-muted-foreground">Based on: </span>
                  <span className="font-medium">{resume.baseResume}</span>
                </div>
                
                <div className="pt-2 flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <FileText className="h-3.5 w-3.5 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <ExternalLink className="h-3.5 w-3.5 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TailoredResumesPage;
