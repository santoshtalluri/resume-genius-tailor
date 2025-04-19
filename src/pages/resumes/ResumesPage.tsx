
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, FileText, Calendar } from 'lucide-react';
import { formatDistance } from 'date-fns';

const sampleResumes = [
  {
    id: '1',
    name: 'Software Engineer Resume',
    lastModified: '2024-03-15T10:00:00Z',
    skills: ['React', 'TypeScript', 'Node.js']
  },
  {
    id: '2',
    name: 'Product Manager Resume',
    lastModified: '2024-03-10T15:30:00Z',
    skills: ['Product Strategy', 'Agile', 'User Research']
  },
  {
    id: '3',
    name: 'UX Designer Resume',
    lastModified: '2024-03-05T09:15:00Z',
    skills: ['Figma', 'User Testing', 'UI Design']
  }
];

const ResumesPage = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Resumes</h2>
          <p className="text-muted-foreground">
            Manage and create your professional resumes
          </p>
        </div>
        <Link to="/resumes/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Resume
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleResumes.map((resume) => (
          <Card key={resume.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">{resume.name}</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <Calendar className="h-4 w-4 mr-2" />
                <span>
                  Last modified{' '}
                  {formatDistance(new Date(resume.lastModified), new Date(), { addSuffix: true })}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {resume.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ResumesPage;
