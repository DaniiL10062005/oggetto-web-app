'use client'

import { Camera, ScanLine } from 'lucide-react'
import { useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { Button } from '@/shared/components/button'

export function CameraFeed() {
  const webcamRef = useRef<Webcam>(null)
  const [isCapturing, setIsCapturing] = useState(false)

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      setIsCapturing(true)

      // Placeholder for future AI scanning logic
      console.log('Captured image:', imageSrc)

      // Reset after visual feedback
      setTimeout(() => {
        setIsCapturing(false)
      }, 1000)
    }
  }

  return (
    <div className='relative overflow-hidden rounded-3xl border-4 border-gray-300 bg-gray-900 shadow-2xl dark:border-gray-700'>
      {/* Video Feed */}
      <div className='relative aspect-video w-full'>
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

        {/* Scanning Overlay */}
        {isCapturing && (
          <div className='absolute inset-0 flex items-center justify-center bg-green-500/20'>
            <div className='animate-pulse rounded-2xl bg-green-500 p-6'>
              <ScanLine className='size-16 text-white' />
            </div>
          </div>
        )}

        {/* Mirror Label */}
        <div className='absolute left-4 top-4 rounded-lg bg-black/50 px-4 py-2 backdrop-blur-sm'>
          <p className='flex items-center gap-2 text-sm font-semibold text-white'>
            <Camera className='size-4' />
            Smart Waste Mirror
          </p>
        </div>

        {/* Capture Button Overlay */}
        <div className='absolute bottom-6 left-1/2 -translate-x-1/2'>
          <Button
            size='lg'
            onClick={handleCapture}
            disabled={isCapturing}
            className='h-14 gap-3 rounded-full bg-blue-600 px-8 text-lg font-semibold shadow-2xl hover:bg-blue-700 disabled:opacity-50'
          >
            <ScanLine className='size-5' />
            {isCapturing ? 'Scanning...' : 'Scan Item'}
          </Button>
        </div>
      </div>

      {/* Helper Text */}
      <div className='bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-center'>
        <p className='text-sm font-medium text-white'>
          Hold your waste item up to the camera to scan, or select manually below
        </p>
      </div>
    </div>
  )
}
