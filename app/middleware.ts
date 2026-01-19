import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl

  // 对带查询参数的工具页返回 X-Robots-Tag: noindex
  // 防止无限查询组合污染索引
  if (url.searchParams.size > 0 &&
      (url.pathname.includes('/words-start-with') ||
       url.pathname.includes('/words-ending-in') ||
       url.pathname.includes('/words-with-letters') ||
       url.pathname.match(/\/\d+-letter-words$/))) {
    const response = NextResponse.next()
    response.headers.set('X-Robots-Tag', 'noindex, follow')
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/words-start-with',
    '/words-ending-in',
    '/words-with-letters',
    '/:length-letter-words'
  ]
}
