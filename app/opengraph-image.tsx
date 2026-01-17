import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Word Unscrambler - Solve any word game'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '120px',
              height: '120px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '40px',
            }}
          >
            <span
              style={{
                fontSize: '80px',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              W
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                color: 'white',
                letterSpacing: '-2px',
                lineHeight: '1',
              }}
            >
              Word Unscrambler
            </div>
            <div
              style={{
                fontSize: '32px',
                color: 'rgba(255, 255, 255, 0.9)',
                marginTop: '16px',
              }}
            >
              Solve any word game
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '20px',
            fontSize: '24px',
            color: 'rgba(255, 255, 255, 0.8)',
          }}
        >
          <span>Scrabble</span>
          <span>•</span>
          <span>Wordle</span>
          <span>•</span>
          <span>Words with Friends</span>
          <span>•</span>
          <span>Crosswords</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
