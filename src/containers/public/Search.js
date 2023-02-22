import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'

import { searchMenu } from '../../utils/menu'
import path from '../../utils/path'

const styleActive = 'h-12 leading-[48px] mx-5 cursor-pointer hover:text-main-500 text-main-500 border-b border-b-main-500 '
const styleDontActive = 'h-12 leading-[48px] mx-5 cursor-pointer hover:text-main-500'

const Search = () => {
  const { keyword } = useSelector(state => state.music)

  return (
    <div className='mt-[70px]'>
        <div className='h-12 border-b border-gray-400 px-[59px] flex items-center mb-7'>
          <h3 className='text-2xl font-bold text-gray-700 pr-5 border-r border-gray-400'>Kết quả tìm kiếm</h3>
          <div className='h-12 text-sm font-medium text-gray-600 uppercase flex items-center'>
            {searchMenu && searchMenu.map((item, index) => (
              <div  key={index}>
                <NavLink className={({ isActive }) => isActive ? styleActive : styleDontActive } to={`${item.path}?q=${keyword.replace(' ','+')}`}>{item.text}</NavLink>
              </div>

            ))}
          </div>
        </div>
        <Outlet/>
    </div>
  )
}

export default Search