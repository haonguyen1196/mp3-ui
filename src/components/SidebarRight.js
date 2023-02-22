import React, { useEffect, useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useDispatch, useSelector } from 'react-redux'

import icons from '../utils/icons'
import * as actions from '../store/actions'
import { Song } from '../components'

const { RiDeleteBinLine } = icons

const SidebarRight = () => {
  const dispatch = useDispatch()
  const [isRecent, setIsRecent] = useState(false)
  const [playList, setPlayList] = useState([])
  const { curSongData, isPlaying, songs, recentSong } = useSelector(state => state.music)
  useEffect(() => {
    setPlayList(songs)
  },[])

  useEffect(() => {
    if(isPlaying) {
      setPlayList(songs)
    }
  },[songs, isPlaying])


  return (
    <div className='flex flex-col px-2'>
      <div className='flex-none h-[70px] py-[14px] flex justify-between items-center'>
        <div className='text-xs text-gray-500 font-medium rounded-full bg-main-200 w-fit p-1 flex items-center'>
          <span className={`px-[10px] py-[6px] rounded-full mr-2 hover:text-main-500 cursor-pointer ${!isRecent && 'text-main-500 bg-[#E7ECEC]'}`}
            onClick={() => setIsRecent(false)}
          >
            Danh sách phát
          </span>
          <span className={`px-[10px] py-[6px] rounded-full hover:text-main-500 cursor-pointer ${isRecent && 'text-main-500 bg-[#E7ECEC]'}`}
            onClick={() => setIsRecent(true)}
          >
            Nghe gần đây
          </span>
        </div>
        <span className='p-2 rounded-full bg-[#E7ECEC] cursor-pointer hover:opacity-90'>
          <RiDeleteBinLine size={16}/>
        </span>
      </div>
      <Scrollbars autoHide style={{ width: '100%', height: '80vh' }}>
        {isRecent ? 
        
          (recentSong.map(item => <Song data={item}/>))
          :
        <div className={`${curSongData ? 'block' : 'hidden'}`}>
          <div 
            key={curSongData.encodeId}
            className={`w-full h-[56px] flex items-center gap-[10px] p-2 cursor-pointer rounded-md mb-[15px] text-white bg-main-500 `}
          >
            <img 
              className='w-[40px] h-[40px] rounded-md'
              src={curSongData.thumbnail} alt='thumbnail'
            />
            <div className='flex flex-col gap-[3px]'>
              <span className='text-sm font-medium whitespace-nowrap'>
                {curSongData.title.length > 20 ? `${curSongData.title.slice(0, 20)}...` : curSongData.title}
              </span>
              <span className='text-xs opacity-80 whitespace-nowrap'>{curSongData.artistsNames}</span>
            </div>
          </div>
          <div className='text-sm mb-[5px]'>
            <div className='text-gray-800 font-bold'>Tiếp theo</div>
            <div>
              <span className='text-gray-500'>Từ playlist </span>
              <span className='text-main-500 font-bold'>{curSongData?.album?.title}</span>
            </div>
          </div>
          <div>
            {playList && playList.map(item => (
              <Song key={item.encodeId}  data={item}/>
            ))}
          </div>
        </div>}
      </Scrollbars >
    </div>
  )
}

export default SidebarRight