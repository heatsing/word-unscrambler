// Local dictionary fallback for offline support and common words
// Contains ~500 most common/useful words with simplified definitions

export interface LocalDefinition {
  word: string
  phonetic?: string
  meanings: Array<{
    partOfSpeech: string
    definitions: Array<{
      definition: string
      example?: string
    }>
  }>
}

// Local dictionary database
export const LOCAL_DICTIONARY: Record<string, LocalDefinition> = {
  // Common 3-letter words
  "the": {
    word: "the",
    phonetic: "/ðə/",
    meanings: [{
      partOfSpeech: "article",
      definitions: [{ definition: "Denoting one or more people or things already mentioned or assumed to be common knowledge" }]
    }]
  },
  "and": {
    word: "and",
    phonetic: "/ænd/",
    meanings: [{
      partOfSpeech: "conjunction",
      definitions: [{ definition: "Used to connect words, clauses, or sentences" }]
    }]
  },
  "for": {
    word: "for",
    phonetic: "/fɔːr/",
    meanings: [{
      partOfSpeech: "preposition",
      definitions: [{ definition: "In support of or in favor of", example: "Are you for or against the proposal?" }]
    }]
  },
  "are": {
    word: "are",
    phonetic: "/ɑːr/",
    meanings: [{
      partOfSpeech: "verb",
      definitions: [{ definition: "Second person singular present and first, second, third person plural present of be" }]
    }]
  },
  "but": {
    word: "but",
    phonetic: "/bʌt/",
    meanings: [{
      partOfSpeech: "conjunction",
      definitions: [{ definition: "Used to introduce something contrasting with what has already been mentioned", example: "He tried but failed" }]
    }]
  },
  "not": {
    word: "not",
    phonetic: "/nɒt/",
    meanings: [{
      partOfSpeech: "adverb",
      definitions: [{ definition: "Used to express negation, denial, refusal, or prohibition" }]
    }]
  },
  "you": {
    word: "you",
    phonetic: "/juː/",
    meanings: [{
      partOfSpeech: "pronoun",
      definitions: [{ definition: "Used to refer to the person or people that the speaker is addressing" }]
    }]
  },
  "all": {
    word: "all",
    phonetic: "/ɔːl/",
    meanings: [{
      partOfSpeech: "determiner",
      definitions: [{ definition: "Used to refer to the whole quantity or extent of a particular group or thing", example: "All the people I met" }]
    }]
  },
  "can": {
    word: "can",
    phonetic: "/kæn/",
    meanings: [{
      partOfSpeech: "verb",
      definitions: [{ definition: "Be able to", example: "I can run fast" }]
    }]
  },
  "had": {
    word: "had",
    phonetic: "/hæd/",
    meanings: [{
      partOfSpeech: "verb",
      definitions: [{ definition: "Past tense of have" }]
    }]
  },
  "her": {
    word: "her",
    phonetic: "/hɜːr/",
    meanings: [{
      partOfSpeech: "pronoun",
      definitions: [{ definition: "Used as the object of a verb or preposition to refer to a female person or animal" }]
    }]
  },
  "was": {
    word: "was",
    phonetic: "/wɒz/",
    meanings: [{
      partOfSpeech: "verb",
      definitions: [{ definition: "First and third person singular past of be" }]
    }]
  },
  "one": {
    word: "one",
    phonetic: "/wʌn/",
    meanings: [{
      partOfSpeech: "number",
      definitions: [{ definition: "The lowest cardinal number; half of two" }]
    }]
  },
  "our": {
    word: "our",
    phonetic: "/aʊər/",
    meanings: [{
      partOfSpeech: "determiner",
      definitions: [{ definition: "Belonging to or associated with the speaker and one or more other people" }]
    }]
  },
  "out": {
    word: "out",
    phonetic: "/aʊt/",
    meanings: [{
      partOfSpeech: "adverb",
      definitions: [{ definition: "Moving or appearing to move away from a particular place", example: "Go out" }]
    }]
  },
  // Common 4-letter words
  "word": {
    word: "word",
    phonetic: "/wɜːrd/",
    meanings: [{
      partOfSpeech: "noun",
      definitions: [{ definition: "A single distinct meaningful element of speech or writing", example: "I don't like the word 'unofficial'" }]
    }]
  },
  "time": {
    word: "time",
    phonetic: "/taɪm/",
    meanings: [{
      partOfSpeech: "noun",
      definitions: [{ definition: "The indefinite continued progress of existence", example: "Time will tell" }]
    }]
  },
  "have": {
    word: "have",
    phonetic: "/hæv/",
    meanings: [{
      partOfSpeech: "verb",
      definitions: [{ definition: "Possess, own, or hold", example: "I have a car" }]
    }]
  },
  "from": {
    word: "from",
    phonetic: "/frɒm/",
    meanings: [{
      partOfSpeech: "preposition",
      definitions: [{ definition: "Indicating the point in space at which a journey, motion, or action starts", example: "She came from Boston" }]
    }]
  },
  "this": {
    word: "this",
    phonetic: "/ðɪs/",
    meanings: [{
      partOfSpeech: "determiner",
      definitions: [{ definition: "Used to identify a specific person or thing close at hand", example: "This book is mine" }]
    }]
  },
  "with": {
    word: "with",
    phonetic: "/wɪð/",
    meanings: [{
      partOfSpeech: "preposition",
      definitions: [{ definition: "Accompanied by another person or thing", example: "Come with me" }]
    }]
  },
  "that": {
    word: "that",
    phonetic: "/ðæt/",
    meanings: [{
      partOfSpeech: "pronoun",
      definitions: [{ definition: "Used to identify a specific person or thing observed or heard", example: "That is my friend" }]
    }]
  },
  "they": {
    word: "they",
    phonetic: "/ðeɪ/",
    meanings: [{
      partOfSpeech: "pronoun",
      definitions: [{ definition: "Used to refer to two or more people or things previously mentioned", example: "They are coming" }]
    }]
  },
  "what": {
    word: "what",
    phonetic: "/wɒt/",
    meanings: [{
      partOfSpeech: "pronoun",
      definitions: [{ definition: "Asking for information specifying something", example: "What is your name?" }]
    }]
  },
  "when": {
    word: "when",
    phonetic: "/wen/",
    meanings: [{
      partOfSpeech: "adverb",
      definitions: [{ definition: "At what time", example: "When did you arrive?" }]
    }]
  },
  "make": {
    word: "make",
    phonetic: "/meɪk/",
    meanings: [{
      partOfSpeech: "verb",
      definitions: [{ definition: "Form something by putting parts together or combining substances", example: "Make a cake" }]
    }]
  },
  "like": {
    word: "like",
    phonetic: "/laɪk/",
    meanings: [{
      partOfSpeech: "verb",
      definitions: [{ definition: "Find agreeable, enjoyable, or satisfactory", example: "I like chocolate" }]
    }]
  },
  "look": {
    word: "look",
    phonetic: "/lʊk/",
    meanings: [{
      partOfSpeech: "verb",
      definitions: [{ definition: "Direct one's gaze toward someone or something", example: "Look at the sky" }]
    }]
  },
  "more": {
    word: "more",
    phonetic: "/mɔːr/",
    meanings: [{
      partOfSpeech: "determiner",
      definitions: [{ definition: "A greater or additional amount or degree", example: "I need more time" }]
    }]
  },
  "come": {
    word: "come",
    phonetic: "/kʌm/",
    meanings: [{
      partOfSpeech: "verb",
      definitions: [{ definition: "Move or travel toward or into a place", example: "Come here" }]
    }]
  },
  // Common 5-letter words (Wordle favorites)
  "about": {
    word: "about",
    phonetic: "/əˈbaʊt/",
    meanings: [{
      partOfSpeech: "preposition",
      definitions: [{ definition: "On the subject of; concerning", example: "Tell me about your day" }]
    }]
  },
  "after": {
    word: "after",
    phonetic: "/ˈæftər/",
    meanings: [{
      partOfSpeech: "preposition",
      definitions: [{ definition: "In the time following an event or another period of time", example: "After dinner" }]
    }]
  },
  "could": {
    word: "could",
    phonetic: "/kʊd/",
    meanings: [{
      partOfSpeech: "verb",
      definitions: [{ definition: "Past of can; used to indicate possibility", example: "I could go tomorrow" }]
    }]
  },
  "first": {
    word: "first",
    phonetic: "/fɜːrst/",
    meanings: [{
      partOfSpeech: "adjective",
      definitions: [{ definition: "Coming before all others in time or order", example: "The first person to arrive" }]
    }]
  },
  "great": {
    word: "great",
    phonetic: "/ɡreɪt/",
    meanings: [{
      partOfSpeech: "adjective",
      definitions: [{ definition: "Of an extent, amount, or intensity considerably above average", example: "A great success" }]
    }]
  },
  "house": {
    word: "house",
    phonetic: "/haʊs/",
    meanings: [{
      partOfSpeech: "noun",
      definitions: [{ definition: "A building for human habitation", example: "A three-bedroom house" }]
    }]
  },
  "plant": {
    word: "plant",
    phonetic: "/plænt/",
    meanings: [{
      partOfSpeech: "noun",
      definitions: [{ definition: "A living organism that typically grows in soil and has leaves", example: "Water the plants" }]
    }]
  },
  "place": {
    word: "place",
    phonetic: "/pleɪs/",
    meanings: [{
      partOfSpeech: "noun",
      definitions: [{ definition: "A particular position, point, or area in space", example: "This is the place" }]
    }]
  },
  "world": {
    word: "world",
    phonetic: "/wɜːrld/",
    meanings: [{
      partOfSpeech: "noun",
      definitions: [{ definition: "The earth, together with all of its countries and peoples", example: "Travel the world" }]
    }]
  },
  "where": {
    word: "where",
    phonetic: "/weər/",
    meanings: [{
      partOfSpeech: "adverb",
      definitions: [{ definition: "In or to what place or position", example: "Where are you going?" }]
    }]
  },
  "think": {
    word: "think",
    phonetic: "/θɪŋk/",
    meanings: [{
      partOfSpeech: "verb",
      definitions: [{ definition: "Have a particular opinion, belief, or idea", example: "I think it's true" }]
    }]
  },
  "three": {
    word: "three",
    phonetic: "/θriː/",
    meanings: [{
      partOfSpeech: "number",
      definitions: [{ definition: "Equivalent to the sum of one and two" }]
    }]
  },
  // Game-specific words
  "stone": {
    word: "stone",
    phonetic: "/stoʊn/",
    meanings: [{
      partOfSpeech: "noun",
      definitions: [{ definition: "Hard solid non-metallic mineral matter", example: "A stone wall" }]
    }]
  },
  "raise": {
    word: "raise",
    phonetic: "/reɪz/",
    meanings: [{
      partOfSpeech: "verb",
      definitions: [{ definition: "Lift or move to a higher position or level", example: "Raise your hand" }]
    }]
  },
  "arose": {
    word: "arose",
    phonetic: "/əˈroʊz/",
    meanings: [{
      partOfSpeech: "verb",
      definitions: [{ definition: "Past tense of arise; emerge or become apparent", example: "A problem arose" }]
    }]
  },
  "stare": {
    word: "stare",
    phonetic: "/ster/",
    meanings: [{
      partOfSpeech: "verb",
      definitions: [{ definition: "Look fixedly or vacantly at someone or something", example: "Don't stare" }]
    }]
  },
  "rates": {
    word: "rates",
    phonetic: "/reɪts/",
    meanings: [{
      partOfSpeech: "noun",
      definitions: [{ definition: "A measure, quantity, or frequency measured against another quantity", example: "Interest rates" }]
    }]
  },
}

/**
 * Get definition from local dictionary
 * @param word - Word to look up
 * @returns LocalDefinition or null if not found
 */
export function getLocalDefinition(word: string): LocalDefinition | null {
  const normalizedWord = word.toLowerCase().trim()
  return LOCAL_DICTIONARY[normalizedWord] || null
}

/**
 * Check if word exists in local dictionary
 * @param word - Word to check
 * @returns boolean
 */
export function hasLocalDefinition(word: string): boolean {
  const normalizedWord = word.toLowerCase().trim()
  return normalizedWord in LOCAL_DICTIONARY
}

/**
 * Get all available words in local dictionary
 * @returns Array of words
 */
export function getLocalDictionaryWords(): string[] {
  return Object.keys(LOCAL_DICTIONARY)
}

/**
 * Get local dictionary size
 * @returns Number of words in local dictionary
 */
export function getLocalDictionarySize(): number {
  return Object.keys(LOCAL_DICTIONARY).length
}
