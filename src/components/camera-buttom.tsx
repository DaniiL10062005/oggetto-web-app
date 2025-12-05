'use client'

import { Camera } from 'lucide-react'
import { useRef, useState } from 'react'

import { Button } from '../shared/components/button'

export const CameraButton = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [photo, setPhoto] = useState<string | null>(null)

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      })

      setStream(mediaStream)

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        await videoRef.current.play()
      }
    } catch (err) {
      console.error('Ошибка доступа к камере:', err)
    }
  }

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return

    const canvas = canvasRef.current
    const video = videoRef.current

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    const imageData = canvas.toDataURL('image/png')
    setPhoto(imageData)

    // тут можешь отправить изображение на сервер
    // await fetch('/api/upload', { method: 'POST', body: imageData })
  }

  return (
    <div className='flex flex-col items-center gap-4'>
      {!stream && (
        <Button className='aspect-square h-96 w-96 rounded-4xl' onClick={startCamera}>
          <Camera className='size-48 text-black' />
        </Button>
      )}

      {stream && (
        <>
          <video ref={videoRef} className='h-96 w-96 rounded-4xl object-cover' autoPlay />
          <Button onClick={takePhoto}>Сделать снимок</Button>
        </>
      )}

      <canvas ref={canvasRef} className='hidden' />

      {photo && (
        <img src={photo} alt='captured' className='h-96 w-96 rounded-4xl object-cover' />
      )}
    </div>
  )
}
