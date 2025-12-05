import { AchievementCard } from '../components/achievement-card'
import { CameraButton } from '../components/camera-buttom'
import { QrButton } from '../components/qr-button'

export default function AppPage() {
  return (
    <div className='flex h-screen max-h-screen w-full flex-col items-center overflow-hidden p-10'>
      <div className='h-24 text-5xl font-semibold'>
        Быстрый способ сортировать отходы правильно и без лишних усилий.
      </div>
      <AchievementCard />
      <div>
        <div className='my-10 text-2xl opacity-70'>
          Загрузи фото или отсканируй QR-код, и приложение подскажет, в какой контейнер
          нужно выбросить предмет.
        </div>
        <div className='flex h-full flex-col items-center justify-center gap-10'>
          <div className='flex w-full items-center justify-center gap-15'>
            <CameraButton />
            <QrButton />
          </div>
        </div>
      </div>
    </div>
  )
}
