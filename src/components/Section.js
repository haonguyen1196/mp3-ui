import React, { memo } from 'react'

import icons from '../utils/icons'
import { SectionItem } from '../components'

const { SlArrowRight } = icons 

const Section = ({data}) => {
  return (
    <div className='mt-12 px-[59px]'>
      <div className='flex items-center justify-between mb-5'>
        <h3 className='text-xl font-bold text-gray-800'>{data?.title}</h3>
        <div className='flex items-center gap-1 text-gray-500 cursor-pointer hover:text-main-500'>
          <span className='text-xs uppercase font-medium'>Tất cả</span>
          <span><SlArrowRight size={14}/></span>
        </div>
      </div>
      <div className='flex items-start gap-7'>
        {data && data?.items?.map((item, index) => {
          if(index <= 4) {
            return (
              <div key={item.encodeId} className='w-1/5'>
                <SectionItem  item={item} data={data}/>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

export default memo(Section)