
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DataDeletion() {
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
    
    window.location.href = `mailto:privacy@blocniti.ai?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Data Deletion Instructions</h1>
            
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">How to Request Data Deletion</h2>
                <p className="mb-4">
                  If you would like to delete your personal data from BlocNiti AI, you can submit a request using one of the methods below. 
                  We are committed to processing your request within 30 days.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Method 1: Email Request (Recommended)</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="mb-3">Click the button below to send a pre-formatted email request:</p>
                  <Button onClick={handleEmailRequest} className="mb-3">
                    Send Data Deletion Request Email
                  </Button>
                  <p className="text-sm text-gray-600">
                    This will open your default email client with a pre-formatted message.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Method 2: Manual Email</h2>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                  <p className="mb-2"><strong>Email:</strong> privacy@blocniti.ai</p>
                  <p className="mb-2"><strong>Subject:</strong> Data Deletion Request - BlocNiti AI</p>
                  <p className="mb-3"><strong>Required Information:</strong></p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Your full name</li>
                    <li>Email address associated with your account</li>
                    <li>Registration date (if known)</li>
                    <li>Any additional account identifiers</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">What Data Will Be Deleted</h2>
                <p className="mb-3">When you request data deletion, we will remove:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Your personal profile information (name, email, phone, address)</li>
                  <li>Housing information and tenant details</li>
                  <li>All repair issues and documentation you've submitted</li>
                  <li>Harassment reports and incident documentation</li>
                  <li>Photos and voice recordings you've uploaded</li>
                  <li>AI analysis history and interactions</li>
                  <li>Account preferences and settings</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Data That May Be Retained</h2>
                <p className="mb-3">Some data may be retained for legal or business purposes:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Transaction records (if applicable) for financial compliance</li>
                  <li>Anonymized usage analytics (with no personal identifiers)</li>
                  <li>Data required by law to be retained</li>
                  <li>Information necessary for ongoing legal proceedings</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Processing Timeline</h2>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <ol className="list-decimal pl-6 space-y-2">
                    <li><strong>Request Received:</strong> We will acknowledge your request within 48 hours</li>
                    <li><strong>Identity Verification:</strong> We may contact you to verify your identity (2-5 business days)</li>
                    <li><strong>Data Deletion:</strong> Complete removal of your data from our systems (within 30 days)</li>
                    <li><strong>Confirmation:</strong> We will notify you when the deletion is complete</li>
                  </ol>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Important Notes</h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Account Access:</strong> Once deleted, you will not be able to recover your account or data</li>
                    <li><strong>Backup Systems:</strong> It may take up to 90 days for data to be completely removed from backup systems</li>
                    <li><strong>Third-Party Services:</strong> If you logged in through Facebook, Google, or other services, you may need to revoke access separately</li>
                    <li><strong>Legal Documents:</strong> Any formal documents generated through our platform should be saved separately before deletion</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Questions or Issues</h2>
                <p>
                  If you encounter any problems with your data deletion request or have questions about the process, 
                  please contact our privacy team at privacy@blocniti.ai with "Data Deletion Support" in the subject line.
                </p>
              </section>

              <section className="border-t pt-6">
                <p className="text-sm text-gray-600">
                  This page fulfills the data deletion requirements for Facebook Login integration and complies with 
                  applicable data protection regulations including GDPR and CCPA.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
