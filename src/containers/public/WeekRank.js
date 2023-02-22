import React from 'react'
import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router-dom'

import bgWeekChart from '../../assets/bg-week-chart.jpg'
import { RankList } from '../../components'
import icons from '../../utils/icons'

const { BsPlayFill } = icons

const noneActiveStyle = 'text-2xl font-bold uppercase mr-10 text-gray-800 hover:text-main-500'
const isActiveStyle = 'text-2xl font-bold uppercase mr-10 text-main-500 border-b-2 border-main-500 py-2'

const WeekRank = ({dataWeekChart}) => {
  const { pid } = useParams()

  return (
    <div className='w-full '>
      <div className='relative'>
        <img src={bgWeekChart} alt='chart' className='w-full h-[450px] grayscale object-cover'/>
        <div className='absolute top-0 left-0 bottom-0 right-0 bg-main-300 opacity-70 '></div>
        <div className='absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-t from-main-300 to-transparent'></div>
        <div className='absolute top-0 left-0 right-0 px-[59px] mt-[110px]  pb-10'>
          <div className='flex items-center gap-2  mb-[30px]'>
            <span className='text-[40px] font-bold text-main-500'>Bảng Xếp Hạng Tuần</span>
            <span className='bg-main-500 p-2 text-white rounded-full hover:opacity-90 cursor-pointer'><BsPlayFill size={24}/></span>
          </div>
          {dataWeekChart?.map(item => (
            <NavLink key={item.chartId} to={item.link.split('.')[0]} className={({isActive}) =>  isActive ? isActiveStyle : noneActiveStyle}>{item.country ==='vn' ? 'Việt Nam' : item.country === 'us' ? 'US-UK' : item.country === 'korea' ? 'K-Pop' : ''}</NavLink>
          ))}
          <RankList isHideButton order={100} data={dataWeekChart?.find(item => item.link.includes(pid))}/>
        </div >
      </div>
    </div>
  )
}

export default WeekRank