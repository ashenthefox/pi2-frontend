import { renderToStaticMarkup } from 'react-dom/server'
import { createElement } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { FeaturedCard } from '@/components/featured-card'
import type { ReplayView } from '@/lib/types'

describe('FeaturedCard', () => {
  it('links to the exact featured replay rather than a filtered replay list', () => {
    const replay: ReplayView = {
      id: 'replay-123',
      court: { id: 'court-456', nome: 'Quadra Central' },
      arena: { nome: 'Arena Azul' },
      city: 'Brasília',
      recordedAt: '2026-11-22T12:00:00.000Z',
      duration: 30,
      expiresAt: null,
      status: 'available',
      arquivoUrl: '/video.mp4',
    }

    const html = renderToStaticMarkup(
      createElement(MemoryRouter, null, createElement(FeaturedCard, { replay })),
    )

    expect(html).toContain('href="/app/replays/replay-123"')
    expect(html).not.toContain('/app/replays?court=')
    expect(html).toContain('Quadra Central')
  })
})
