import icons from './icons'

const { MdOutlineLibraryMusic, BsDisc, TbChartArcs, MdOutlineFeed } = icons

export const sidebarMenu = [
    {
        path: 'mymusic',
        text: 'Cá Nhân',
        icons: <MdOutlineLibraryMusic size={20}/>
    },
    {
        path: '',
        text: 'Khám Phá',
        end: true,
        icons: <BsDisc size={20}/>
    },
    {
        path: 'zing-chart',
        text: '#zingchart',
        icons: <TbChartArcs size={20}/>
    },
    {
        path: 'follow',
        text: 'Theo Dõi',
        icons: <MdOutlineFeed size={20}/>
    },
]

export const searchMenu = [
    {
        path: 'tat-ca',
        text: 'Tất cả',
    },
    {
        path: 'bai-hat',
        text: 'Bài hát',
        end: true,
    },
    {
        path: 'playlist',
        text: 'Playlist/Album',
    }
]