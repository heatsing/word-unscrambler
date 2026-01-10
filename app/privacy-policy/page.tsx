import type { Metadata } from "next"
import { Card } from "@/components/ui/card"
import { Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy | Word Unscrambler",
  description: "Privacy policy for Word Unscrambler. Learn how we protect your data and respect your privacy.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <Card className="p-8 prose prose-sm max-w-none">
          <div className="space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Introduction</h2>
              <p className="leading-relaxed">
                Welcome to Word Unscrambler. We respect your privacy and are committed to protecting your personal data.
                This privacy policy explains how we collect, use, and safeguard your information when you use our
                website and services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Information We Collect</h2>
              <p className="leading-relaxed mb-3">We may collect the following types of information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Usage Data:</strong> Information about how you use our website, including pages visited, time
                  spent, and interactions
                </li>
                <li>
                  <strong>Device Information:</strong> Browser type, IP address, device type, and operating system
                </li>
                <li>
                  <strong>Cookies:</strong> Small files stored on your device to improve user experience and analyze
                  usage
                </li>
                <li>
                  <strong>Search Queries:</strong> Words and letters you search for to provide better results
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">How We Use Your Information</h2>
              <p className="leading-relaxed mb-3">We use the collected information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and maintain our word unscrambler service</li>
                <li>Improve and optimize our website functionality</li>
                <li>Analyze usage patterns to enhance user experience</li>
                <li>Prevent fraud and ensure security</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Cookies and Tracking</h2>
              <p className="leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our website and store certain
                information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being
                sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Data Security</h2>
              <p className="leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal data against
                unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the
                internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Third-Party Services</h2>
              <p className="leading-relaxed">
                We may use third-party services for analytics and advertising. These third parties have their own
                privacy policies, and we encourage you to review them. We are not responsible for the privacy practices
                of these third-party services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Children's Privacy</h2>
              <p className="leading-relaxed">
                Our service is not directed to children under the age of 13. We do not knowingly collect personal
                information from children under 13. If you are a parent or guardian and believe your child has provided
                us with personal data, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Your Rights</h2>
              <p className="leading-relaxed mb-3">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Changes to This Policy</h2>
              <p className="leading-relaxed">
                We may update our privacy policy from time to time. We will notify you of any changes by posting the new
                privacy policy on this page and updating the "Last updated" date. We encourage you to review this
                privacy policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Contact Us</h2>
              <p className="leading-relaxed">
                If you have any questions about this privacy policy or our data practices, please contact us through our
                contact page or email us directly.
              </p>
            </section>
          </div>
        </Card>
      </div>
    </div>
  )
}
