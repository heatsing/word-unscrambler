import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Database, Shield, RefreshCw, Award } from 'lucide-react'

export interface DictionarySource {
  name: string
  abbreviation: string
  description: string
  wordCount?: string
  usage: string
}

export interface ScoringRule {
  value: number
  letters: string
  count: number
}

export interface DataTransparencyProps {
  /** Tool name (e.g., "Word Unscrambler", "Scrabble Solver") */
  toolName: string

  /** Dictionary sources used */
  dictionaries: DictionarySource[]

  /** Total word count */
  totalWords: string

  /** Scoring rules (for Scrabble/WWF) */
  scoringRules?: ScoringRule[]

  /** Validation rules description */
  validationRules: string[]

  /** Last update date */
  lastUpdated: string

  /** Update frequency */
  updateFrequency: string

  /** Optional custom sections */
  customSections?: React.ReactNode
}

export function DataTransparency({
  toolName,
  dictionaries,
  totalWords,
  scoringRules,
  validationRules,
  lastUpdated,
  updateFrequency,
  customSections,
}: DataTransparencyProps) {
  return (
    <section className="mt-16 border-t pt-12 space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">
          About Our Word Database
        </h2>
        <p className="text-muted-foreground">
          Technical details about our dictionary sources, validation process, and data quality standards.
        </p>
      </div>

      {/* Dictionary Sources */}
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          Dictionary Sources
        </h3>
        <p className="text-muted-foreground mb-4">
          {toolName} searches through a comprehensive database of{" "}
          <strong className="text-foreground">{totalWords} English words</strong>,
          compiled from multiple authoritative lexical sources:
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {dictionaries.map((dict) => (
            <Card key={dict.abbreviation}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold">
                    {dict.name}
                  </CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {dict.abbreviation}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="text-muted-foreground">{dict.description}</p>
                {dict.wordCount && (
                  <p className="text-xs">
                    <strong>{dict.wordCount}</strong> words
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  <strong>Usage:</strong> {dict.usage}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-4 p-4 bg-muted rounded-lg border">
          <p className="text-sm">
            <Shield className="inline h-4 w-4 mr-2 text-primary" />
            <strong>Privacy:</strong> All dictionaries are stored locally in your browser
            for instant, privacy-preserving lookups. No data is sent to external servers.
          </p>
        </div>
      </div>

      {/* Scoring System (if applicable) */}
      {scoringRules && (
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Official Scoring System
          </h3>
          <p className="text-muted-foreground mb-4">
            Letter point values follow official tournament rules:
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {scoringRules.map((rule) => (
              <div key={rule.value} className="border rounded-lg p-3">
                <div className="text-2xl font-bold text-primary mb-1">
                  {rule.value}
                </div>
                <div className="text-xs text-muted-foreground mb-2">
                  {rule.value === 1 ? 'point' : 'points'}
                </div>
                <div className="font-mono text-sm font-semibold">
                  {rule.letters}
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  {rule.count} {rule.count === 1 ? 'letter' : 'letters'}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-sm text-amber-900 dark:text-amber-100">
              <strong>Note:</strong> Base letter scores only. Board multipliers (Double Letter,
              Triple Word, etc.) and bonus points are not calculated as they depend on tile placement.
            </p>
          </div>
        </div>
      )}

      {/* Validation Rules */}
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Word Validation Process
        </h3>
        <p className="text-muted-foreground mb-4">
          Each result undergoes a multi-step validation to ensure accuracy:
        </p>

        <div className="space-y-3">
          {validationRules.map((rule, index) => (
            <div key={index} className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                {index + 1}
              </div>
              <p className="text-sm text-muted-foreground pt-0.5">{rule}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Data Quality & Updates */}
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <RefreshCw className="h-5 w-5 text-primary" />
          Data Quality & Maintenance
        </h3>

        <div className="bg-muted p-4 rounded-lg space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Last Updated:</span>
            <span className="font-medium">{lastUpdated}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Update Frequency:</span>
            <span className="font-medium">{updateFrequency}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Verification Method:</span>
            <span className="font-medium">Automated + Manual Review</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mt-4">
          Updates synchronize with official dictionary releases from Collins and Merriam-Webster.
          New words are validated against multiple authoritative sources before inclusion.
          Deprecated words are flagged for review.
        </p>
      </div>

      {/* Custom Sections */}
      {customSections}

      {/* Technical Implementation Note */}
      <div className="border-l-4 border-primary pl-4 py-2">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Technical Implementation:</strong> All word processing
          occurs client-side using Web Workers for non-blocking performance. Dictionary data is
          compressed using Brotli and loaded on-demand. No personal data is collected or transmitted.
        </p>
      </div>
    </section>
  )
}
