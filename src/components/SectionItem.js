import React, { memo, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import icons from '../utils/icons'

const { AiOutlineHeart, BsPlayFill, HiOutlineDotsHorizontal } = icons

const SectionItem = ({item, data}) => {
    const navigate = useNavigate()
    const imgRef = useRef()
    const [isHover, setIsHover] = useState(false)

    const handleClickToAlbum = (link) => {
        navigate(link.split('.')[0])
    }

    useEffect(() => {
        if( isHover ) {
            imgRef.current.classList.remove('animate-scale-down-img')
            imgRef.current.classList.add('animate-scale-up-img')
        } else {
            imgRef.current.classList.remove('animate-scale-up-img')
            imgRef.current.classList.add('animate-scale-down-img')
        }
    }, [isHover])

  return (
    <div  className='flex-1'>
        <div 
            className='relative cursor-pointer overflow-hidden mb-3 rounded-lg'
            onClick={() => handleClickToAlbum(item.link)}
        >
            <img 
                src={item.thumbnailM} alt='thumbnail' 
                className='w-full object-contain rounded-lg cursor-pointer'
                onClick={() => handleClickToAlbum(item.link)}
                ref={imgRef}
            />
            <div 
                className={`absolute top-0 bottom-0 left-0 right-0 bg-overlay-300 rounded-lg flex items-center 
                justify-center gap-5 text-white opacity-0 hover:opacity-100`}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                <span><AiOutlineHeart size={25}/></span>
                <span className='border rounded-full p-1' 
                onClick={(e) => {
                    e.stopPropagation()
                    navigate(item.link.split('.')[0], { state: {playIng: true}})
                }}>
                    <BsPlayFill size={35}/>
                </span>
                <span><HiOutlineDotsHorizontal size={25}/></span>
            </div>
        </div>
        {data.sectionId === 'hArtistTheme' || <h4 
            className='text-sm text-gray-800 font-bold hover:text-main-500 cursor-pointer'
        >
            {item.title}
        </h4>}
        <span 
            className='text-sm text-gray-500 mt-1'
        >
            {data.sectionId === 'h100' ? item.artistsNames : (item.sortDescription.length > 40 ? `${item.sortDescription.slice(0, 45)}...` : item.sortDescription)}
        </span>
    </div>
  )
}

export default memo(SectionItem)