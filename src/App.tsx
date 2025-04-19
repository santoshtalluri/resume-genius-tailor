
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/admin/UserManagement";
import NewResume from "./pages/resumes/NewResume";
import NewJob from "./pages/jobs/NewJob";
import NewTailored from "./pages/tailored/NewTailored";
import NotFound from "./pages/NotFound";
import ResumesPage from "./pages/resumes/ResumesPage";
import JobsPage from "./pages/jobs/JobsPage";
import TailoredResumesPage from "./pages/tailored/TailoredResumesPage";
import CoverLettersPage from "./pages/coverletter/CoverLettersPage";
import SettingsPage from "./pages/SettingsPage";
import LogsPage from "./pages/LogsPage";

// Layout
import DashboardLayout from "./components/layout/DashboardLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/auth" element={<Auth />} />
            
            {/* Redirect from index to dashboard when authenticated */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* Protected Routes */}
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Resume Routes */}
              <Route path="/resumes" element={<ResumesPage />} />
              <Route path="/resumes/new" element={<NewResume />} />
              
              {/* Job Description Routes */}
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/jobs/new" element={<NewJob />} />
              
              {/* Tailored Resume Routes */}
              <Route path="/tailored" element={<TailoredResumesPage />} />
              <Route path="/tailored/new" element={<NewTailored />} />
              
              {/* Cover Letter Routes */}
              <Route path="/coverletters" element={<CoverLettersPage />} />
              
              {/* Admin Routes */}
              <Route path="/admin/users" element={<UserManagement />} />
              
              {/* Settings & Logs */}
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/logs" element={<LogsPage />} />
              
              {/* User Profile */}
              <Route path="/profile" element={<div>Profile Page</div>} />
            </Route>
            
            {/* Catch-all and 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
