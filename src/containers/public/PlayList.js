import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import moment from 'moment/moment'
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useDispatch, useSelector } from 'react-redux';

import * as apis from '../../apis'
import icons from '../../utils/icons'
import * as actions from '../../store/actions'
import {  AudioLoading, Loading, Lists } from '../../components'

const { BsDot, BsPlayFill } = icons

const Playlist = () => {
  const { pid } = useParams()
  const local= useLocation()
  const [playListData, setPlayListData] = useState({})
  const [isShowLoading, setIsShowLoading] = useState(false)
  const dispatch = useDispatch()
  const { isPlaying } = useSelector(state => state.music)

  // fetch info playlist data
  useEffect(() => {
    setIsShowLoading(true)
    const fetchApiPlayList = async() => {
      const response = await apis.apiGetDetailPlaylist(pid)
      if(response?.data.err === 0 ) {
        setPlayListData(response?.data.data)
        dispatch(actions.setPlayList(response?.data?.data?.song?.items))
        setIsShowLoading(false)
      }
    }
    fetchApiPlayList()
  },[pid])

  useEffect(() => {
    if (local?.state?.playIng) {
      const randomSong = Math.floor(Math.random() * playListData?.song?.items.length)
      dispatch(actions.setCurSongId(playListData?.song?.items[randomSong]?.encodeId))
      dispatch(actions.play(true))
    }
  }, [pid, playListData])

  return (
    <div className='relative pt-10 flex gap-8 px-[59px] w-full mt-[70px]'>
      <div className={`absolute flex items-center justify-center top-0 bottom-0 left-0 right-0 bg-main-300 z-10 ${isShowLoading ? 'block' : 'hidden'}`}>
        <Loading />
      </div>
      <div className='flex-none flex flex-col items-center text-center gap-2 w-1/4'>
        <div className='w-full relative cursor-pointer'>
          <img 
            src={playListData?.thumbnailM} 
            alt='thumbnail' 
            className={`w-full ${isPlaying ? 'rounded-full animate-rotate-center' : 'animate-rotate-center-pause rounded-lg'} shadow-xl`}
          />
          <div 
            className={`absolute top-0 left-0 bottom-0 right-0 hover:bg-overlay-300 flex justify-center items-center ${isPlaying ? 'rounded-full' : 'rounded-lg'}`}
          >
            <span className='text-white p-2 border border-white rounded-full'>
              {isPlaying ? <AudioLoading /> : <BsPlayFill size={30}/>}
            </span>
          </div>
        </div>
        <div className='flex flex-col gap-1 text-xs text-gray-500 font-medium'>
          <h3 className='text-xl font-bold text-gray-700'>{playListData?.title}</h3>
          <div className='flex justify-center gap-1'>
            <span>Cập nhật:</span>
            <span>{moment.unix(playListData?.contentLastUpdate).format('DD/MM/YYYY')}</span>
          </div>
          <span>{playListData?.artistsNames}</span>
          <span>{playListData?.like > 1000000 ? `${Math.round(playListData?.like/1000000)}M người yêu thích` : `${Math.round(playListData?.like/1000)}K người yêu thích`}</span>
        </div>
      </div>
      <Scrollbars style={{ width: '100%', height: '75vh' }}>
        <div className='flex-auto'>
          <div className='text-sm mb-[10px]'>
            <span className='text-gray-500 font-medium'>Lời tựa </span>
            <span className='text-gray-700 font-medium'>{playListData?.description}</span>
          </div>
          <Lists />
          <div className='flex items-center gap-2 text-gray-500 text-xs font-medium p-[10px] pb-10'>
            <span>{`${playListData?.song?.total} bài hát`}</span>
            <span><BsDot /></span>
            <span>{moment.utc(playListData?.song?.totalDuration*1000).format('HH giờ mm')}</span>
          </div>
        </div>
      </Scrollbars>
    </div>
  )
}

export default Playlist