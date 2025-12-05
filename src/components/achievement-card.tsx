'use client'
import { useState } from 'react'

import { Card } from '../shared/components/card'

const dayTop = ['Пользователь 1', 'Пользователь 2', 'Пользователь 3']
const weekTop = ['Пользователь 4', 'Пользователь 5', 'Пользователь 6']
const monthTop = ['Пользователь 7', 'Пользователь 8', 'Пользователь 9']

export const AchievementCard = () => {
  const [isLeaderBoard, setLeaderBoard] = useState(false)

  return (
    <Card
      className='w-full cursor-pointer p-5'
      onClick={() => setLeaderBoard(prev => !prev)}
    >
      {isLeaderBoard ? (
        <div className='flex w-full items-center justify-between'>
          <div>
            <div className='text-lg font-semibold'>Топ 3 за день</div>
            <ul className='list-inside list-disc'>
              {dayTop.map((u, i) => (
                <li key={i}>{u}</li>
              ))}
            </ul>
          </div>

          <div>
            <div className='text-lg font-semibold'>Топ 3 за неделю</div>
            <ul className='list-inside list-disc'>
              {weekTop.map((u, i) => (
                <li key={i}>{u}</li>
              ))}
            </ul>
          </div>

          <div>
            <div className='text-lg font-semibold'>Топ 3 за месяц</div>
            <ul className='list-inside list-disc'>
              {monthTop.map((u, i) => (
                <li key={i}>{u}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <>
          <div className='text-xl'>Задание на сегодня:</div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni officiis, cumque,
            deserunt incidunt non sunt beatae quisquam ipsa blanditiis quaerat quibusdam
            totam doloremque impedit corporis fugiat quas dolores, esse suscipit.
          </div>
        </>
      )}
    </Card>
  )
}
