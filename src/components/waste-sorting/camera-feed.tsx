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

      console.log('Сделан снимок:', imageSrc)

      setTimeout(() => {
        setIsCapturing(false)
        const randomItem = WASTE_ITEMS[Math.floor(Math.random() * WASTE_ITEMS.length)]
        selectItem(randomItem.id)
      }, 3000)
    }
  }

  return (
    <div className='relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-linear-to-br from-cyan-200 to-green-600 p-1 shadow-2xl lg:rounded-3xl'>
      <div className='relative flex h-full w-full flex-col overflow-hidden rounded-[16px] bg-gray-900 lg:rounded-[20px]'>
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
              <div className='animate-pulse rounded-xl bg-green-500 p-4 lg:rounded-2xl lg:p-6'>
                <ScanLine className='size-12 text-white lg:size-20' />
              </div>
            </div>
          )}

          <div className='absolute top-3 left-3 rounded-lg bg-black/50 px-3 py-2 backdrop-blur-sm lg:top-6 lg:left-6 lg:px-5 lg:py-3'>
            <p className='flex items-center gap-1.5 text-sm font-semibold text-white lg:gap-2 lg:text-lg'>
              <Camera className='size-4 lg:size-5' />
              Умное зеркало для отходов
            </p>
          </div>

          <div className='absolute bottom-4 left-1/2 -translate-x-1/2 lg:bottom-8'>
            <Button
              size='lg'
              onClick={handleCapture}
              disabled={isCapturing}
              className='h-12 gap-2 rounded-full bg-blue-600 px-6 text-base font-semibold shadow-2xl hover:bg-blue-700 disabled:opacity-50 lg:h-16 lg:gap-3 lg:px-10 lg:text-xl'
            >
              <ScanLine className='size-5 lg:size-6' />
              {isCapturing ? 'Сканирование...' : 'Сканировать предмет'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
