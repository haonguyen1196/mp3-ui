import React, { memo, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import { useDispatch } from 'react-redux';
import { isEqual } from 'lodash';

import bgChart from '../assets/bg-chart.jpg'
import * as actions from '../store/actions'
import icons from '../utils/icons'
import { Link } from 'react-router-dom';
import path from '../utils/path';

const { BsPlayFill } = icons 

const ChartSection = () => {
  const [data, setData] = useState(null)
  const { chart, rank } = useSelector(state => state.app)
  const dispatch = useDispatch()
  const chartRef = useRef(null)
  const [selected, setSelected] = useState(null)
  const [tooltipState, setTooltipState] = useState({
    opacity: 0,
    top: 0,
    left: 0,
  })

  const options = {
    responsive: true,
    pointRadius: 0,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: { display: false },
        grid: { color: 'rgba(255, 255, 255, 0.3)', drawTicks: false },
        border: { dash: [3 , 4]},
        min: chart?.minScore,
        max: chart?.maxScore
      },
      x: {
        ticks: { color: 'white' },
        grid: { color: 'transparent'}
      },
    },
    plugins: {
      legend: false,
      tooltip: {
        enabled: false,
        external: context => {
          const tooltipModel = context.tooltip
          if (!chartRef || !chartRef.current) return
  
          if (tooltipModel.opacity === 0) {
            if (tooltipState.opacity !== 0) setTooltipState(prev => ({ ...prev, opacity: 0 }))
            return
          }
          const counters = []
          for ( let i = 0; i < 3; i++) {
            counters.push({
              data: chart?.items[Object.keys(chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item => item.counter),
              encodeId: Object.keys(chart?.items)[i]
            })
          }
          const result = counters.find(item => item.data.some(counter => counter === +tooltipModel.body[0].lines[0].replace('.','')))
          setSelected(result.encodeId)
          const newTooltipData = {
            opacity: 1,
            left: tooltipModel.caretX,
            top: tooltipModel.caretY,
          }
          if (!isEqual(tooltipState, newTooltipData)) setTooltipState(newTooltipData)
        },
      },
    },
    hover: {
      mode: 'dataset',
      intersect: false
    }
  }

  useEffect(() => {
    const labels = chart?.times?.filter(item => +item.hour % 2 === 0)?.map(item => `${item.hour}:00`)
    const datasets = []
    if(chart.items) {
      for( let i = 0; i < 3; i++) {
        datasets.push({
          data: chart?.items[Object.keys(chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item => item.counter),
          borderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
          tension: 0.2,
          borderWidth: 2,
          pointBackgroundColor: 'white',
          pointHoverRadius: 4,
          pointBorderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
          pointHoverBorderWidth: 4,
        })
      }
      setData({labels, datasets});
    }
  }, [chart]) 
  return (
    <div className='px-[59px] mt-12 rounded-lg relative'>
      <img src={bgChart} alt='bgChart' className='rounded-lg object-cover w-full h-[410px]'/>
      <div className='absolute top-0 right-[59px] left-[59px] bottom-0 bg-gradient-to-b from-[#740091] to-[#2d1a4c] opacity-95 rounded-lg'></div>
      <div className='absolute top-0 right-[59px] left-[59px] bottom-0 p-5'>
        <div className='flex items-center gap-2 mb-4'>
          <Link to={path.ZING_CHART} className='text-[28px] text-white font-bold hover:text-green-800'>#Zingchart</Link>
          <span className='bg-white text-main-500 p-1 rounded-full hover:opacity-90 cursor-pointer'><BsPlayFill size={24}/></span>
        </div >
        <div className='flex gap-6 h-[310px]'>
          <div className='basis-2/6'>
            {rank && rank.map((item, index) => {
              if(index < 3 ) {
                return (
                  <div 
                    key={item.encodeId}
                    className='w-full flex items-center gap-[10px] px-[15px] py-[10px] cursor-pointer bg-[hsla(0,0%,100%,.07)] hover:bg-[hsla(0,0%,100%,0.3)] rounded-md mb-[10px] text-white'
                    onClick={() => {
                      dispatch(actions.setCurSongId(item.encodeId))
                      dispatch(actions.play(true))

                    }}
                  >
                    <span className={`text-3xl font-bold text-[#740091] mr-3 ${index === 0 ? 'text-shadow-no1' : index === 1 ? 'text-shadow-no2' : 'text-shadow-no3'}`}>{index + 1 }</span>
                    <img 
                      className='w-[60px] h-[60px] rounded-md'
                      src={item.thumbnail} alt='thumbnail'
                    />
                    <div className='flex flex-col gap-[3px]'>
                      <span className='text-sm font-medium whitespace-nowrap'>
                        {item.title.length > 20 ? `${item.title.slice(0, 20)}...` : item.title}
                      </span>
                      <span className='text-xs opacity-80 whitespace-nowrap'>{item.artistsNames}</span>
                    </div>
                    <span className='flex justify-end w-full font-bold'>{`${Math.ceil(item.score *100 / chart.totalScore)}%`}</span>
                  </div>
                )
              }
            })}
            <Link to={path.ZING_CHART} className='text-white px-4 py-1 text-sm border border-white rounded-full m-auto w-full block w-fit'>Xem thêm</Link>
          </div>
          <div className='basis-4/6 relative'>
            { data && <Line ref={chartRef} data={data} options={options}/>}
            <div className='tooltip'  style={{ top: tooltipState.top, left: tooltipState.left, opacity: tooltipState.opacity, position: 'absolute'}}>
              {rank && rank.map(item => {
                if (item.encodeId === selected ) {
                  return (
                    <div 
                      key={item.encodeId}
                      className='w-full flex items-center gap-[10px] px-[15px] py-[10px] cursor-pointer bg-[hsla(0,0%,100%,.07)] rounded-md mb-[10px] text-white'
                    >
                      <img 
                        className='w-[60px] h-[60px] rounded-md'
                        src={item.thumbnail} alt='thumbnail'
                      />
                      <div className='flex flex-col gap-[3px]'>
                        <span className='text-sm font-medium whitespace-nowrap'>
                          {item.title.length > 20 ? `${item.title.slice(0, 20)}...` : item.title}
                        </span>
                        <span className='text-xs opacity-80 whitespace-nowrap'>{item.artistsNames}</span>
                      </div>
                    </div>
                  )
                }
              })

              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(ChartSection)