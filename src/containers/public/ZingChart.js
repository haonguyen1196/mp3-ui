import React, { useEffect, useRef, useState } from 'react'
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import { isEqual } from 'lodash';

import * as apis from '../../apis'
import bgChart from '../../assets/bg-chart.jpg'
import icons from '../../utils/icons'
import { Loading, RankList } from '../../components'

const { BsPlayFill } = icons

const ZingChart = () => {
  const [data, setData] = useState(null)
  const [chartData, setChartData] = useState(null)
  const chartRef = useRef(null)
  const [selected, setSelected] = useState(null)
  const ref = useRef()
  
  useEffect(() => {
    ref?.current?.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
  },[])

  const [tooltipState, setTooltipState] = useState({
    opacity: 0,
    top: 0,
    left: 0,
  })

  useEffect(() => {
    const fetchChart = async() => {
      const response = await apis.apiChart()
      if (response.data.err === 0) {
        setChartData(response.data.data)
      }
    }
    fetchChart()
  }, [])

  useEffect(() => {
    const labels = chartData?.RTChart.chart?.times?.filter(item => +item.hour % 2 === 0)?.map(item => `${item.hour}:00`)
    const datasets = []
    if(chartData?.RTChart.chart.items) {
      for( let i = 0; i < 3; i++) {
        datasets.push({
          data: chartData?.RTChart.chart?.items[Object.keys(chartData?.RTChart.chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item => item.counter),
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
  }, [chartData])

  const options = {
    responsive: true,
    pointRadius: 0,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: { display: false },
        grid: { color: 'gray', drawTicks: false },
        border: { dash: [3 , 4]},
        min: chartData?.RTChart?.chart?.minScore,
        max: chartData?.RTChart?.chart?.maxScore
      },
      x: {
        ticks: { color: 'gray' },
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
              data: chartData?.RTChart.chart?.items[Object.keys(chartData?.RTChart.chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item => item.counter),
              encodeId: Object.keys(chartData?.RTChart.chart?.items)[i]
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

  return (
    <div className='w-full mt-[-70px]'>
      { chartData ? <div>
        <div  ref={ref} className='relative'>
        <img  src={bgChart} alt='chart' className='w-full h-[550px] grayscale object-cover'/>
        <div className='absolute top-0 left-0 bottom-0 right-0 bg-main-300 opacity-90 '></div>
        <div className='absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-t from-main-300 to-transparent'></div>
        <div className='flex items-center gap-2 absolute top-1/4 left-0 bottom-1/2 right-0 px-[59px]'>
          <span className='text-[40px] font-bold text-main-500'>#Zingchart</span>
          <span className='bg-main-500 p-2 text-white rounded-full hover:opacity-90 cursor-pointer'><BsPlayFill size={24}/></span>
        </div >
        <div className='absolute top-1/2 left-0 bottom-0 right-0 px-[59px]'>
            { data && <Line ref={chartRef} data={data} options={options}/>}
            <div className='tooltip'  style={{ top: tooltipState.top, left: tooltipState.left, opacity: tooltipState.opacity, position: 'absolute'}}>
              {chartData?.RTChart?.items.map(item => {
                if (item.encodeId === selected ) {
                  return (
                    <div 
                      key={item.encodeId}
                      className='w-full flex items-center gap-[10px] px-[15px] py-[10px] cursor-pointer bg-main-500 rounded-md mb-[10px] text-white'
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
      <div className=' px-[59px] w-full'>
        <RankList data={chartData?.RTChart}/>
      </div>
      <div className='relative mt-[30px] w-full h-[570px]'>
        <img src={bgChart} alt='chart' className='w-full h-full grayscale object-cover'/>
        <div className='absolute top-0 left-0 bottom-0 right-0 bg-main-300 opacity-90 '></div>
        <div className='absolute top-0 left-0  right-0 bottom-0 px-[59px] pt-[30px]'>
          <span className='text-[40px] font-bold text-main-500 mb-5 block'>Bảng Xếp Hạng Tuần</span>
          <div className='flex mx-[-14px]'>
            {chartData && Object.entries(chartData?.weekChart)?.map((item, index) => (
              <div key={index} className='px-[14px] flex-1 '>
                <div  className='px-[10px] py-[20px] rounded-md bg-main-200 '>
                  <h3 className='text-2xl font-bold text-main-500 pl-10'>{item[0] ==='vn' ? 'Việt Nam' : item[0] === 'us' ? 'US-UK' : item[0] === 'korea' ? 'K-Pop' : ''}</h3>
                  <div className=''>
                    <RankList link={item[1].link} order={5} isHide data={item[1]}/>
                  </div>
                </div>
              </div>
            ))}
          </div >
        </div >
      </div>
      </div> : <div className='w-full h-screen flex items-center justify-center'><Loading/></div>}
    </div>
  )
}

export default ZingChart