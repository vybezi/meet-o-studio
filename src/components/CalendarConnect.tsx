'use client'

import { useState } from 'react'
import { api } from '@/lib/api-client'
import { Button } from './Button'

export function CalendarConnect() {
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async () => {
    setIsConnecting(true)
    try {
      // Get current frontend URL (the page the user is on)
      const currentUrl = window.location.href.split('?')[0]

      const response = await api.calendar.getGoogleAuthUrl(currentUrl)

      // Redirect to Google OAuth
      window.location.href = response.url
    } catch (error) {
      console.error('Failed to get auth URL:', error)
      setIsConnecting(false)
    }
  }

  return (
    <Button
      onClick={handleConnect}
      disabled={isConnecting}
      className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
    >
      {isConnecting ? 'Connecting...' : 'Connect Google Calendar'}
    </Button>
  )
}
