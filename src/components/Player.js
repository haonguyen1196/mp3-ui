import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import * as apis from '../apis'
import icons from '../utils/icons'
import * as actions from '../store/actions'
import moment from 'moment/moment'
import { LoadingSong } from '../components/'

const { AiFillHeart, 
  AiOutlineHeart, 
  HiOutlineDotsHorizontal, 
  CiShuffle, 
  CiRepeat, 
  MdSkipNext, 
  MdSkipPrevious, 
  MdPlayArrow, 
  MdPause,
  TbRepeatOnce,
  TbPlaylist,
  SlVolumeOff,
  SlVolume2
 } = icons

const Player = ({onShowSideBarRight}) => {
  const dispatch = useDispatch()
  const { curSongId, isPlaying, songs } = useSelector(state => state.music)
  const [ infoSong, setInfoSong ] = useState(null)
  const [audio, setAudio] = useState(new Audio())
  const [seconds, setSeconds] = useState(0)
  const [shuffle, setShuffle] = useState(false)
  const [repeatMode, setRepeatMode] = useState(0)
  const [isLoadingSong, setIsLoadingSong] = useState(false)
  const [isSideBarRight, setIsSideBarRight] = useState(false)
  const [volume, setVolume] = useState(50)
  const [isHover, setIsHover] = useState(false)

  const trackRef = useRef()
  const thumbRef = useRef()
  const volumeRef = useRef()

  useEffect(() => {
    setIsLoadingSong(true)
    const fetchDetailSong = async() => {
      const [res1, res2] = await Promise.all([apis.apiGetDetailSong(curSongId), apis.apiGetSong(curSongId)])
        if (res1.data.err === 0) {
          setInfoSong(res1.data.data)
          dispatch(actions.setCurSongData(res1.data.data))
          dispatch(actions.setRecentSong(res1.data.data))
        }
        if (res2.data.err === 0) {
          audio.pause()
          setAudio(new Audio(res2.data.data['128']))
          setIsLoadingSong(false)
        } else {
          dispatch(actions.play(false))
          audio.pause()
          setAudio(new Audio())
          thumbRef.current.style.cssText = `right: 100%`
          setSeconds(0)
          toast.warn(res2?.data.msg)
        }
    } 

    fetchDetailSong()
  },[curSongId])

  useEffect(() => {
    let intervalId
    audio.load()
    if(isPlaying) {
        audio.play()
        intervalId = setInterval(() => {
          const percent = Math.round(audio.currentTime * 10000 / infoSong?.duration) / 100
          thumbRef.current.style.right = `${100 - percent}%`
          setSeconds(audio.currentTime)
        }, 200)
      }
      return () => {clearInterval(intervalId)}
    
  }, [audio])

  useEffect(() => {
    const handleEndSong = () => {
      if (shuffle) {
        handleShuffleSong()
      } else if (repeatMode === 1) {
        handleBtnNext()
      } else if (repeatMode === 2) {
        handleRepeatOne()
      } else {
        dispatch(actions.play(false))
      }
    }
    audio.addEventListener('ended', handleEndSong)
    return () => audio.removeEventListener('ended', handleEndSong)
  }, [audio, shuffle, repeatMode])

  //handle playy pause song
  const handleTogglePlaying = () => {
    if(isPlaying) {
      audio.pause()
      dispatch(actions.play(false))
    } else {
      audio.play()
      dispatch(actions.play(true))
      audio.currentTime = seconds
    }
  }
  // handle click progress bar
  const handleClickProgressBar = (e) => {
    const trackRect = trackRef.current.getBoundingClientRect()
    const percent = Math.round(((e.clientX - trackRect.left) / trackRect.width) * 10000) / 100
    thumbRef.current.style.cssText = `right: ${100 - percent}%`
    audio.currentTime = (percent * infoSong?.duration)/100
    setSeconds((percent * infoSong?.duration)/100)
  }

// handle click next song
  const handleBtnNext = () => {
    let currentSongId
      songs?.forEach((item, index) => {
        if(item.encodeId === curSongId) {
          currentSongId = index
        }    
      })
      dispatch(actions.setCurSongId(songs[currentSongId + 1].encodeId))
      dispatch(actions.play(true))
  }

  // handle click prev song
  const handleBtnPrev = () => {
    let currentSongId
      songs?.forEach((item, index) => {
        if(item?.encodeId === curSongId) {
          currentSongId = index
        }    
      })
      dispatch(actions.setCurSongId(songs[currentSongId - 1].encodeId))
      dispatch(actions.play(true))
  }

  // handle shuffle song
  const handleShuffleSong = () => {
    const randomIndex = Math.floor(Math.random() * songs.length)
    dispatch(actions.setCurSongId(songs[randomIndex].encodeId))
    dispatch(actions.play(true))
  }

  // handle click repeatone song
  const handleRepeatOne = () => {
    audio.play()
  }

  //handle show side bar right
  const handleShowSideBarRight = () => {
    onShowSideBarRight(prev => !prev)
    setIsSideBarRight(prev => !prev)
  }

  //handle volume song
  const handleVolumeSong = (value) => {
    setVolume(value)
  }

  //handle Click Btn Volume
  const handleClickBtnVolume = () => {
    if(+volume > 0) {
      setVolume(0)
    } else {
      setVolume(50)
    }
  }

  useEffect(() => {
    audio.volume = volume/100
  }, [volume])

  // handle hover volume range
  useEffect(() => {
    if(volumeRef) {
      volumeRef.current.style.cssText = `right: ${100 - +volume}%`
    }
  },[volume])

  return (
    <div className='h-full mx-5 flex'>
      <div className='w-[30%] flex-auto flex items-center gap-3'>
        <img src={infoSong?.thumbnail} alt='thumbnail' className='w-16 h-16 rounded-[4px] cursor-pointer'/>
        <div className='flex flex-col'>
          <span className='text-sm font-medium text-[#32323d] cursor-pointer'>{infoSong?.title}</span>
          <span className='text-xs font-normal text-[#696969] cursor-pointer'>{infoSong?.artistsNames}</span>
        </div>
        <div className='flex gap-4 pl-2 cursor-pointer'>
          <AiOutlineHeart />
          <HiOutlineDotsHorizontal />
        </div>
      </div>
      <div className='w-[40%] flex-auto flex flex-col justify-center items-center'>
        <div className='flex items-center gap-8'>
          <span 
            className={`cursor-pointer ${shuffle && 'text-main-500'}`} 
            title='Bật phát ngẫn nhiên'
            onClick={() => setShuffle(prev => !prev)}
          >
            <CiShuffle size={24}/>
          </span>
          <span onClick={handleBtnPrev}  className={!songs ? 'text-gray-500' : 'cursor-pointer'}>
            <MdSkipPrevious size={24}/>
          </span>
          <span className='hover:text-main-500 p-1 border border-gray-700 hover:border-main-500 rounded-full cursor-pointer'
            onClick={handleTogglePlaying}
          >
            {isPlaying ? (isLoadingSong ? <LoadingSong size={24}/> : <MdPause size={24}/>) : <MdPlayArrow size={24}/>}
          </span>
          <span onClick={handleBtnNext} className={!songs ? 'text-gray-500' : 'cursor-pointer'}>
            <MdSkipNext size={24}/>
          </span>
          <span 
            className={`cursor-pointer ${repeatMode > 0 && 'text-main-500'}`}
            title='Bật phát lại tất cả'
            onClick={() => setRepeatMode(prev => prev === 2 ? 0 : prev + 1)}
          >
            {repeatMode === 2 ? <TbRepeatOnce size={24}/> : <CiRepeat size={24}/>}
          </span>
        </div>
        <div className='w-full flex justify-center items-center gap-3'>
          <span>{moment.utc(seconds*1000).format('mm:ss')}</span>
          <div className='relative w-3/4 h-[3px] hover:h-[8px] bg-[#ADC2C2] rounded-l-full rounded-r-full cursor-pointer'
            onClick={handleClickProgressBar}
            ref={trackRef}
          >
            <div ref={thumbRef} className='absolute top-0 left-0 bottom-0 bg-main-500 rounded-l-full rounded-r-full'></div>
          </div>
          <span>{moment.utc(infoSong?.duration*1000).format('mm:ss')}</span>
        </div>
      </div>
      <div className='w-[30%] flex-auto flex items-center justify-end'>
        <span 
          className='text-gray-500 mr-2 cursor-pointer'
          onClick={handleClickBtnVolume}
        >
          {+volume > 0 ? <SlVolume2 size={20}/> : <SlVolumeOff size={20}/>}
        </span>
        <div className='w-[150px]'
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div className={`w-full h-1 ${isHover ? 'hidden' : 'relative'} bg-white rounded-l-full rounded-r-full border border-gray-500`}>
            <div ref={volumeRef} className='absolute top-0 left-0 bottom-0 bg-main-500 rounded-l-full rounded-r-full'></div>
          </div>
          <input 
            type="range" 
            className={`w-full h-[10px] border-none cursor-pointer ${isHover ? 'block' : 'hidden'}`}
            percent='1'
            min='0'
            max='100'
            value={volume}
            onChange={(e) => handleVolumeSong(e.target.value)}
          />
        </div>
        <span 
          className={`ml-6 cursor-pointer rounded-sm p-1 ${isSideBarRight ? 'text-white bg-main-500' : 'text-gray-500 bg-[#C6DCDC]'}`}
          onClick={handleShowSideBarRight}
        >
          <TbPlaylist size={20}/>
        </span>
      </div>
    </div>
  )
}

export default Player