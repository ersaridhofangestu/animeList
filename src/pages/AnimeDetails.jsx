import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { FaHeart, FaStar } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import PosterDefault from "../assets/default.jpg"
import Overview from '../containers/Overview'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Characters from '../containers/Characters'
import Staff from '../containers/Staff'
import Loading from "../Loading"
import Fragment from "../Fragment"

const AnimeDetails = () => {
    const { id } = useParams()
    const [anime, setAnime] = useState([])
    const [synopsis, setSynopsis] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetch = async () => {
            try {
                const [animeData] = await Promise.all([
                    axios.get(`https://api.jikan.moe/v4/anime/${id}/full`)
                ])
                setAnime(animeData.data.data)
                setLoading(() => { if (animeData.length != null) { setLoading(false) } })
            } catch (error) {

            }
        }
        fetch()
    }, [id])

    const handleSynopsis = () => setSynopsis(!synopsis)



    return (
        <>
            {loading ? (<Loading />) : (
                <>
                    <Fragment>
                        {anime.length !== 0 && (
                            <>
                                <div className='bg-white'>
                                    {anime.trailer.images.maximum_image_url != null ? (
                                        <div className='w-full h-80 overflow-hidden '>
                                            <img src={anime.trailer.images.large_image_url} className='w-full -mt-20' />
                                        </div>
                                    ) : (
                                        <div className='w-full h-80 overflow-hidden bg-dark/10' />
                                    )}
                                    <div className='pt-80  md:grid grid-cols-4 max-w-[66rem] mx-auto gap-5 -mt-80 text-dark/80'>
                                        <div className='absolute top-10 flex justify-center items-center md:relative md:ml-0 md:-mt-40 w-full md:pb-7'>
                                            <div className='flex justify-center items-center flex-col gap-3 w-56 bg-white md:bg-transparent md:p-0 md:shadow-transparent p-2 shadow-light md:pb-7 shadow-md'>
                                                {anime.images.jpg.large_image_url != null ? (
                                                    <img src={anime.images.jpg.large_image_url} alt={`postser ${anime.title}`} />
                                                ) : (
                                                    <img src={PosterDefault} alt='there are no posters' />
                                                )}
                                                <div className='grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-5 w-full relative'>
                                                    <p className='md:col-span-3 p-2 bg-sky-500 text-center text-light rounded font-semibold capitalize hover:text-white transition-colors duration-300 md:w-full w-32'>add to list</p>
                                                    <div className='flex justify-center items-center w-1/3 md:w-full h-full bg-red-600 rounded transition-colors duration-300 absolute md:relative right-0'>
                                                        <FaHeart className='fill-white' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-span-4 md:col-span-3 px-3 md:px-0 w-full md:flex flex-col gap-5 mt-24 md:mt-5 z-10 text-center justify-center'>
                                            <p className='text-dark/80 font-light text-2xl'>{anime.title}</p>
                                            <div className='group/synopsis relative pb-9 text-xs  md:text-sm'>
                                                <p>{anime.synopsis}
                                                    {synopsis && (<span className='block mt-2'>#{anime.background}</span>)}
                                                    {anime.background !== null && (
                                                        <span onClick={handleSynopsis} className='hidden absolute bottom-0 group-hover/synopsis:block bg-white left-0 right-0 text-center bg-gradient-to-b from-transparent to-white bg-opacity-20  py-5' >read more</span>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='max-w-[66rem] mx-auto md:grid grid-cols-4 gap-5'>
                                    <div className='flex flex-col gap-5 text-sm overflow-scroll md:overflow-visible '>
                                        <p className='bg-white mt-5 p-3 rounded hidden md:flex items-center gap-2 capitalize font-semibold'>
                                            <FaStar size={12} fill='orange' />
                                            #{anime.score} highest rated all time
                                        </p>
                                        <p className='bg-white mt-5 p-3 rounded hidden md:flex items-center gap-2 capitalize font-semibold'>
                                            <FaHeart size={12} fill='red' />
                                            #{anime.rank} highest rated all time
                                        </p>
                                        <div className='bg-white mt-5 p-3 rounded flex md:flex-col center md:gap-4 capitalize font-semibold overflow-auto gap-5 '>
                                            {anime.episodes != null ? (
                                                <div className='flex-shrink-0 '>
                                                    <p>airing</p>
                                                    <p className='font-normal'>Ep {anime.episodes}:{anime.duration}</p>
                                                </div>
                                            ) : (
                                                <div className='flex-shrink-0 '>
                                                    {anime.duration != "Unknown" && (
                                                        <>
                                                            <p>movies</p>
                                                            <p className='font-normal'>{anime.duration}</p>
                                                        </>
                                                    )
                                                    }
                                                </div>
                                            )}
                                            {anime.type != null && (
                                                <div className='flex-shrink-0 '>
                                                    <p>Format</p>
                                                    <p className='font-normal'>{anime.type}</p>
                                                </div>
                                            )}
                                            {anime.status != null && (
                                                <div className='flex-shrink-0 '>
                                                    <p>Status</p>
                                                    <p className='font-normal'>{anime.status}</p>
                                                </div>
                                            )}
                                            {anime.aired.string != null && (
                                                <div className="flex-shrink-0 ">
                                                    <p>Start And finish Date</p>
                                                    <p className='font-normal'>{anime.aired.string}</p>
                                                </div>
                                            )}
                                            <div className="flex-shrink-0 ">
                                                <p>Season</p>
                                                <p className='font-normal'>{anime.season} {anime.year}</p>
                                            </div>
                                            <div className="flex-shrink-0 ">
                                                <p>Studios</p>
                                                {anime.studios.map((studio) => (
                                                    <p className='font-normal' key={studio.mal_id}>{studio.name}</p>
                                                ))}
                                            </div>
                                            <div className="flex-shrink-0 ">
                                                <p>Source</p>
                                                <p className='font-normal'>{anime.source}</p>
                                            </div>
                                            <div className="flex-shrink-0 ">
                                                <p>Hashtag</p>
                                                <div className='flex gap-3 md:flex-col'>
                                                    {anime.titles.map((title, index) => (
                                                        <p className='font-normal' key={index} >#{title.title}</p>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex-shrink-0 ">
                                                <p>Gendres</p>
                                                <div className='flex gap-3 md:flex-col'>
                                                    {anime.genres.map((genre) => (
                                                        <p className='font-normal' key={genre.mal_id}>{genre.name}</p>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex-shrink-0 ">
                                                <p>English</p>
                                                <p className='font-normal'>{anime.title_english}</p>
                                            </div>
                                            <div className="flex-shrink-0 ">
                                                <p>Japanenes</p>
                                                <p className='font-normal'>{anime.title_japanese}</p>
                                            </div>
                                            {anime.title_synonyms != "DN" && (
                                                <div className="flex-shrink-0 ">
                                                    <p>Synonyms</p>
                                                    {anime.title_synonyms.map((synonym, index) => (
                                                        <p className='font-normal' key={index}>{synonym}</p>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className='col-span-3 mt-4 flex flex-col gap-8 pb-10 relative'>
                                        <Tabs>
                                            <TabList className={"flex justify-around md:absolute top-0 left-0 right-0 md:-mt-12 capitalize font-semibold text-dark/80 z-50 bg-white md:bg-transparent py-2 md:py-0 mb-3"}>
                                                <Tab className={"cursor-pointer focus:outline-none"} >Overview</Tab>
                                                <Tab className={"cursor-pointer focus:outline-none"} >Characters</Tab>
                                                <Tab className={"cursor-pointer focus:outline-none"} >Staff</Tab>
                                            </TabList>

                                            <TabPanel>
                                                <Overview anime={anime} />
                                            </TabPanel>
                                            <TabPanel>
                                                <Characters anime={anime} />
                                            </TabPanel>
                                            <TabPanel>
                                                <Staff anime={anime} />
                                            </TabPanel>
                                        </Tabs>
                                    </div>
                                </div>
                            </>
                        )}
                    </Fragment>
                </>)}


        </>
    )
}




export default AnimeDetails