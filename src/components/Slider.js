import React, { useEffect, memo } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { getArrSlider } from '../utils/fn'
import * as actions from '../store/actions'

const Slider = () => {
    const { banner } = useSelector(state => state.app)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        const sliders = document.getElementsByClassName('slider-item')
        let min = 0
        let max = 2
        const timeId = setInterval(() => {
            const list = getArrSlider(min, max, sliders.length -1)
            for (let i = 0; i < sliders.length; i++) {
                // handle delete add classlist slider
                sliders[i].classList.remove('animate-slide-right', 'order-last', 'z-20')
                sliders[i].classList.remove('animate-slide-left', 'order-first', 'z-10')
                sliders[i].classList.remove('animate-slide-left-2', 'order-2', 'z-10')

               if( list.some(item => item === i)) {
                sliders[i].style.display = 'block';
               } else {
                sliders[i].style.display = 'none';
            }}

            // handle animate slider
            list.forEach( item => {
                if(item === max) {
                    sliders[item]?.classList?.add('animate-slide-right', 'order-last', 'z-20')
                } else if(item === min) {
                    sliders[item]?.classList?.add('animate-slide-left', 'order-first', 'z-10')
                }else {
                    sliders[item]?.classList?.add('animate-slide-left-2', 'order-2', 'z-10')
                }
            })

            min = (min === sliders.length - 1) ? 0 : min + 1
            max = (max === sliders.length - 1) ? 0 : max + 1
        }, 2500)
        return () => {
            clearInterval(timeId)
        }
    },[])


    const handleClickBanner = (item) => {
        if( item.type === 1) {
            dispatch(actions.setCurSongId(item.encodeId))
            dispatch(actions.play(true))
            dispatch(actions.playAlbum(false))
            dispatch(actions.setPlayList(null))
        } else if( item.type === 4 ) {
            const playListLink = item?.link.split('.')
            navigate(playListLink[0])
        } else {
            dispatch(actions.playAlbum(false))
        }
    }
    return (
        <div className='flex gap-8 w-full h-[240px] overflow-hidden px-[59px] pt-8'>
            {banner?.map( item => (
                <img 
                    key={item.encodeId} 
                    src={item.banner}
                    className={`slider-item w-[30%] rounded-lg object-cover flex-1 ${item <=2 ? 'block' : 'hidden'} cursor-pointer`}
                    alt=''
                    onClick={() => handleClickBanner(item)}
                />
            ))}
        </div>
    )
}

export default memo(Slider)