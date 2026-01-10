import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us | Word Unscrambler",
  description: "Get in touch with the Word Unscrambler team. We'd love to hear your feedback and suggestions.",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground">Have a question or suggestion? We'd love to hear from you.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="text-sm font-medium mb-2 block">
                  Name
                </label>
                <Input id="name" type="text" placeholder="Your name" />
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-medium mb-2 block">
                  Email
                </label>
                <Input id="email" type="email" placeholder="your.email@example.com" />
              </div>

              <div>
                <label htmlFor="subject" className="text-sm font-medium mb-2 block">
                  Subject
                </label>
                <Input id="subject" type="text" placeholder="What is this about?" />
              </div>

              <div>
                <label htmlFor="message" className="text-sm font-medium mb-2 block">
                  Message
                </label>
                <Textarea id="message" placeholder="Your message here..." rows={6} />
              </div>

              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">Other ways to reach us:</h3>
            <p className="text-sm text-muted-foreground">
              For bug reports, feature requests, or general inquiries, you can also reach us through our social media
              channels or email us directly at support@wordunscrambler.com
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
