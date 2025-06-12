import { Route, Switch, useLocation } from "wouter";
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Classes, Drawer, Menu, MenuItem } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import './index.css';

import { useAuth } from './hooks/useAuth';
import UserRegistration from './components/user-registration';
import TenantDashboard from './components/tenant-dashboard';
import RepairReports from './components/repair-reports';
import LegalDashboard from './components/legal-dashboard';
import HarassmentReporting from './components/harassment-reporting';
import StakeholderDashboard from './components/stakeholder-dashboard';
import LandingPage from './pages/landing';
import Home from './pages/home';
import NotFound from './pages/not-found';

import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarTrigger,
  SidebarInset 
} from './components/ui/sidebar';
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "@/lib/queryClient";

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <img 
            src="./BlocNiti-LogoNB_1749709973044.png" 
            alt="BlocNiti AI" 
            style={{ 
              maxWidth: '120px', 
              height: 'auto'
            }} 
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/home">
                <span>Dashboard</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/repair-reports">
                <span>Repair Reports</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/legal-dashboard">
                <span>Legal Dashboard</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/harassment-reports">
                <span>Harassment Reports</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/stakeholder">
                <span>Analytics</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
    const [, setLocation] = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
      setLocation("/register");
    return <></>;
  }

  return <>{children}</>;
}

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  // Check if current route should show sidebar
  const [location] = useLocation();
  const publicRoutes = ['/', '/register'];
  const isPublicRoute = publicRoutes.includes(location);

  // Show public pages without sidebar for non-authenticated users
  if (!user && isPublicRoute) {
    return (
      <div className="h-screen w-full">
        <Switch>
          <Route path="/" component={LandingPage} />
          <Route path="/register" component={UserRegistration} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    );
  }

  // Redirect unauthenticated users to landing page
  if (!user) {
    return (
      <div className="h-screen w-full">
        <Switch>
          <Route path="/" component={LandingPage} />
          <Route path="*" component={LandingPage} />
        </Switch>
      </div>
    );
  }

  // Protected pages with sidebar for authenticated users
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
          </header>
          <div className="flex-1 overflow-auto">
            <Switch>
              <Route path="/dashboard" component={() => (
                  <ProtectedRoute>
                    <TenantDashboard />
                  </ProtectedRoute>
                )}
              />
              <Route path="/repair-reports" component={() => (
                  <ProtectedRoute>
                    <RepairReports />
                  </ProtectedRoute>
                )}
              />
              <Route path="/legal-dashboard" component={() => (
                  <ProtectedRoute>
                    <LegalDashboard />
                  </ProtectedRoute>
                )}
              />
              <Route path="/harassment-reports" component={() => (
                  <ProtectedRoute>
                    <HarassmentReporting />
                  </ProtectedRoute>
                )}
              />
              <Route path="/stakeholder" component={() => (
                  <ProtectedRoute>
                    <StakeholderDashboard />
                  </ProtectedRoute>
                )}
              />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
      <Toaster />
    </QueryClientProvider>
  );
}