import { useEffect, useState } from 'react'
import axios from "axios"
import { GroupsComponent, ItemBig, ItemSmall } from "./components/Groups"
import Loading from "./Loading"
import { FaBackspace, FaSearch } from 'react-icons/fa'
import Fragment from './Fragment'

const Anime = () => {
  const [trendingNow, setTrendingNow] = useState([])
  const [populerThisSeason, setPopulerThisSeason] = useState([])
  const [upcommingNextSeason, setUpcommingNextSeason] = useState([])
  const [allTimePopular, setAllTimePopular] = useState([])
  const [topAnime, setTopAnime] = useState([])
  const [search, setSearch] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchingData1 = async () => {
      try {
        const [trendingNowData, populerThisSeasonData, upcommingNextSeasonData] = await Promise.all([
          axios.get("https://api.jikan.moe/v4/top/anime?filter=airing&limit=5&page=1"),
          axios.get("https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=5&page=1"),
          axios.get("https://api.jikan.moe/v4/top/anime?filter=upcoming&limit=5&page=1"),
        ])
        setTrendingNow(trendingNowData.data.data)
        setPopulerThisSeason(populerThisSeasonData.data.data)
        setUpcommingNextSeason(upcommingNextSeasonData.data.data)
      } catch (error) {
        console.log("fetching data invalid =>", { error })
      }
    }
    const fetchingData2 = async () => {
      try {
        const [allTimePopularData, topAnimeData] = await Promise.all([
          axios.get("https://api.jikan.moe/v4/top/anime?filter=favorite&limit=5&page=1"),
          axios.get("https://api.jikan.moe/v4/top/anime?limit=10&page=1"),
        ])
        setTopAnime(topAnimeData.data.data)
        setAllTimePopular(allTimePopularData.data.data)
      } catch (error) {
        console.log("fetching data invalid =>", { error })
      } finally {
        setLoading(false);
      }
    }

    fetchingData1()
    setTimeout(() => {
      fetchingData2()
    }, 5000);

  }, [])


  const searchInput = (q) => {
    if (q.length >= 3) {
      axios.get(`https://api.jikan.moe/v4/anime?q=${q}`).then((res) => {
        setSearch(res.data.data);
      }).catch((error) => {
        console.log("error search => ", error);
      });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchInput(event.target.value);
    }
  };

  const toggleBack = () => {
    setSearch(null)
    handleKeyPress(null)
  }
  return (
    <>
      {!loading ? (<Loading />) : (
        <>
          <Fragment >
            <div className='ng-blue-500 w-full py-10 px-[1rem] lg:p-0 lg:py-52 lg:px-0 flex flex-col gap-14 max-w-[66rem] mx-auto overflow-hidden'>
              <div className='flex items-center gap-2 bg-white p-3 rounded shadow-md shadow-light'>
                <FaSearch className='fill-dark/50' />
                <input onKeyDown={handleKeyPress} size={130} className='bg-transparent focus:outline-none' placeholder='Search anime...' />
              </div>
              {search !== null && search.length >= 1 ? (
                <>
                  <FaBackspace className='-mt-6 -mb-12 fill-dark/50 hover:fill-red-600' size={30} onClick={toggleBack} />
                  <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 `}>
                    <ItemBig api={search} />
                  </div>
                </>
              ) : (
                <>

                  {
                    trendingNow.length > 1 && (
                      <GroupsComponent title={"tranding now"} href={`/anime/trendingNow`} >
                        <ItemBig api={trendingNow} />
                      </GroupsComponent>
                    )
                  }

                  {populerThisSeason.length > 1 && (
                    <GroupsComponent title={"populer this season"} href={`/anime/populerThisSeason`} >
                      <ItemBig api={populerThisSeason} />
                    </GroupsComponent>
                  )}
                  {upcommingNextSeason.length > 1 && (
                    <GroupsComponent title={"upcomming next season"} href={`/anime/upcommingNextSeason`} >
                      <ItemBig api={upcommingNextSeason} />
                    </GroupsComponent>
                  )}
                  {allTimePopular.length > 1 && (
                    <GroupsComponent title={"all time popular"} href={`/anime/allTimePopular`} >
                      <ItemBig api={allTimePopular} />
                    </GroupsComponent>
                  )}
                  {topAnime.length > 1 && (
                    <>
                      <div className='block lg:hidden'>
                        <GroupsComponent title={"top 25 anime"} href={`/anime/${"topAnime"}`} >
                          <ItemBig api={topAnime} number={true} />
                        </GroupsComponent>
                      </div>
                      <div className='hidden lg:block'>
                        <GroupsComponent title={"top 25 anime"} href={`/anime/${"topAnime"}`} >
                          <ItemSmall api={topAnime} />
                        </GroupsComponent>
                      </div>
                    </>
                  )}
                </>
              )}
            </div >
          </Fragment>
        </>)}
    </>
  )
}

export default Anime