
import { 
  Home, 
  FileText, 
  Briefcase, 
  Users, 
  Settings, 
  Mail, 
  File, 
  BarChart 
} from 'lucide-react';

export const navigationItems = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: Home
  },
  {
    label: 'My Resumes',
    path: '/resumes',
    icon: FileText
  },
  {
    label: 'Job Listings',
    path: '/jobs',
    icon: Briefcase
  },
  {
    label: 'Tailored Resumes',
    path: '/tailored',
    icon: File
  },
  {
    label: 'Cover Letters',
    path: '/coverletters',
    icon: Mail
  },
  {
    label: 'System Logs',
    path: '/logs',
    icon: BarChart
  },
  {
    label: 'Users',
    path: '/admin/users',
    icon: Users,
    adminOnly: true
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: Settings
  }
];
