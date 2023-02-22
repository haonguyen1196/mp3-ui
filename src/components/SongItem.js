import moment from 'moment'
import React, { memo } from 'react'
import 'moment/locale/vi'
import { useDispatch } from 'react-redux'

import * as actions from '../store/actions'

const SongItem = ({ data }) => {
  const dispatch = useDispatch()

  return (
    <div 
      className='w-[45%] min-[1024px]:w-[30%] flex gap-[10px] p-[10px] cursor-pointer hover:bg-main-200 rounded-md'
      onClick={() => {
        dispatch(actions.setCurSongId(data.encodeId))
        dispatch(actions.play(true))

      }}
    >
      <img 
        className='w-[60px] h-[60px] rounded-md'
        src={data.thumbnail} alt='thumbnail'
      />
      <div className='flex flex-col gap-[3px]'>
        <span className='text-sm text-gray-800 font-medium whitespace-nowrap'>
          {data.title.length > 20 ? `${data.title.slice(0, 20)}...` : data.title}
        </span>
        <span className='text-xs text-gray-500 whitespace-nowrap'>{data.artistsNames}</span>
        <span className='text-xs text-gray-500'>{moment(data.releaseDate *1000).fromNow()}</span>
      </div>
    </div>
  )
}

export default memo(SongItem)