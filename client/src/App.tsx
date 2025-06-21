import { Route, Switch, useLocation } from "wouter";
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Classes, Drawer, Menu, MenuItem } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import './index.css';

import { useAuth } from "@/hooks/useAuth";
import { useProfileCompleteness } from "@/hooks/useProfileCompleteness";
import UserRegistration from './components/user-registration';
import TenantDashboard from './components/tenant-dashboard';
import RepairReports from './components/repair-reports';
import LegalDashboard from './components/legal-dashboard';
import HarassmentReporting from './components/harassment-reporting';
import StakeholderDashboard from './components/stakeholder-dashboard';
import LandingPage from './pages/landing';
import Home from './pages/home';
import NotFound from './pages/not-found';
import TenantRegistration from './pages/tenant-registration';
import StakeholderRegistration from './pages/stakeholder-registration';
import LoginPage from './pages/login';
import PrivacyPolicy from "./pages/privacy-policy";
import TermsOfService from "./pages/terms-of-service";
import DataDeletion from "./pages/data-deletion";

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
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

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
  const { user, isLoading } = useAuth();
  const [location, setLocation] = useLocation();
  const { isComplete, loading: profileLoading } = useProfileCompleteness(user);

  if (isLoading || profileLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <>{children}</>;
  }

  // If user is authenticated but profile is incomplete, redirect to profile page
  // unless they're already on the profile page
  if (user && isComplete === false && location !== '/profile') {
    setLocation('/profile');
    return <div>Redirecting to complete profile...</div>;
  }

  return <>{children}</>;
}

function UserProfileDropdown() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleEditProfile = () => {
    setLocation('/profile');
  };

  if (!user) return null;

  const initials = `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.profileImageUrl} alt={user.firstName} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.firstName} {user.lastName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleEditProfile}>
          <i className="fas fa-user mr-2 h-4 w-4"></i>
          <span>Edit Profile</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <i className="fas fa-sign-out-alt mr-2 h-4 w-4"></i>
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
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

  const publicRoutes = ['/', '/register', '/register/tenant', '/register/stakeholder'];
  const isPublicRoute = publicRoutes.includes(location);

  // Check if current route is a registration page
  const isRegistrationPage = location === "/register/tenant" || location === "/register/stakeholder";

  // If it's a registration page and user is not authenticated, redirect to login
  if (isRegistrationPage && !user) {
    return (
      <div className="h-screen w-full">
        <LoginPage />
      </div>
    );
  }

  // If it's a registration page and user is authenticated, render without sidebar
  if (isRegistrationPage && user) {
    return (
      <div className="min-h-screen">
        <Switch>
          <Route path="/register/tenant" component={TenantRegistration} />
          <Route path="/register/stakeholder" component={StakeholderRegistration} />
        </Switch>
        <Toaster />
      </div>
    );
  }

  // Show public pages without sidebar for non-authenticated users or public routes
  if (!user || isPublicRoute) {
    return (
      <div className="h-screen w-full">
        <Switch>
          <Route path="/" component={LandingPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={UserRegistration} />
          <Route path="*" component={LandingPage} />
        </Switch>
      </div>
    );
  }

  // Placeholder for ProfileIncompleteBanner (implementation not provided)
  const ProfileIncompleteBanner = () => {
    return null;
  };

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
                src="/BlocNiti-LogoNB_1749709973044.png" 
                alt="BlocNiti AI" 
                className="h-12 w-auto"
              />
            </div>
            <UserProfileDropdown />
          </div>
        </div>

        <AppSidebar />
        <SidebarInset className="flex-1 mt-16">
          <div className="flex-1 overflow-auto p-6">
            <ProfileIncompleteBanner />
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
              <Route path="/profile" component={() => (
                  <ProtectedRoute>
                    <UserRegistration />
                  </ProtectedRoute>
                )}
              />
              <Route
                path="/tenant-registration"
                render={() => (
                  <ProtectedRoute>
                    <TenantRegistration />
                  </ProtectedRoute>
                )}
              />
              <Route
                path="/stakeholder-registration"
                render={() => (
                  <ProtectedRoute>
                    <StakeholderRegistration />
                  </ProtectedRoute>
                )}
              />
              <Route path="/privacy-policy" component={PrivacyPolicy} />
              <Route path="/terms-of-service" component={TermsOfService} />
              <Route path="/data-deletion" component={DataDeletion} />
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