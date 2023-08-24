'use client'
import { Card, CardBody, Text, Divider, Image, Badge } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import DetailMovie from '../fragments/DetailMovie'
import { useDisclosure } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

type CardMoviesProps = {
  id: string;
  title: string;
  poster: string;
  rating: number;
}

const CardMovie = (Props: CardMoviesProps) => {
  const [label, setLabel] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { id, title, poster, rating } = Props
  const pathname = usePathname()
  
  useEffect(() => {
    setLabel(pathname)
  }, [pathname])
  
  return (
    <>
      <Card maxW='sm'>
        <button onClick={onOpen}>
        <CardBody className='p-0 static'>
          <Image
            objectFit='cover'
            src={`${process.env.NEXT_PUBLIC_BASEIMGURL}/${poster}`}
              alt={title}
            />
          <Badge variant='solid' colorScheme='red' className='absolute top-0 right-0 rounded-tr-lg'>{label.substring(8) || 'Popular'}</Badge>
            <Badge variant='solid' colorScheme='green' className={`absolute bottom-5 left-0 rounded-tr-lg ${rating === 0 && 'hidden'}`}>{rating.toString().substring(0, 3)}
              <StarIcon color='yellow.500' className='-mt-1' />
              <StarIcon color='yellow.500' className={`-mt-1 ${rating < 7 && 'hidden' }`} />
              <StarIcon color='yellow.500' className={`-mt-1 ${rating < 9 && 'hidden' }`} />
            </Badge>
        </CardBody>
        <Divider />
          <Text fontSize='xs' className='font-semibold truncate'>{title}</Text>
      </button>
      </Card>
      <DetailMovie id={id} onClose={onClose} isOpen={isOpen} />
    </>
  )
}

export default CardMovie