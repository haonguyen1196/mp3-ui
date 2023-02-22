import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import icons from '../utils/icons'
import { Search } from './'

const { BsArrowRight, BsArrowLeft} = icons

const Header = () => {
const { singer } = useParams()
const navigate = useNavigate()

  return (
    <div className='w-full flex justify-between items-center '>
      <div className='w-full flex items-center gap-6'>
        <div className='flex gap-6'>
          <span className='cursor-pointer' onClick={() => navigate(-1)}><BsArrowLeft size={20} color={`${ singer ? 'white' : '#A0A7AA'}`}/></span>
          <span className='cursor-pointer' onClick={() => navigate(1)}><BsArrowRight size={20} color={`${ singer ? 'white' : '#A0A7AA'}`}/></span>
        </div>
        <div className='w-1/2'>
          <Search />
        </div>
      </div>
      <div className='text-2xl font-bold text-gray-500'>
        Login
      </div>
    </div>
  )
}

export default Header