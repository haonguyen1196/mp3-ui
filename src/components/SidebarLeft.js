import React from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import logo from '../assets/logo.svg'
import { sidebarMenu } from '../utils/menu'
import path from  '../utils/path'

const notActiveStyle = 'flex items-center gap-3 px-[25px] py-2 text-[13px] text-[#32323D] font-bold'
const activeStyle = 'flex items-center gap-3 px-[25px] py-2 text-[13px] text-main-500 font-bold'

const SidebarLeft = () => {
  const navigate = useNavigate()
  return (
    <div className='bg-main-200 h-full'>
      <div onClick={() => navigate(path.HOME)} className='w-full h-[70px] flex justify-start items-center min-[1024px]:px-[25px] cursor-pointer'>
        <img src={logo} alt="logo" className='w-[120px] h-10 hidden min-[1024px]:block'/>
        <img src='https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.8.38/static/media/icon_zing_mp3_60.f6b51045.svg' alt="logo" className='w-[120px] h-10 block min-[1024px]:hidden w-[45px] h-[45px] mx-auto'/>
      </div>
      <div>
        {sidebarMenu.map(item => (
          <NavLink end={item.end} to={item.path} key={item.path} className={({ isActive }) =>  isActive ? activeStyle : notActiveStyle}>
            {item.icons}
            <span className='min-[1024px]:block hidden'>{item.text}</span>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default SidebarLeft