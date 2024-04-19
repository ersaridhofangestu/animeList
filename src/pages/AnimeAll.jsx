import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ItemBig } from '../components/Groups'
import { FaBackspace, FaSearch } from 'react-icons/fa'
import Loading from '../Loading'
import Fragment from '../Fragment'

const AnimeAll = () => {
    const { pages } = useParams()
    const [param, setParam] = useState(null)
    const [namePage, setNamePage] = useState(null)
    const [count, setCount] = useState(1)
    const [animeAll, setAnimeAll] = useState(null)
    const [topAnime, setTopAnime] = useState(null)
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState([])

    useEffect(() => {
        const filter = () => {
            if (pages === "trendingNow") {
                setParam("airing");
                setNamePage("trending now");
            } else if (pages === "populerThisSeason") {
                setParam("bypopularity");
                setNamePage("populer this season");
            } else if (pages === "upcommingNextSeason") {
                setParam("upcoming");
                setNamePage("upcoming next season");
            } else if (pages === "allTimePopular") {
                setParam("favorite");
                setNamePage("all time popular");
            }
        };
        if (pages != "topAnime") {
            const fetchingData = async () => {
                try {
                    const res = await axios.get(`https://api.jikan.moe/v4/top/anime?filter=${param}&page=${count}`);
                    setAnimeAll(res);
                } catch (error) {
                    console.error("Error fetching data:", error);
                } finally {
                    setLoading(false);
                }
            }

            if (pages != null) {
                filter()
                if (param != null) {
                    fetchingData()
                }
            }
        } else {
            async function fetchData(page) {
                const response = await axios.get(`https://api.jikan.moe/v4/top/anime?page=${page}`);
                return response.data.data;
            }

            async function combineData(pages) {
                let combinedData = [];
                for (let page of pages) {
                    const data = await fetchData(page);
                    combinedData = combinedData.concat(data);
                }
                return combinedData;
            }

            const pages = [1, 2, 3, 4];
            combineData(pages)
                .then(combinedData => {
                    setAnimeAll(combinedData)
                })
                .catch(error => {
                    console.error('Error:', error);
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    }, [param, count])
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
    }

    const increment = () => {
        if (count >= 1 && count < animeAll.data.pagination.items.per_page) {
            setCount(count + 1)
            setLoading(true);
        }
    }


    const decrement = () => {
        if (count <= animeAll.data.pagination.items.per_page && count > 1) {
            setCount(count - 1)
            setLoading(true);
        }
    }

    return (
        <>
            {loading ? <Loading /> : (
                <Fragment>
                    {pages != "topAnime" && animeAll.status == 200 && (
                        <div className='w-full py-10 px-[1rem] lg:p-0 lg:py-32 lg:px-5 max-w-[66rem] mx-auto overflow-hidden flex flex-col gap-5'>
                            <div className='flex items-center gap-2 bg-white p-3 rounded shadow-md shadow-light'>
                                <FaSearch className='fill-dark/50' />
                                <input onKeyDown={handleKeyPress} size={130} className='bg-transparent focus:outline-none' placeholder='Search anime...' />
                            </div>
                            <div className='flex items-center justify-start gap-4'>
                                <FaBackspace className='fill-dark/50 hover:fill-red-600' size={30} onClick={toggleBack} />
                                <p className='text-3xl font-bold text-dark/50 uppercase'>{namePage}</p>
                            </div>
                            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-10'>
                                <>
                                    {search != null && search.length >= 1 ? (
                                        <ItemBig api={search} />
                                    ) : (
                                        <>
                                            {animeAll.data.data !== null &&
                                                (<ItemBig api={animeAll.data.data} />)}
                                        </>
                                    )}
                                </>

                            </div>
                            <div className='flex justify-center items-center gap-5 font-bold text-dark/50 text-2xl mt-10'>
                                <button onClick={decrement} className="uppercase hover:text-sky-500">back</button>
                                <p>{count}/{animeAll.data.pagination.items.per_page}</p>
                                <button onClick={increment} className="uppercase hover:text-sky-500" >next</button>
                            </div>
                        </div>
                    )}
                    {pages == "topAnime" && (
                        <div className='w-full py-10 px-[1rem] lg:p-0 lg:py-32 lg:px-5 max-w-[66rem] mx-auto overflow-hidden flex flex-col gap-5'>
                            <div className='flex items-center gap-2 bg-white p-3 rounded shadow-md shadow-light'>
                                <FaSearch className='fill-dark/50' />
                                <input onKeyDown={handleKeyPress} size={130} className='bg-transparent focus:outline-none' placeholder='Search anime...' />
                            </div>
                            <div className='flex items-center justify-start gap-4'>
                                <FaBackspace className='fill-dark/50 hover:fill-red-600' size={30} onClick={toggleBack} />
                                <p className='text-3xl font-bold text-dark/50 uppercase'>Top 100 anime </p>
                            </div>
                            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3'>
                                <>
                                    {search != null && search.length >= 1 ? (
                                        <ItemBig api={search} />
                                    ) : (
                                        <>
                                            {animeAll !== null &&
                                                (<ItemBig api={animeAll} number={true} />)}
                                        </>
                                    )}
                                </>

                            </div>
                        </div>
                    )}
                </Fragment>)}

        </>
    )

}

export default AnimeAll