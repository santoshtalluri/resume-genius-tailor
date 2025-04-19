
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, FileText, Calendar, Building } from 'lucide-react';
import { formatDistance } from 'date-fns';

// Sample cover letter data
const sampleCoverLetters = [
  {
    id: '1',
    title: 'Software Engineer - TechCorp',
    company: 'TechCorp',
    position: 'Software Engineer',
    created: '2024-04-10T14:25:00Z',
    lastModified: '2024-04-10T14:25:00Z'
  },
  {
    id: '2',
    title: 'Product Manager - InnoTech',
    company: 'InnoTech Solutions',
    position: 'Product Manager',
    created: '2024-04-05T09:30:00Z',
    lastModified: '2024-04-05T09:30:00Z'
  },
  {
    id: '3',
    title: 'UX Designer - Creative Agency',
    company: 'Creative Agency Inc',
    position: 'UX Designer',
    created: '2024-03-25T16:15:00Z',
    lastModified: '2024-03-25T16:15:00Z'
  }
];

const CoverLettersPage = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedCoverLetter, setSelectedCoverLetter] = useState(null);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Cover Letters</h2>
          <p className="text-muted-foreground">
            Manage and create professional cover letters
          </p>
        </div>
        <Link to="/tailored/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Cover Letter
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleCoverLetters.map((letter) => (
          <Card key={letter.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">{letter.title}</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Building className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  <span className="text-muted-foreground">{letter.company}</span>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>
                    Created{' '}
                    {formatDistance(new Date(letter.created), new Date(), { addSuffix: true })}
                  </span>
                </div>
                
                <div className="pt-2">
                  <Button size="sm" variant="outline" className="w-full">
                    View Cover Letter
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

export default CoverLettersPage;
