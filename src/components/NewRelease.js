import React, { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import icons from '../utils/icons'
import { SongItem } from '../components'

const { SlArrowRight } = icons

const NewRelease = () => {
    const { newRelease } = useSelector(state => state.app)
    const [isActive, setIsActive] = useState(0)
    const [songs, setSongs] = useState([])

    useEffect(() => {
        if (isActive === 0) {
            setSongs(newRelease?.items?.vPop)
        } else {
            setSongs(newRelease?.items?.others)
        }
    }, [isActive, newRelease])

  return (
    <div className='mt-12 px-[59px]'>
        <div className='flex items-center justify-between mb-5'>
            <h3 className='text-xl font-bold text-gray-800'>{newRelease?.title}</h3>
            <div className='flex items-center gap-1 text-gray-500 cursor-pointer hover:text-main-500'>
                <span className='text-xs uppercase font-medium'>Tất cả</span>
                <span><SlArrowRight size={14}/></span>
            </div> 
        </div>
        <div className='text-xs mb-4'>
            <button 
                onClick={() => setIsActive(0)}
                className={`uppercase px-6 py-1 rounded-full border border-gray-500 mr-4 ${isActive === 0 ? 'bg-main-500 text-white' : 'text-gray-800'}`}
            >
                Việt Nam
            </button>
            <button 
                onClick={() => setIsActive(1)}
                className={`uppercase px-6 py-1 rounded-full border border-gray-500 mr-4 ${isActive === 1 ? 'bg-main-500 text-white' : 'text-gray-800'}`}
            >
                Quốc Tế
            </button>
        </div>
        <div className='flex w-full flex-wrap justify-between'>
            {songs && songs.map(item => (
                <SongItem key={item.encodeId} data={item}/>
            ))}
        </div>
    </div>
  )
}

export default memo(NewRelease)