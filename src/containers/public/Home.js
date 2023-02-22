import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Sliders from "react-slick";

import { Loading } from '../../components'

import {Slider, Section, NewRelease, ChartSection, Artists} from '../../components'

function Home() {
  const {banner, friday, newSong, top100, xone, newMusic, weekChart, trendArtist, singer } = useSelector(state => state.app)
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7
  };

    return ( 
        <div className='overflow-hidden w-full mt-[70px]'>
            {(banner, friday && newSong && top100 && xone && newMusic && weekChart && trendArtist) ? 
            <div className='w-full pb-16'>
                <Slider />
                <Section data={friday}/>
                <Section data={trendArtist}/>
                <Section data={newSong}/>
                <NewRelease />
                <Section data={top100}/>
                <ChartSection />
                <div className='flex px-[59px] items-center gap-7 mt-8'>
                    {weekChart && weekChart.map(item => (
                        <Link to={item.link.split('.')[0]} key={item.link} className='rounded-md'>
                            <img src={item.cover} alt='cover' className='rounded-md' />
                        </Link>
                    ))}
                </div>
                <div className='px-[59px] mt-8 mx-[-16px] w-full'>
                    <Sliders {...settings}>
                        {singer && singer?.map(item => (
                            <div key={item.id} className='w-1/5 px-4'>
                                <Artists  image={item.thumbnail} name={item.name} follow={item.totalFollow} link={item.link}/>
                            </div>
                        )
                        )}
                    </Sliders>
                </div>
                {xone && <Section data={xone}/>}
                <Section data={newMusic}/>
            </div> : <div className='w-full h-screen flex items-center justify-center translate-y-[-140px]'><Loading /></div>}
        </div>
    );
}

export default Home;