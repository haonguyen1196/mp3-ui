import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Home, Login, Public, WeekRank, ZingChart, Search, SongSearch, AllSearch, Singer, PlaylistSearch } from "./containers/public"
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import * as actions from './store/actions'
import path from "./utils/path"
import Playlist from './containers/public/PlayList'
import * as apis from './apis'

function App() {
  const dispatch = useDispatch()
  const [chartData, setChartData] = useState({})

  useEffect(() => {
    dispatch(actions.getHome())
    const fetchChart = async() => {
      const response = await apis.apiChart()
      if (response.data.err === 0) {
        setChartData(response.data.data.weekChart)
      }
    }
      fetchChart()
  }, [])
  
  return (
    <>
      <div className="">
        <Routes>
          <Route path={path.PUBLIC} element={<Public />}>
            <Route path={path.HOME} element={<Home />}/>
            <Route path={path.LOGIN} element={<Login />}/>
            <Route path={path.PLAYLIST__TITLE__PID} element={<Playlist />}/>
            <Route path={path.ALBUM__TITLE__PID} element={<Playlist />}/>
            <Route path={path.WEEKCHART__TITLE__PID} element={<WeekRank dataWeekChart={Object.values(chartData)}/>}/>
            <Route path={path.ZING_CHART} element={<ZingChart />}/>
            <Route path={path.HOME_SINGER} element={<Singer />}/>
            <Route path={path.HOME_ARTIST_SINGER} element={<Singer />}/>
            <Route path={path.SEARCH} element={<Search />}>
              <Route path={path.SONG} element={<SongSearch />}/>
              <Route path={path.ALL} element={<AllSearch />}/>
              <Route path={path.PLAYLIST_SEARCH} element={<PlaylistSearch />}/>
            </Route>

            <Route path={path.STAR} element={<Home />}/>
          </Route>
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </>
  );
}

export default App;
