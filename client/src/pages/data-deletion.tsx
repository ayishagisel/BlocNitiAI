
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function DataDeletion() {
  const [emailCopied, setEmailCopied] = useState(false);
  const [formCopied, setFormCopied] = useState(false);

  const handleEmailRequest = () => {
    const subject = encodeURIComponent("Data Deletion Request - BlocNiti AI");
    const body = encodeURIComponent(`Hello BlocNiti AI Team,

I would like to request the deletion of my personal data from your platform.

Account Information:
- Name: [Your Full Name]
- Email: [Your Email Address]
- Registration Date (if known): [Date]

Please confirm receipt of this request and let me know when the deletion has been completed.

Thank you,
[Your Name]`);
    
    const mailtoLink = `mailto:privacy@blocniti.ai?subject=${subject}&body=${body}`;
    
    try {
      window.open(mailtoLink);
    } catch (error) {
      // Fallback: copy email details to clipboard
      const emailText = `Email: privacy@blocniti.ai
Subject: Data Deletion Request - BlocNiti AI

Hello BlocNiti AI Team,

I would like to request the deletion of my personal data from your platform.

Account Information:
- Name: [Your Full Name]
- Email: [Your Email Address]
- Registration Date (if known): [Date]

Please confirm receipt of this request and let me know when the deletion has been completed.

Thank you,
[Your Name]`;
      
      navigator.clipboard.writeText(emailText).then(() => {
        setFormCopied(true);
        setTimeout(() => setFormCopied(false), 3000);
      }).catch(() => {
        alert('Please manually email privacy@blocniti.ai with subject "Data Deletion Request - BlocNiti AI"');
      });
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('privacy@blocniti.ai').then(() => {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 3000);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Delete Your Data</h1>
            
            {/* Meta-specific compliance notice */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-blue-800 font-medium">
                Facebook/Meta Data Deletion: This page allows users who logged in via Facebook to request deletion of all their data from BlocNiti AI.
              </p>
            </div>
            
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">How to Delete Your Data</h2>
                <p className="mb-4 text-lg">
                  To permanently delete all your personal data from BlocNiti AI, follow these simple steps:
                </p>
              </section>

              <section className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 1: Send Email Request</h3>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={handleEmailRequest} size="lg" className="bg-red-600 hover:bg-red-700">
                      🗑️ Delete My Data Now
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={copyEmail}
                      size="lg"
                    >
                      📋 {emailCopied ? 'Copied!' : 'Copy Email Address'}
                    </Button>
                  </div>
                  
                  {formCopied && (
                    <div className="bg-green-50 border border-green-200 rounded p-3">
                      <p className="text-green-800">✅ Email template copied to clipboard. Paste it into your email client.</p>
                    </div>
                  )}
                  
                  <div className="bg-gray-50 border rounded-lg p-4">
                    <p><strong>Email Address:</strong> <code className="bg-gray-200 px-2 py-1 rounded">privacy@blocniti.ai</code></p>
                    <p><strong>Subject:</strong> Data Deletion Request - BlocNiti AI</p>
                  </div>
                </div>
              </section>

              <section className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 2: Include This Information</h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="font-medium mb-2">Required Information:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Your full name</li>
                    <li>Email address used for your account</li>
                    <li>How you signed up (Facebook, Google, email, etc.)</li>
                    <li>Request: "Please delete all my personal data"</li>
                  </ul>
                </div>
              </section>

              <section className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">What Happens Next</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">1</span>
                    <p><strong>Immediate:</strong> We confirm receipt within 24 hours</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">2</span>
                    <p><strong>Within 7 days:</strong> Your account is deactivated</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">3</span>
                    <p><strong>Within 30 days:</strong> All your data is permanently deleted</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">✓</span>
                    <p><strong>Confirmation:</strong> We notify you when deletion is complete</p>
                  </div>
                </div>
              </section>

              <section className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Data That Will Be Deleted</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Personal Information:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Name, email, phone number</li>
                      <li>Profile photo and preferences</li>
                      <li>Login credentials and tokens</li>
                      <li>Social media authentication data</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Activity Data:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Repair issues and reports</li>
                      <li>Photos and voice recordings</li>
                      <li>AI analysis history</li>
                      <li>All user-generated content</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-red-800 mb-2">⚠️ Important Notice</h3>
                <ul className="text-red-700 space-y-2">
                  <li>• Data deletion is <strong>permanent and cannot be undone</strong></li>
                  <li>• You will lose access to all reports and documentation</li>
                  <li>• Save any important documents before requesting deletion</li>
                  <li>• This action affects data from all login methods (Facebook, Google, etc.)</li>
                </ul>
              </section>

              <section className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Support</h3>
                <p className="mb-2">
                  Questions about data deletion? Contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p><strong>Email:</strong> privacy@blocniti.ai</p>
                  <p><strong>Subject:</strong> Data Deletion Support</p>
                  <p><strong>Response Time:</strong> Within 24 hours</p>
                </div>
              </section>

              <section className="border-t pt-4">
                <p className="text-sm text-gray-600">
                  <strong>Compliance:</strong> This data deletion process complies with Facebook/Meta developer policies, 
                  GDPR, CCPA, and other applicable privacy regulations. Last updated: {new Date().toLocaleDateString()}
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
