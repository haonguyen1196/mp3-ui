import React, { memo } from 'react'
import { ThreeCircles } from 'react-loader-spinner'

const Loading = () => {
  return (
    <ThreeCircles
        height="100"
        width="100"
        color="#0F7070"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
    />
  )
}

export default memo(Loading)