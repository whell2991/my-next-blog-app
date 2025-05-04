import React from 'react'
import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'


const StartupCard = ( { post }: { post: StartupTypeCard}) => {
  const { _createdAt, views, author: { _id: authorID, name, img}, _id, description, image, category, title} = post;
  return (
    
    <li className='startup-card group'>
        
        <div className='card_header'>
            <p className='startup-card_date'>
                {formatDate(_createdAt)}
            </p>
            <div className='startup-card_view-slot'>
            <EyeIcon className='w-6 h-6 text-primary'/>
            <span className='text-16-medium'>{views}</span>
        </div>
        </div>
        <div className='flex-between mt-5 gap-5'>
          <div className="flex-1">
            <Link href={`/user/${authorID}`}>
            <p className='text-16-medium line-clamp-1'>{name}</p>
            </Link>
            <Link href={`/startup/${_id}`}>
            <h3 className='text-26-semibold line-clamp-1'>{title}</h3>
            </Link>
          </div>
          <Link href={`/user/${authorID}`}>
            <Image src={img} alt="profile thumbnail" width={48} height={48} className='rounded-full'/>
            </Link>
        </div>
        
          <Link href={`/startup/${_id}`}>
          <p className='startup-card_desc'>{description}</p>
          <Image src={image} alt="Image of Startup Article" width={500} height={300} className='startup-card_img' />
          </Link>
          <div className='flex-between gap-3 mt-5'>
            <Link href={`/?query=${category.toLowerCase()}`} >
              <p className='text-16-semibold text-black'>{category}</p>
            </Link>
            <button className='startup-card_btn'>Details</button>
            </div>
      
      
    </li>

  )
}

export default StartupCard