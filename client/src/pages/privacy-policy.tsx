
import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
            <p className="text-sm text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
            
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
                <p className="mb-3">
                  BlocNiti AI collects information to provide better services to our users. We collect information in the following ways:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Information you provide:</strong> When you register for BlocNiti AI, we collect personal information such as your name, email address, phone number, and housing information.</li>
                  <li><strong>Information from social media:</strong> When you sign in through Facebook, Google, or other social media platforms, we may receive basic profile information.</li>
                  <li><strong>Usage information:</strong> We collect information about how you use our service, including repair issues documented and harassment reports filed.</li>
                  <li><strong>Device information:</strong> We may collect device-specific information such as your browser type and IP address.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Information</h2>
                <p className="mb-3">We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Help you document housing issues and understand your tenant rights</li>
                  <li>Generate formal documentation for legal purposes</li>
                  <li>Provide AI-powered analysis of repair issues using our "Alma" assistant</li>
                  <li>Communicate with you about service updates and tenant rights information</li>
                  <li>Ensure the security and integrity of our service</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Information Sharing</h2>
                <p className="mb-3">
                  We do not sell, trade, or otherwise transfer your personal information to third parties, except:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations or court orders</li>
                  <li>To protect our rights, property, or safety, or that of our users</li>
                  <li>In connection with a merger, acquisition, or sale of assets (with notice to users)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Data Security</h2>
                <p>
                  We implement appropriate security measures to protect your personal information against unauthorized access, 
                  alteration, disclosure, or destruction. This includes encryption of data in transit and at rest, 
                  secure authentication methods, and regular security assessments.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Data Retention</h2>
                <p>
                  We retain your personal information for as long as necessary to provide our services and as required by law. 
                  You may request deletion of your account and associated data at any time by contacting us.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Your Rights</h2>
                <p className="mb-3">You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt out of certain communications</li>
                  <li>Request a copy of your data</li>
                  <li>File a complaint with relevant data protection authorities</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Data Deletion</h2>
                <p className="mb-3">
                  To request deletion of your data from BlocNiti AI:
                </p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Email us at privacy@blocniti.ai with "Data Deletion Request" in the subject line</li>
                  <li>Include your full name and email address associated with your account</li>
                  <li>We will confirm your identity and process your request within 30 days</li>
                  <li>Some data may be retained as required by law or for legitimate business purposes</li>
                </ol>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Children's Privacy</h2>
                <p>
                  Our service is not intended for children under 13 years of age. We do not knowingly collect 
                  personal information from children under 13.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Changes to Privacy Policy</h2>
                <p>
                  We may update this privacy policy from time to time. We will notify you of any material changes 
                  by posting the new privacy policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Contact Us</h2>
                <p>
                  If you have questions about this Privacy Policy, please contact us at:
                </p>
                <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                  <p><strong>Email:</strong> privacy@blocniti.ai</p>
                  <p><strong>Subject:</strong> Privacy Policy Inquiry</p>
                </div>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
