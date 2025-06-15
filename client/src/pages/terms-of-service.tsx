
import { Card, CardContent } from "@/components/ui/card";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
            <p className="text-sm text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
            
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using BlocNiti AI, you accept and agree to be bound by the terms and provision of this agreement. 
                  If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Description of Service</h2>
                <p className="mb-3">
                  BlocNiti AI is a tenant rights documentation platform that provides:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>AI-powered repair issue classification using HPD violation standards</li>
                  <li>Legal rights education with deadline tracking</li>
                  <li>Formal documentation generation for tenant-landlord communications</li>
                  <li>Harassment incident reporting with detailed tracking</li>
                  <li>Room-by-room issue documentation with status management</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">3. User Account and Registration</h2>
                <p className="mb-3">
                  To access certain features of our service, you must register for an account. You agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate, current, and complete information during registration</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Maintain the security of your password and account</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Acceptable Use</h2>
                <p className="mb-3">You agree to use BlocNiti AI only for lawful purposes and in accordance with these Terms. You agree NOT to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Submit false, misleading, or fraudulent information</li>
                  <li>Use the service to harass, abuse, or harm others</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Upload malicious software or content</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Use the service for any commercial purpose without authorization</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">5. AI Services and Content</h2>
                <p className="mb-3">
                  Our AI assistant "Alma" provides analysis and guidance based on NYC housing law. Please note:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>AI analysis is for informational purposes and should not replace legal advice</li>
                  <li>We strive for accuracy but cannot guarantee the completeness of AI responses</li>
                  <li>Users should verify information with qualified legal professionals</li>
                  <li>BlocNiti AI is not responsible for actions taken based solely on AI recommendations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">6. User Content and Data</h2>
                <p className="mb-3">
                  You retain ownership of content you submit to BlocNiti AI. By submitting content, you grant us:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>A license to store, process, and display your content as necessary to provide our services</li>
                  <li>The right to use aggregated, anonymized data to improve our services</li>
                  <li>The right to remove content that violates these terms</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Privacy and Data Protection</h2>
                <p>
                  Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, 
                  which is incorporated into these Terms by reference.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Service Availability</h2>
                <p>
                  We strive to maintain service availability but cannot guarantee uninterrupted access. 
                  We reserve the right to modify, suspend, or discontinue the service with reasonable notice.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Limitation of Liability</h2>
                <p>
                  BlocNiti AI is provided "as is" without warranties of any kind. We shall not be liable for any 
                  indirect, incidental, special, consequential, or punitive damages arising from your use of the service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Indemnification</h2>
                <p>
                  You agree to indemnify and hold harmless BlocNiti AI from any claims, damages, or expenses 
                  arising from your use of the service or violation of these terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Termination</h2>
                <p className="mb-3">
                  We may terminate or suspend your account at any time for violations of these terms. 
                  You may terminate your account by contacting us. Upon termination:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your right to use the service will cease immediately</li>
                  <li>We may delete your account and data as outlined in our Privacy Policy</li>
                  <li>Sections of these terms that should survive termination will remain in effect</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these terms at any time. Material changes will be communicated 
                  through our service or via email. Continued use after changes constitutes acceptance of new terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">13. Governing Law</h2>
                <p>
                  These terms are governed by the laws of New York State, without regard to conflict of law principles. 
                  Any disputes shall be resolved in the courts of New York.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">14. Contact Information</h2>
                <p>
                  For questions about these Terms of Service, please contact us at:
                </p>
                <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                  <p><strong>Email:</strong> legal@blocniti.ai</p>
                  <p><strong>Subject:</strong> Terms of Service Inquiry</p>
                </div>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
