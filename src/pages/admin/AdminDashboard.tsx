
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import {
  Download,
  FileText,
  Mail,
  Users,
  Percent,
  Activity,
  FileCheck,
  CalendarIcon,
  Search
} from 'lucide-react';

import {
  getSummaryMetrics,
  getTimeSeriesData,
  getDocTypeDistribution,
  getTopUsers,
  getActivityHeatmap,
  getJobSourceData,
  getDocumentLogs
} from '@/lib/dashboardData';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const AdminDashboard = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [documentType, setDocumentType] = useState('all');
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  });

  // Redirect if not admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  // Get dashboard data
  const summaryMetrics = getSummaryMetrics();
  const timeSeriesData = getTimeSeriesData();
  const docTypeDistribution = getDocTypeDistribution();
  const topUsers = getTopUsers();
  const activityHeatmap = getActivityHeatmap();
  const jobSourceData = getJobSourceData();
  const documentLogs = getDocumentLogs(50);

  // Filter logs based on search, document type, and date range
  const filteredLogs = documentLogs.filter(log => {
    const matchesSearch = 
      log.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = 
      documentType === 'all' || 
      (documentType === 'resume' && log.type === 'resume') ||
      (documentType === 'cover_letter' && log.type === 'cover_letter');
    
    const logDate = new Date(log.date);
    const matchesDateRange = 
      (!dateRange.from || logDate >= dateRange.from) &&
      (!dateRange.to || logDate <= dateRange.to);
    
    return matchesSearch && matchesType && matchesDateRange;
  });

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <FileText className="mr-2 h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Resumes</span>
              </div>
              <span className="text-2xl font-bold">{summaryMetrics.totalResumes}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Cover Letters</span>
              </div>
              <span className="text-2xl font-bold">{summaryMetrics.totalCoverLetters}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">User Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Unique Users</span>
              </div>
              <span className="text-2xl font-bold">{summaryMetrics.uniqueUsers}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Activity className="mr-2 h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Daily Active</span>
              </div>
              <span className="text-2xl font-bold">{summaryMetrics.dailyActiveUsers}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Percent className="mr-2 h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Avg. Customization</span>
              </div>
              <span className="text-2xl font-bold">{summaryMetrics.avgCustomizationPercentage}%</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <FileCheck className="mr-2 h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Top Template</span>
              </div>
              <span className="text-sm font-medium">{summaryMetrics.mostUsedTemplate}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Documents Generated (Last 30 Days)</CardTitle>
            <CardDescription>Daily resume and cover letter generation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return format(date, 'MMM dd');
                    }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="resumes" 
                    stroke="#0088FE" 
                    name="Resumes"
                    activeDot={{ r: 8 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="coverLetters" 
                    stroke="#00C49F" 
                    name="Cover Letters"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Document Distribution</CardTitle>
            <CardDescription>Resumes vs. Cover Letters</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={docTypeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {docTypeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Top 5 Users by Usage</CardTitle>
            <CardDescription>Users with most document generations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topUsers}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Documents Generated" fill="#8884d8">
                    {topUsers.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Job Source Distribution</CardTitle>
            <CardDescription>URL vs. Manual job descriptions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={jobSourceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="url" 
                    stackId="1" 
                    stroke="#8884d8" 
                    fill="#8884d8" 
                    name="URL Source"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="manual" 
                    stackId="1" 
                    stroke="#82ca9d" 
                    fill="#82ca9d" 
                    name="Manual Entry"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Document Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Document Generation Logs</CardTitle>
          <CardDescription>View and filter all resume and cover letter generations</CardDescription>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by email or job title"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={documentType} onValueChange={setDocumentType}>
              <SelectTrigger>
                <SelectValue placeholder="Document Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Documents</SelectItem>
                <SelectItem value="resume">Resumes Only</SelectItem>
                <SelectItem value="cover_letter">Cover Letters Only</SelectItem>
              </SelectContent>
            </Select>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  selected={{
                    from: dateRange.from,
                    to: dateRange.to
                  }}
                  onSelect={(range) => setDateRange({ 
                    from: range?.from, 
                    to: range?.to 
                  })}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
            
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setDocumentType('all');
              setDateRange({ from: undefined, to: undefined });
            }}>
              Clear Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Customization</TableHead>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No documents found matching your filters
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.userEmail}</TableCell>
                      <TableCell>{format(new Date(log.date), 'MMM dd, yyyy')}</TableCell>
                      <TableCell>
                        <span className="flex items-center">
                          {log.type === 'resume' ? (
                            <>
                              <FileText className="mr-1 h-4 w-4" />
                              Resume
                            </>
                          ) : (
                            <>
                              <Mail className="mr-1 h-4 w-4" />
                              Cover Letter
                            </>
                          )}
                        </span>
                      </TableCell>
                      <TableCell className="tabular-nums">
                        {log.customizationPercentage}%
                      </TableCell>
                      <TableCell>{log.jobTitle}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Download className="mr-1 h-4 w-4" /> Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
