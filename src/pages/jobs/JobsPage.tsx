
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Plus, Briefcase, Building, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { formatDistance } from 'date-fns';
import { sampleJobs } from '@/lib/sampleData';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { JobType } from '@/lib/types';

const JobsPage = () => {
  const [selectedJob, setSelectedJob] = useState<JobType | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleJobClick = (job: JobType) => {
    setSelectedJob(job);
    setDetailsOpen(true);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Job Descriptions</h2>
          <p className="text-muted-foreground">
            Manage job descriptions for tailoring your resumes
          </p>
        </div>
        <Link to="/jobs/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Job
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleJobs.map((job) => (
          <Card 
            key={job.id} 
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleJobClick(job)}
          >
            <CardHeader className="flex flex-col space-y-1.5 pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-semibold">{job.title}</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              </div>
              <CardDescription>{job.company}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  <span className="text-muted-foreground">{job.location}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Added {formatDistance(new Date(job.created), new Date(), { addSuffix: true })}
                  </span>
                </div>
                
                <div className="pt-2">
                  <p className="text-sm font-medium mb-2">Key Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {job.technicalSkills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {job.technicalSkills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{job.technicalSkills.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedJob && (
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">{selectedJob.title}</DialogTitle>
              <DialogDescription className="flex items-center">
                <Building className="h-4 w-4 mr-1" />
                {selectedJob.company} • {selectedJob.location}
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="skills">Skills Analysis</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4 pt-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-sm">{selectedJob.description}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Responsibilities</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedJob.responsibilities.map((item, index) => (
                      <li key={index} className="text-sm">{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center text-sm">
                  <span className="text-muted-foreground mr-2">Source: {selectedJob.source}</span>
                  {selectedJob.url && (
                    <a 
                      href={selectedJob.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="h-3.5 w-3.5 mr-1" />
                      View Original
                    </a>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="requirements" className="space-y-4 pt-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedJob.requirements.map((item, index) => (
                      <li key={index} className="text-sm">{item}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="skills" className="space-y-4 pt-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.technicalSkills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Functional Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.functionalSkills.map((skill, index) => (
                      <Badge key={index} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter className="flex items-center justify-between">
              <Button variant="outline" onClick={() => setDetailsOpen(false)}>Close</Button>
              <Link to="/tailored/new">
                <Button>Create Tailored Resume</Button>
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default JobsPage;
