import React, { memo } from 'react'
import { useDispatch } from 'react-redux'

import * as actions from '../store/actions'

const Song = ({data}) => {
    const dispatch = useDispatch()

    const handleClickListener = (data) => {
        dispatch(actions.setCurSongId(data.encodeId))
        dispatch(actions.play(true))
        dispatch(actions.playAlbum(true))
      }
    
  return (
    <div 
        className='w-full h-[56px] flex items-center gap-[10px] p-2 rounded-md hover:bg-[#DDE4E4] cursor-pointer'
        onClick={() => handleClickListener(data)}
        >
        <img 
            className='w-[40px] h-[40px] rounded-md'
            src={data?.thumbnail} alt='thumbnail'
        />
        <div className='flex flex-col gap-[3px]'>
            <span className='text-sm font-medium whitespace-nowrap text-gray-800'>
            {data?.title?.length > 20 ? `${data?.title.slice(0, 20)}...` : data?.title}
            </span>
            <span className='text-xs opacity-80 whitespace-nowrap text-gray-500'>{data?.artistsNames}</span>
        </div>
    </div>
  )
}

export default memo(Song)