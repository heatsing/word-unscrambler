import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Word Unscrambler - Solve any word game'
export const size = {
  width: 1200,
  height: 600,
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
            marginBottom: '30px',
          }}
        >
          <div
            style={{
              width: '100px',
              height: '100px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '30px',
            }}
          >
            <span
              style={{
                fontSize: '70px',
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
                fontSize: '60px',
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
                fontSize: '28px',
                color: 'rgba(255, 255, 255, 0.9)',
                marginTop: '12px',
              }}
            >
              Solve any word game
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
