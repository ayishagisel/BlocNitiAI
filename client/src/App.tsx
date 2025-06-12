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
    <Sidebar className="border-r border-gray-200">
      <SidebarContent className="pt-4">
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
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    setLocation("/");
    return null;
  }

  return <>{children}</>;
}

function AppContent() {
  const { user, loading } = useAuth();
  const [location] = useLocation();

  // Show loading state while auth is being determined
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const publicRoutes = ['/', '/register'];
  const isPublicRoute = publicRoutes.includes(location);

  // Show public pages without sidebar for non-authenticated users or public routes
  if (!user || isPublicRoute) {
    return (
      <div className="h-screen w-full">
        <Switch>
          <Route path="/" component={LandingPage} />
          <Route path="/register" component={UserRegistration} />
          <Route path="*" component={LandingPage} />
        </Switch>
      </div>
    );
  }

  // Protected pages with sidebar for authenticated users
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* Fixed Header with Logo and Toggle */}
        <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between h-full px-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="h-8 w-8" />
              <img 
                src="./BlocNiti-LogoNB_1749709973044.png" 
                alt="BlocNiti AI" 
                className="h-12 w-auto"
              />
            </div>
          </div>
        </div>
        
        <AppSidebar />
        <SidebarInset className="flex-1 mt-16">
          <div className="flex-1 overflow-auto p-6">
            <Switch>
              <Route path="/home" component={() => (
                  <ProtectedRoute>
                    <TenantDashboard />
                  </ProtectedRoute>
                )}
              />
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
              <Route path="*" component={TenantDashboard} />
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