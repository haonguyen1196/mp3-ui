import React, { useState } from 'react'
import { useNavigate, createSearchParams, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import icons from '../utils/icons'
import * as apis from '../apis'
import path from '../utils/path'
import * as actions from '../store/actions'

const { TfiSearch } = icons

const Search = () => {
  const [keyword, setKeyWord] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { singer } = useParams()

  const handleSearch = async (e) => {
    if(e.keyCode === 13 ) {
      navigate({
        pathname: `/${path.SEARCH}/${path.ALL}`,
        search: createSearchParams({
          q: keyword
        }).toString()
      })
      dispatch(actions.setSearchData(keyword))
    }
  }

  return (
    <div className='w-full flex items-center'>
        <div className={`flex items-center justify-center text-[#757575] ${ singer ? 'bg-[rgba(0,0,0,0.1)]' : 'bg-[#DDE4E4]'}  h-10 rounded-l-[20px] pl-3`}>
            <TfiSearch size={20} color={`${ singer ? 'white' : '#ccc'}`}/>
        </div>
        <input 
            type='text'
            className={`${ singer ? 'bg-[rgba(0,0,0,0.1)] text-white' : 'bg-[#DDE4E4] text-gray-500'} h-10 w-full rounded-r-[20px] px-3 py-2 outline-none`}
            placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
            value={keyword}
            onChange={(e) => setKeyWord(e.target.value)}
            onKeyUp={handleSearch}
        />
    </div>
  )
}

export default Search