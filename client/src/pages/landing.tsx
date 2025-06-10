import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-primary text-white p-2 rounded-lg">
                <i className="fas fa-home text-lg"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BlocNiti AI</h1>
                <p className="text-xs text-gray-600">Tenant Rights Platform</p>
              </div>
            </div>
            <Button onClick={handleLogin} className="bg-primary hover:bg-blue-700">
              <i className="fas fa-sign-in-alt mr-2"></i>
              Sign In
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Document Your Housing Issues with AI
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            BlocNiti AI helps NYC tenants document repair needs, understand legal rights, 
            and generate formal documentation to hold landlords accountable.
          </p>
        </div>

        {/* Welcome Section */}
        <div className="mb-8">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <div className="alma-bg p-3 rounded-full">
                  <i className="fas fa-robot text-primary text-xl"></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Meet Alma, Your AI Housing Rights Assistant
                  </h3>
                  <p className="text-gray-600 mb-4">
                    I'm here to help you document repair issues, understand your legal rights, 
                    and generate formal documentation for your landlord. Get started by signing in 
                    to create your secure tenant profile.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <i className="fas fa-shield-alt mr-1"></i>
                      Secure & Private
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <i className="fas fa-gavel mr-1"></i>
                      Legal Compliance
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      <i className="fas fa-microphone mr-1"></i>
                      Voice Recording
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <i className="fas fa-tools text-blue-600"></i>
                </div>
                <h4 className="font-semibold text-gray-900">Repair Documentation</h4>
              </div>
              <p className="text-gray-600 text-sm">
                Document issues room by room with AI-powered violation classification and deadline tracking.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <i className="fas fa-balance-scale text-green-600"></i>
                </div>
                <h4 className="font-semibold text-gray-900">Legal Rights</h4>
              </div>
              <p className="text-gray-600 text-sm">
                Understand HPD violation classes, deadlines, and your rights as a NYC tenant.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <i className="fas fa-file-pdf text-purple-600"></i>
                </div>
                <h4 className="font-semibold text-gray-900">Formal Reports</h4>
              </div>
              <p className="text-gray-600 text-sm">
                Generate professional PDF reports to submit to your landlord and housing authorities.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button 
            onClick={handleLogin} 
            size="lg" 
            className="bg-primary hover:bg-blue-700 text-lg px-8 py-3"
          >
            <i className="fas fa-rocket mr-2"></i>
            Get Started - Sign In with Replit
          </Button>
          <p className="text-gray-500 text-sm mt-4">
            Free for all NYC tenants. Your data is encrypted and secure.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-primary text-white p-2 rounded-lg">
                  <i className="fas fa-home"></i>
                </div>
                <span className="font-bold text-gray-900">BlocNiti AI</span>
              </div>
              <p className="text-gray-600 text-sm">
                Empowering NYC tenants with AI-driven documentation and legal awareness tools.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="https://www1.nyc.gov/site/hpd/index.page" target="_blank" rel="noopener noreferrer" className="hover:text-primary">HPD Resources</a></li>
                <li><a href="https://www.legalaidnyc.org/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">Legal Aid</a></li>
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Emergency Contacts</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><strong>311:</strong> City Services</li>
                <li><strong>911:</strong> Emergency</li>
                <li><strong>(212) 577-3300:</strong> Legal Aid</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-500">
            <p>&copy; 2024 BlocNiti AI. All rights reserved. Not a substitute for legal advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
