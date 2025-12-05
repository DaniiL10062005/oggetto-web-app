import { QrCode } from 'lucide-react'

import { Button } from '../shared/components/button'

export const QrButton = () => {
  return (
    <Button className='aspect-square h-96 w-96 rounded-4xl'>
      <QrCode className='size-48 text-black' />
    </Button>
  )
}
