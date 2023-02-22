import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SectionItem } from '../../components'

import * as actions from '../../store/actions'

const PlaylistSearch = () => {
  const dispatch = useDispatch()
  const { searchData } = useSelector(state => state.music)
  const { searchPlaylist } = useSelector(state => state.music)
  console.log(searchPlaylist);

  useEffect(() => {
    dispatch(actions.setArtist(searchData?.top?.alias))
  }, [searchData])

  return (
    <div className='w-full px-[59px]'>
      <h3 className='text-xl font-bold text-gray-700 mb-[10px]'>Playlist/Album</h3>
      <div className='flex flex-wrap mx-[-14px]'>
        {searchPlaylist?.sections[1]?.items?.map(item => (
          <div key={item.encodeId} className='w-1/5 px-[14px] mb-4'>
            <SectionItem  item={item} data={searchPlaylist}/>
          </div>
        ))}
      </div >
    </div>
  )
}

export default PlaylistSearch