
import { User } from './types';

// Mock data generation helpers
const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomDate = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - getRandomInt(0, days));
  return date;
};

// Summary metrics data
export const getSummaryMetrics = () => {
  return {
    totalResumes: getRandomInt(1500, 3000),
    totalCoverLetters: getRandomInt(800, 1500),
    uniqueUsers: getRandomInt(200, 500),
    avgCustomizationPercentage: getRandomInt(65, 95),
    dailyActiveUsers: getRandomInt(50, 150),
    mostUsedTemplate: 'Professional Modern'
  };
};

// Time series data for charts
export const getTimeSeriesData = () => {
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    return {
      date: date.toISOString().split('T')[0],
      resumes: getRandomInt(20, 80),
      coverLetters: getRandomInt(10, 40)
    };
  }).reverse();
  
  return last30Days;
};

// Pie chart data
export const getDocTypeDistribution = () => {
  const resumes = getRandomInt(60, 70);
  
  return [
    { name: 'Resumes', value: resumes },
    { name: 'Cover Letters', value: 100 - resumes }
  ];
};

// Bar chart data for top users
export const getTopUsers = () => {
  return [
    { name: 'alex@example.com', value: getRandomInt(80, 100) },
    { name: 'jordan@example.com', value: getRandomInt(70, 90) },
    { name: 'morgan@example.com', value: getRandomInt(60, 80) },
    { name: 'jamie@example.com', value: getRandomInt(50, 70) },
    { name: 'taylor@example.com', value: getRandomInt(40, 60) },
  ];
};

// Heatmap data for activity by time of day
export const getActivityHeatmap = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  return days.map(day => {
    const dataPoint: Record<string, any> = { day };
    hours.forEach(hour => {
      dataPoint[`${hour}`] = getRandomInt(0, 20);
    });
    return dataPoint;
  });
};

// Job source data
export const getJobSourceData = () => {
  return [
    { date: '2025-01', manual: getRandomInt(30, 50), url: getRandomInt(50, 80) },
    { date: '2025-02', manual: getRandomInt(30, 50), url: getRandomInt(50, 80) },
    { date: '2025-03', manual: getRandomInt(30, 50), url: getRandomInt(60, 90) },
    { date: '2025-04', manual: getRandomInt(40, 60), url: getRandomInt(70, 100) },
  ];
};

// Table data for resume and cover letter logs
export const getDocumentLogs = (count: number = 50) => {
  const types = ['resume', 'cover_letter'];
  const jobTitles = [
    'Software Engineer', 
    'Product Manager', 
    'Data Scientist', 
    'UX Designer', 
    'Marketing Specialist',
    'Project Manager',
    'Business Analyst',
    'DevOps Engineer',
    'Content Writer',
    'Sales Representative'
  ];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `log-${i}`,
    userEmail: `user${getRandomInt(1, 20)}@example.com`,
    date: getRandomDate(60).toISOString(),
    type: types[getRandomInt(0, 1)],
    customizationPercentage: getRandomInt(60, 100),
    jobTitle: jobTitles[getRandomInt(0, jobTitles.length - 1)],
    downloadLink: `/download/doc-${i}`
  }));
};
