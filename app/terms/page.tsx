import type { Metadata } from "next"
import { Card } from "@/components/ui/card"
import { FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service | Word Unscrambler",
  description: "Terms of service for Word Unscrambler. Read our terms and conditions for using the service.",
}

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <Card className="p-8 prose prose-sm max-w-none">
          <div className="space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Agreement to Terms</h2>
              <p className="leading-relaxed">
                By accessing and using Word Unscrambler, you agree to be bound by these Terms of Service and all
                applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from
                using this site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Use License</h2>
              <p className="leading-relaxed mb-3">
                Permission is granted to temporarily use Word Unscrambler for personal, non-commercial purposes. This is
                the grant of a license, not a transfer of title. Under this license, you may not:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for commercial purposes</li>
                <li>Attempt to reverse engineer any software</li>
                <li>Remove any copyright or proprietary notations</li>
                <li>Transfer the materials to another person</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Disclaimer</h2>
              <p className="leading-relaxed">
                The materials on Word Unscrambler are provided "as is". We make no warranties, expressed or implied, and
                hereby disclaim all other warranties. We do not warrant that the materials will be accurate, reliable,
                or error-free.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Limitations</h2>
              <p className="leading-relaxed">
                Word Unscrambler and its suppliers will not be liable for any damages arising from the use or inability
                to use the materials on our website, even if we have been notified of the possibility of such damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Trademark Notice</h2>
              <p className="leading-relaxed">
                Scrabble® is a registered trademark of Hasbro, Inc. Words with Friends® is a registered trademark of
                Zynga Inc. Word Unscrambler is not affiliated with, endorsed by, or associated with these companies or
                their trademarks.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">User Conduct</h2>
              <p className="leading-relaxed mb-3">You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the service for any illegal purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with the proper functioning of the service</li>
                <li>Upload malicious code or viruses</li>
                <li>Scrape or copy content without permission</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Modifications</h2>
              <p className="leading-relaxed">
                We reserve the right to revise these terms of service at any time without notice. By continuing to use
                this website, you agree to be bound by the current version of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Governing Law</h2>
              <p className="leading-relaxed">
                These terms shall be governed by and construed in accordance with applicable laws, without regard to
                conflict of law provisions.
              </p>
            </section>
          </div>
        </Card>
      </div>
    </div>
  )
}
