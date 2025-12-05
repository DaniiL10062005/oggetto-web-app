'use client'

import { Camera, ScanLine } from 'lucide-react'
import { useRef, useState } from 'react'
import Webcam from 'react-webcam'

import { Button } from '@/shared/components/button'
import { WASTE_ITEMS } from '@/shared/mock/waste-data'
import { useKioskStore } from '@/shared/stores/kiosk-store'

export function CameraFeed() {
  const webcamRef = useRef<Webcam>(null)
  const [isCapturing, setIsCapturing] = useState(false)
  const selectItem = useKioskStore(state => state.selectItem)

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      setIsCapturing(true)

      console.log('Captured image:', imageSrc)

      setTimeout(() => {
        setIsCapturing(false)
        const randomItem = WASTE_ITEMS[Math.floor(Math.random() * WASTE_ITEMS.length)]
        selectItem(randomItem.id)
      }, 3000)
    }
  }

  return (
    <div className='relative flex h-full w-full flex-col overflow-hidden rounded-3xl border-4 border-gray-300 bg-gray-900 shadow-2xl'>
      <div className='relative flex-1'>
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat='image/jpeg'
          videoConstraints={{
            facingMode: 'user',
            aspectRatio: 16 / 9,
          }}
          className='size-full object-cover'
          mirrored
        />

        {isCapturing && (
          <div className='absolute inset-0 flex items-center justify-center bg-green-500/20'>
            <div className='animate-pulse rounded-2xl bg-green-500 p-6'>
              <ScanLine className='size-20 text-white' />
            </div>
          </div>
        )}

        <div className='absolute top-6 left-6 rounded-lg bg-black/50 px-5 py-3 backdrop-blur-sm'>
          <p className='flex items-center gap-2 text-lg font-semibold text-white'>
            <Camera className='size-5' />
            Умное зеркало для отходов
          </p>
        </div>

        <div className='absolute bottom-8 left-1/2 -translate-x-1/2'>
          <Button
            size='lg'
            onClick={handleCapture}
            disabled={isCapturing}
            className='h-16 gap-3 rounded-full bg-blue-600 px-10 text-xl font-semibold shadow-2xl hover:bg-blue-700 disabled:opacity-50'
          >
            <ScanLine className='size-6' />
            {isCapturing ? 'Сканирование...' : 'Сканировать предмет'}
          </Button>
        </div>
      </div>
    </div>
  )
}
