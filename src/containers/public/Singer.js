import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Artists, List, Loading } from '../../components'

import * as actions from '../../store/actions'
import icons from '../../utils/icons'
import { Section } from '../../components'

const { BsPlayFill, AiOutlineUserAdd, SlArrowRight } = icons

const Singer = () => {
  const { singer } = useParams()
  const dispatch = useDispatch()
  const [isHoverPlay, setIsHoverPlay] = useState(false)
  const { searchPlaylist } = useSelector(state => state.music)
  const ref = useRef() 

  useEffect(() => {
    dispatch(actions.setArtist(singer))
  },[singer])
  
  useEffect(() => {
    ref?.current?.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
  }, [singer])
  return (
    <div className='w-full h-100vh pb-10'>
      {searchPlaylist ? <div>
        <div ref={ref}  className='relative w-full h-[400px]'>
        <img src={searchPlaylist?.cover} alt='singer' className='w-full h-[400px] object-cover'/>
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-[rgba(0,0,0,0.3)] to-[rgba(0,0,0,0.1)]'></div>
        <div className='absolute bottom-6 left-[59px] '>
          <div className='flex items-center text-[#FEFFFF]'>
            <h3 className='font-bold text-[60px] mr-5'>{searchPlaylist?.name}</h3>
            <span 
              className='relative border border-white rounded-full p-2 text-main-500 hover:text-[#FEFFFF] bg-[#FEFFFF] cursor-pointer '
              onMouseEnter={() => setIsHoverPlay(true)}
              onMouseLeave={() => setIsHoverPlay(false)}
            >
              <div className='w-8 h-8'></div>
              <span className='z-50 absolute top-0 left-0 right-0 bottom-0 p-2'><BsPlayFill size={32}/></span >
              {isHoverPlay && <span className='absolute top-[-1px] bottom-[-1px] left-[-1px] right-[-1px] rounded-full bg-main-500 animate-scale-up-img'></span>}
            </span>
          </div>
          <div className='flex ic gap-6 mt-4'>
            <span className='text-sm font-semibold text-[#FEFFFFCC]'>{`${Number(searchPlaylist?.totalFollow.toFixed(1)).toLocaleString()} người quan tâm`}</span>
            <button className='uppercase flex gap-1 items-center text-white text-xs border rounded-l-full rounded-r-full  px-[18px] py-[6px]  hover:bg-opacity-80'>
                  <span><AiOutlineUserAdd size={16}/></span>
                  Quan Tâm
            </button>
          </div>
        </div>     
      </div>
      <div className='mt-[30px] px-[59px]'>
        <div className='flex items-center justify-between mb-5'>
          <h3 className='text-xl font-bold text-gray-800'>Bài Hát</h3>
          <div className='flex items-center gap-1 text-gray-500 cursor-pointer hover:text-main-500'>
            <span className='text-xs uppercase font-medium'>Tất cả</span>
            <span><SlArrowRight size={14}/></span>
          </div>
        </div>
        <div className='flex flex-wrap mx-[-20px]'>
          {searchPlaylist?.sections.find(item => item.sectionType === 'song').items.map((i, index) => {
            if(index < 6) {
              return (
                <div key={i.encodeId} className='basis-1/2 px-5'>
                  <List isHideTitle={true} song={i}/>
                </div>
              )
            }
          })}
        </div>
      </div>
      {searchPlaylist?.sections.filter(item => item.sectionType === 'playlist').map((item, index) => (
        <Section key={index} data={item}/>
      ))}
      <div className='w-full px-[59px] mt-12'>
        <h3 className='text-xl font-bold text-gray-800 mb-5'>Bạn có thể thích</h3>
          <div className='flex items-start'>
            {searchPlaylist?.sections.find(item => item.sectionType === 'artist').items.map((item,index) => {
            if(index <= 4) {
              return (
                <div key={item.encodeId} className='basis-1/5 px-4'>
                  <Artists image={item.thumbnailM} name={item.name} follow={item.totalFollow} link={item.link}/>
                </div>
              )
            }
          })}     
        </div>        
      </div>
      <div className='w-full px-[59px] mt-12'>
          <h3 className='text-xl font-bold text-gray-800 mb-5'>{searchPlaylist?.name}</h3>
          <div className='flex'>
            <img src={searchPlaylist?.thumbnailM} alt='thumbnail' className='w-[450px] h-[300px] object-cover rounded-md  mr-[30px]'/>
            <div>
              <p className='text-sm text-[#696969]' dangerouslySetInnerHTML={{__html: searchPlaylist?.biography}}></p>
            </div>
          </div>
      </div>
      </div> : <div className='w-full h-screen   flex items-center justify-center'><Loading/></div>}
    </div>
  )
}

export default Singer