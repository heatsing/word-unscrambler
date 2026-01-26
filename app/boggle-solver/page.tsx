"use client"

import { BoggleBoard } from "@/components/boggle-board"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Grid3x3 } from "lucide-react"

export default function BoggleSolverPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <Grid3x3 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Boggle Solver</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Find all possible words in your Boggle board. Connect adjacent letters to discover hidden words and maximize your score.
          </p>
        </div>

        <div className="mb-12">
          <BoggleBoard />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Game Rules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <ul className="space-y-2 list-disc list-inside">
                <li>Standard Boggle uses a 4×4 grid of letter cubes</li>
                <li>Players have 3 minutes to find as many words as possible</li>
                <li>Words must be at least 3 letters long</li>
                <li>Letters must be adjacent (horizontally, vertically, or diagonally)</li>
                <li>Each letter cube can only be used once per word</li>
                <li>Longer words earn more points</li>
                <li>Only valid dictionary words count</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Boggle Strategies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <ul className="space-y-2 list-disc list-inside">
                <li><strong>Look for common prefixes:</strong> UN-, RE-, IN-, DE-</li>
                <li><strong>Find common suffixes:</strong> -ING, -ED, -ER, -LY</li>
                <li><strong>Scan for 3-letter words first:</strong> Quick points</li>
                <li><strong>Work outward from vowels:</strong> Most words need vowels</li>
                <li><strong>Look for Q+U combinations:</strong> Rare but valuable</li>
                <li><strong>Check all directions:</strong> Don't miss diagonal connections</li>
                <li><strong>Practice pattern recognition:</strong> Train your eye</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1">What is Boggle?</h3>
              <p className="text-sm text-muted-foreground">
                Boggle is a word game where players try to find as many words as possible from a grid of random letters.
                The classic game uses 16 letter cubes in a 4×4 grid, and players have 3 minutes to write down all the words they can find.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">How is Boggle scored?</h3>
              <p className="text-sm text-muted-foreground">
                In Boggle, longer words earn more points: 3-4 letter words = 1 point, 5 letters = 2 points, 6 letters = 3 points,
                7 letters = 5 points, and 8 or more letters = 11 points. Words shorter than 3 letters don't count.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Can letters be reused in Boggle?</h3>
              <p className="text-sm text-muted-foreground">
                No, each letter cube can only be used once per word. However, the same cube can be used in different words.
                You must form a continuous path through adjacent letters without revisiting any cube within a single word.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">What counts as adjacent in Boggle?</h3>
              <p className="text-sm text-muted-foreground">
                In Boggle, adjacent means any letter that touches the current letter horizontally, vertically, or diagonally.
                Each letter cube has up to 8 neighbors (fewer for edge and corner cubes).
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
