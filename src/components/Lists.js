import React, { memo } from 'react'
import  List  from './List'
import icons from '../utils/icons'
import { useSelector } from 'react-redux'

const { BiSort } = icons

const Lists = () => {
  const { songs } = useSelector(state => state.music)
  return (
    <div className='w-full flex flex-col text-xs'>
      <div className='h-[46px] flex justify-between items-center uppercase font-semibold p-[10px] text-gray-500 rounded-md border-b border-[rgba(0,0,0,0.05)]'>
        <div className='flex gap-1 items-center basis-3/6'>
          <span><BiSort size={16}/></span>
          <span>Bài hát</span>
        </div>
        <span className='basis-2/6'>Album</span>
        <span className='basis-1/6 text-right'>Thời gian</span>
      </div>
      <div>
        {songs?.map(song => (
          <List key={song.encodeId} song={song}/>
        ))}
      </div>
    </div>
  )
}

export default memo(Lists)