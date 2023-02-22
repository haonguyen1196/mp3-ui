import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import List from '../../components/List'

import * as actions from '../../store/actions'
const SongSearch = () => {
  const { searchData } = useSelector(state => state.music)
  const dispatch = useDispatch()
  const { songs } = useSelector(state => state.music)
  
  useEffect(() => {
    dispatch(actions.setArtistSong(searchData?.top?.id))
  }, [searchData])
  
  return (
    <div className='w-full px-[59px]'>
      <h3 className='text-xl text-gray-700 font-bold mb-[10px]'>Bài Hát</h3>
      {songs && songs.map(item => (
        <div key={item.encodeId}>
          <List song={item}/>
        </div> 
      ))}
    </div>
  )
}

export default SongSearch