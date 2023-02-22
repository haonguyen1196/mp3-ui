import moment from 'moment/moment';
import React, { memo } from 'react'
import { useDispatch } from 'react-redux';

import icons from '../utils/icons'
import * as actions from '../store/actions'

const { BsMusicNoteBeamed } = icons

const List = ({song, isHideNote, isHideTitle, order}) => {
  const dispatch = useDispatch()

  const handleClickList = () => {
    dispatch(actions.setCurSongId(song?.encodeId))
    dispatch(actions.play(true))
    dispatch(actions.playAlbum(true))
  }
  return (
    <div 
      className='flex justify-between h-[60px] p-[10px] text-gray-500 rounded-md border-b border-[rgba(0,0,0,0.05)] hover:bg-[#DDE4E4] cursor-pointer'
      onClick={handleClickList}
      >
      <div className='basis-3/6 flex gap-[10px] items-center flex-1'>
        { order && <span className={`flex items-center justify-center text-3xl font-bold w-[26px] text-main-300 mr-3 ${order === 1 ? 'text-shadow-no1' : order === 2 ? 'text-shadow-no2' : order === 3 ? 'text-shadow-no3' : 'text-shadow-no4'}`}>{order}</span>}
        {isHideNote || <span className='text-gray-500'>
          <BsMusicNoteBeamed size={14}/>
        </span>}
        <img src={song?.thumbnail} alt='thumbnail' className='w-10 h-10 rounded-md'/>
        <span>
          <div className='text-sm text-gray-700 font-medium whitespace-nowrap'>
            {song?.title?.length > 30 ? `${song?.title.slice(0, 30)}...` : song?.title}
          </div>
          <div>{song?.artistsNames}</div>
        </span>
      </div>
      {isHideTitle || <div className='basis-2/6 flex justify-start items-center'>
        {song?.album?.title?.length > 30 ? `${song?.album?.title.slice(0, 30)}...` : song?.album?.title}
      </div>}
      <div className='basis-1/6 flex justify-end items-center'>
        {moment.utc(song?.duration*1000).format('mm:ss')}
      </div>
    </div>
  )
}

export default memo(List)