import React, { memo, useState } from 'react'

import icons from '../utils/icons'
import { handleNumber } from '../utils/fn'
import { Link } from 'react-router-dom'

const { AiOutlineUserAdd } = icons
const Artists = ({ image, name, follow, link}) => {
  const [isHover, setIsHover] = useState(false)

  return (
    <div>
        <Link className='relative rounded-full cursor-pointer overflow-hidden block'
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          to={link}
        >
          <img src={image} alt='single' className={`w-full object-contain rounded-full ${isHover ? 'animate-scale-up-img' : 'animate-scale-down-img'}`}/>
          {isHover && <div className='absolute top-0 left-0 right-0 bottom-0 bg-overlay-300 rounded-full'></div>}
        </Link>
        <div className='flex flex-col items-center'>
            <Link to={link} className='mt-[15px] mb-1 text-sm font-medium text-gray-700 hover:underline hover:text-main-500 cursor-pointer'>{name}</Link>
            <p className='text-xs text-gray-500 font-medium'>{`${handleNumber(follow)} quan tâm`}</p>
            <button className='uppercase mt-[15px] flex gap-1 items-center text-white text-xs border rounded-l-full rounded-r-full bg-main-500 px-4 py-2 hover:bg-opacity-80'>
                <span><AiOutlineUserAdd size={14}/></span>
                Quan Tâm
            </button>
        </div>
    </div>
  )
}

export default memo(Artists)