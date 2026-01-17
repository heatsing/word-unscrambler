import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          borderRadius: '40px',
        }}
      >
        <div
          style={{
            fontSize: 100,
            fontWeight: 'bold',
            color: 'white',
            fontFamily: 'system-ui, sans-serif',
            letterSpacing: '-2px',
          }}
        >
          W
        </div>
        <div
          style={{
            fontSize: 20,
            fontWeight: '600',
            color: 'rgba(255, 255, 255, 0.9)',
            fontFamily: 'system-ui, sans-serif',
            marginTop: '-10px',
          }}
        >
          UNSCRAMBLER
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
