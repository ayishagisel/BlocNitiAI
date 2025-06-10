import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LegalDashboard() {
  return (
    <div className="space-y-6">
      {/* Legal Resources Header */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Legal Awareness Dashboard
          </h3>
          <p className="text-gray-600">
            Understand your rights and the legal framework for housing violations in NYC.
          </p>
        </CardContent>
      </Card>

      {/* Violation Types Guide */}
      <Card>
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            HPD Violation Classes & Deadlines
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  A
                </div>
                <h5 className="font-semibold text-red-900">Class A - Immediate Hazard</h5>
              </div>
              <p className="text-sm text-red-800 mb-2">
                <strong>Deadline:</strong> 24-72 hours
              </p>
              <p className="text-sm text-red-700">
                Conditions that pose immediate danger to life, health, or safety.
              </p>
              <ul className="text-xs text-red-600 mt-2 space-y-1">
                <li>• No heat in winter</li>
                <li>• No hot water</li>
                <li>• Gas leaks</li>
                <li>• Exposed electrical wiring</li>
              </ul>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <div className="text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold status-priority">
                  B
                </div>
                <h5 className="font-semibold text-orange-900">Class B - Hazardous</h5>
              </div>
              <p className="text-sm text-orange-800 mb-2">
                <strong>Deadline:</strong> 30 days
              </p>
              <p className="text-sm text-orange-700">
                Conditions hazardous to health but not immediately dangerous.
              </p>
              <ul className="text-xs text-orange-600 mt-2 space-y-1">
                <li>• Defective windows</li>
                <li>• Peeling paint</li>
                <li>• Plumbing leaks</li>
                <li>• Inadequate lighting</li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <div className="text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold status-non-urgent">
                  C
                </div>
                <h5 className="font-semibold text-gray-900">Class C - Non-Hazardous</h5>
              </div>
              <p className="text-sm text-gray-800 mb-2">
                <strong>Deadline:</strong> 90 days
              </p>
              <p className="text-sm text-gray-700">
                Conditions that are not hazardous but affect quality of life.
              </p>
              <ul className="text-xs text-gray-600 mt-2 space-y-1">
                <li>• Cosmetic damage</li>
                <li>• Minor plumbing issues</li>
                <li>• Worn fixtures</li>
                <li>• Non-essential repairs</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Resources */}
      <Card>
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Important Resources</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a 
              href="https://www1.nyc.gov/site/hpd/index.page" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-primary text-white p-2 rounded-lg">
                  <i className="fas fa-building"></i>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900">HPD Online</h5>
                  <p className="text-sm text-gray-600">Official HPD portal</p>
                </div>
              </div>
            </a>

            <a 
              href="https://www1.nyc.gov/site/buildings/index.page" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-secondary text-white p-2 rounded-lg">
                  <i className="fas fa-search"></i>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900">DOB Violation Lookup</h5>
                  <p className="text-sm text-gray-600">Building violations database</p>
                </div>
              </div>
            </a>

            <a 
              href="https://www.legalaidnyc.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-purple-600 text-white p-2 rounded-lg">
                  <i className="fas fa-gavel"></i>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900">Legal Aid Society</h5>
                  <p className="text-sm text-gray-600">Free legal assistance</p>
                </div>
              </div>
            </a>
          </div>
        </CardContent>
      </Card>

      {/* PDF Viewer Section */}
      <Card>
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            HPD Violations Checklist
          </h4>
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <i className="fas fa-file-pdf text-4xl text-red-600 mb-4"></i>
            <p className="text-gray-600 mb-4">HPD Violations Reference Guide</p>
            <p className="text-sm text-gray-500 mb-4">
              Download the official HPD violations checklist to understand your rights and violation categories.
            </p>
            <Button className="bg-primary hover:bg-blue-700">
              <i className="fas fa-download mr-2"></i>
              Download PDF Guide
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card>
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contacts</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <i className="fas fa-phone-alt text-blue-600 text-2xl mb-2"></i>
              <h5 className="font-semibold text-blue-900">311</h5>
              <p className="text-sm text-blue-700">City Services & Complaints</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <i className="fas fa-ambulance text-red-600 text-2xl mb-2"></i>
              <h5 className="font-semibold text-red-900">911</h5>
              <p className="text-sm text-red-700">Emergency Services</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <i className="fas fa-balance-scale text-purple-600 text-2xl mb-2"></i>
              <h5 className="font-semibold text-purple-900">(212) 577-3300</h5>
              <p className="text-sm text-purple-700">Legal Aid Society</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
