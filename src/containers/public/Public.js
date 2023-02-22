import { Outlet, useParams } from "react-router-dom";
import { useState } from "react"
import { Scrollbars } from 'react-custom-scrollbars-2';


import { Header, SidebarLeft, SidebarRight } from "../../components"
import Player from "../../components/Player";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";

function Public() {
    const { singer } = useParams()
    const [isShowSideBarRight, setIsShowSideBarRight] = useState(false)
    const [isScroll, setIsScroll] = useState(true)
  const { curSongId } = useSelector(state => state.music)


    const handleScroll = (e) => {
        if(e.target.scrollTop === 0) {
            setIsScroll(true)
        } else {
            setIsScroll(false)
        }
    }
    return ( 
        <div className="flex flex-col w-full h-screen bg-main-300 relative overflow-hidden">
            <div className="flex flex-auto h-full">
                <div className=" w-[70px] min-[1024px]:w-[240px] h-full flex-none shadow-lg">
                    <SidebarLeft />
                </div>
                <div className="flex-auto"> 
                    <div className={`${!isScroll ? 'bg-main-300 drop-shadow-sm' : 'bg-transparent'} h-[70px] px-[59px] flex items-center fixed top-0 left-0 right-0 ml-[70px] min-[1024px]:ml-[240px] z-40`}>
                        <Header />
                    </div>
                    <Scrollbars 
                        onScroll={handleScroll}
                        autoHide 
                        style={{ width: '100%', height: `${curSongId? '80vh' : '100vh'}`  }}
                    >
                        <Outlet/>
                    </Scrollbars>
                </div>
                <div className={`shadow-lg w-[329px] absolute top-0 right-0 bottom-0 flex-none bg-main-300 z-50 ${isShowSideBarRight ? 'block animate-slide-left' : 'hidden'}`}>
                    <SidebarRight />
                </div>
            </div>
            <div className={`h-[90px] flex-none bg-main-400 fixed bottom-0 right-0 left-0 z-50 ${curSongId ? 'block' : 'hidden'}`}>
                <Player onShowSideBarRight={setIsShowSideBarRight}/>
            </div>
        </div>
    );
}

export default Public;