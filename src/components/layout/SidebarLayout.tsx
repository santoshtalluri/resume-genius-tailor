
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Outlet } from 'react-router-dom';
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Home, FileText, Mail, Briefcase, Users, LayoutDashboard, Settings, File } from 'lucide-react';

const SidebarLayout = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const menuItems = [
    {
      group: 'Main',
      items: [
        { title: 'Dashboard', icon: Home, path: '/dashboard' },
      ]
    },
    {
      group: 'Documents',
      items: [
        { title: 'My Resumes', icon: FileText, path: '/resumes' },
        { title: 'Tailored Resumes', icon: File, path: '/tailored' },
        { title: 'Cover Letters', icon: Mail, path: '/coverletters' },
      ]
    },
    {
      group: 'Jobs',
      items: [
        { title: 'Job Listings', icon: Briefcase, path: '/jobs' },
      ]
    },
    {
      group: 'Admin',
      adminOnly: true,
      items: [
        { title: 'Users', icon: Users, path: '/admin/users' },
        { title: 'App Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
      ]
    },
    {
      group: 'Settings',
      items: [
        { title: 'Settings', icon: Settings, path: '/settings' },
      ]
    }
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarContent>
            {menuItems.map((group) => {
              // Skip admin groups for non-admin users
              if (group.adminOnly && !isAdmin) return null;
              
              return (
                <SidebarGroup key={group.group}>
                  <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton 
                          asChild
                          tooltip={item.title}
                        >
                          <Link 
                            to={item.path}
                            className={cn(
                              "w-full flex items-center"
                            )}
                          >
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroup>
              );
            })}
          </SidebarContent>
        </Sidebar>

        <main className="flex-1">
          <header className="sticky top-0 z-30 h-16 border-b bg-background px-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Resume Genius Tailor</h1>
          </header>
          <div className="p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default SidebarLayout;
