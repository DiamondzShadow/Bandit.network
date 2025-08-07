"use client"

import { useEffect, useRef } from 'react'

interface GameSoundsProps {
  enabled?: boolean
}

export const GameSounds = ({ enabled = true }: GameSoundsProps) => {
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return

    // Initialize Web Audio API for game sounds
    try {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    } catch (error) {
      console.log('Web Audio API not supported')
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [enabled])

  const playBeep = (frequency: number = 440, duration: number = 200, type: OscillatorType = 'sine') => {
    if (!audioContextRef.current || !enabled) return

    try {
      const oscillator = audioContextRef.current.createOscillator()
      const gainNode = audioContextRef.current.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContextRef.current.destination)

      oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime)
      oscillator.type = type

      gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration / 1000)

      oscillator.start(audioContextRef.current.currentTime)
      oscillator.stop(audioContextRef.current.currentTime + duration / 1000)
    } catch (error) {
      console.log('Error playing sound:', error)
    }
  }

  const playCoinSound = () => {
    playBeep(800, 100, 'square')
    setTimeout(() => playBeep(1000, 100, 'square'), 50)
  }

  const playLevelUpSound = () => {
    playBeep(523, 200, 'sine') // C5
    setTimeout(() => playBeep(659, 200, 'sine'), 100) // E5
    setTimeout(() => playBeep(784, 300, 'sine'), 200) // G5
  }

  const playClickSound = () => {
    playBeep(600, 50, 'square')
  }

  const playPowerUpSound = () => {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => playBeep(200 + i * 100, 80, 'sawtooth'), i * 60)
    }
  }

  // Expose sound functions to window for global access
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).gameSounds = {
        coin: playCoinSound,
        levelUp: playLevelUpSound,
        click: playClickSound,
        powerUp: playPowerUpSound,
        enabled
      }
    }
  }, [enabled])

  return null // This component doesn't render anything
}

export default GameSounds