import React, { useEffect, useState, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { List } from '../components'

const RankList = ({data, isHide , order, link, isHideButton}) => {
    const [isShowFull, setIsShowFull] = useState(false)
    const [songs, setSongs] = useState(null)
    const Navigate = useNavigate()

    
  useEffect(() => {
    if (isShowFull) {
      setSongs(data?.items)
    } else {
      setSongs(data?.items?.filter((item, index) =>  index < (order ? order : 10) ))
    }
  },[isShowFull, data])

  return (
    <div className='w-full mt-4'>
        {songs?.map((item, index) => (
          <List order={index + 1} isHideNote isHideTitle={isHide ? true : false} key={item.encodeId} song={item}/>
        ))}
       {!isHideButton &&  <button 
          onClick={() => link ? Navigate(link.split('.')[0]) : setIsShowFull(prev => !prev)}
          className='px-6 py-2 border border-main-500 text-main-500 text-sm font-semibold rounded-l-full rounded-r-full leading-[100%] hover:bg-main-200 mx-auto block mt-5'
        >{ isShowFull ? 'Ẩn bớt' : 'Xem tất cả'}
        </button>}
    </div>
  )
}

export default memo(RankList)