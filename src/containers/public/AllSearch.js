import React from 'react'
import { useSelector } from 'react-redux'
import { List, SectionItem, Artists } from '../../components'

import { handleNumber } from '../../utils/fn'
import icons from '../../utils/icons'

const { SlArrowRight } = icons

const AllSearch = () => {
  const { searchData } = useSelector(state => state.music)
  return (
    <div className='w-full px-[59px]'>
      <div>
        <h3 className='text-xl font-bold text-gray-700 mb-5'>Nổi Bật</h3>
        {searchData.top &&
        <div className='flex gap-[14px]'>
          <div className='flex-1 flex items-center h-[104px] p-[10px] bg-main-200 rounded-md hover:bg-slate-100 cursor-pointer'>
            <img className={`w-[84px] h-[84px] mr-4 ${searchData.top.objectType === "artist" && 'rounded-full'}`} src={searchData.top.thumbnail} alt='thumbnail'/>
            <div>
              <div className='text-xs text-gray-500 mb-[6px] font-medium'>Nghệ sĩ</div>
              <div className='text-sm text-gray-700 font-bold'>{searchData.top.name}</div>
              <div className='text-xs font-medium text-gray-500 mt-[2px]'>{handleNumber(searchData.artists[0].totalFollow)}</div>
            </div>
          </div>
          {
            searchData.songs && searchData.songs.filter((item, index) => [...Array(2).keys()].some(i => i === index))?.map(item => (
              <div key={item.encodeId} className='flex-1 flex items-center h-[104px] p-[10px] bg-main-200 hover:bg-slate-100 cursor-pointer rounded'>
                <img className={`w-[84px] h-[84px] mr-4`} src={item.thumbnail} alt='thumbnail'/>
                <div>
                  <div className='text-xs text-gray-500 mb-[6px] font-medium'>Bài hát</div>
                  <div className='text-sm text-gray-700 font-bold'>{item.title}</div>
                  <div className='text-xs font-medium text-gray-500 mt-[2px]'>{item.artistsNames}</div>
                </div>
            </div>
          ))
          }
          
        </div>}
      </div>
      <div className='mt-12'>
        <div className='flex items-center justify-between mb-5'>
          <h3 className='text-xl font-bold text-gray-800'>Bài Hát</h3>
          <div className='flex items-center gap-1 text-gray-500 cursor-pointer hover:text-main-500'>
            <span className='text-xs uppercase font-medium'>Tất cả</span>
            <span><SlArrowRight size={14}/></span>
          </div>
        </div>
        <div className='flex flex-wrap mx-[-20px]'>
          {searchData.songs && searchData.songs.map((item) => (
            <div key={item.encodeId} className='basis-1/2 px-5'>
              <List isHideTitle isHideNote song={item}/>
            </div>
          ))}
        </div>
      </div>
      <div className='mt-12'>
        <div className='flex items-center justify-between mb-5'>
          <h3 className='text-xl font-bold text-gray-800'>Playlist/Album</h3>
          <div className='flex items-center gap-1 text-gray-500 cursor-pointer hover:text-main-500'>
            <span className='text-xs uppercase font-medium'>Tất cả</span>
            <span><SlArrowRight size={14}/></span>
          </div>
        </div>
        <div className='flex items-start justify-between gap-7'>
        {searchData && searchData?.playlists?.map((item, index) => {
          if(index <= 4) {
            return (
              <div key={item.encodeId}>
                <SectionItem key={item.encodeId} item={item} data={searchData?.playlists}/>
              </div >
            )
          }
        })}
        </div>
      </div>
      <div className='mt-12'>
        <div className='flex items-center justify-between mb-5'>
          <h3 className='text-xl font-bold text-gray-800'>Nghệ sĩ/OA</h3>
          <div className='flex items-center gap-1 text-gray-500 cursor-pointer hover:text-main-500'>
            <span className='text-xs uppercase font-medium'>Tất cả</span>
            <span><SlArrowRight size={14}/></span>
          </div>
        </div>
        <div className='flex items-start mx-[-16px]'>
        {searchData && searchData?.artists?.map((item, index) => {
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
    </div>
  )
}

export default AllSearch