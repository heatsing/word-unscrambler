// Example test file
// Run tests with: npm test

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// Example: Test a simple component
describe('Example Test Suite', () => {
  it('should render a basic element', () => {
    render(<div>Hello World</div>)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('should pass a simple assertion', () => {
    expect(1 + 1).toBe(2)
  })

  it('should handle async operations', async () => {
    const promise = Promise.resolve('async value')
    await expect(promise).resolves.toBe('async value')
  })
})

// Example: Test utility functions
describe('Utility Function Tests', () => {
  it('should test string manipulation', () => {
    const input = 'hello'
    const result = input.toUpperCase()
    expect(result).toBe('HELLO')
  })

  it('should test array operations', () => {
    const numbers = [1, 2, 3, 4, 5]
    const doubled = numbers.map(n => n * 2)
    expect(doubled).toEqual([2, 4, 6, 8, 10])
  })
})

// Example: Test with mocks
describe('Mock Tests', () => {
  it('should mock a function', () => {
    const mockFn = jest.fn()
    mockFn('test')
    expect(mockFn).toHaveBeenCalledWith('test')
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('should mock localStorage', () => {
    localStorage.setItem('key', 'value')
    expect(localStorage.setItem).toHaveBeenCalledWith('key', 'value')
  })
})

/*
 * To run these tests:
 *
 * 1. Install dependencies:
 *    npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
 *
 * 2. Add test script to package.json:
 *    "test": "jest",
 *    "test:watch": "jest --watch",
 *    "test:coverage": "jest --coverage"
 *
 * 3. Run tests:
 *    npm test
 */
