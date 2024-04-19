import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PostserDefault from "../assets/default.jpg"
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { MdForum } from 'react-icons/md';
import { Link } from 'react-router-dom';

const OverviewRelations = ({ entry }) => {
  const [dataEntry, setDataEntry] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    try {
      axios.get(`https://api.jikan.moe/v4/manga/${entry.mal_id}/pictures`)
        .then((res) => setDataEntry(res.data.data[0].jpg.image_url))
      setLoading(false)
    } catch (error) {

    }
  }, [entry.mal_id])
  return (
    <>
      {loading ? (<p>Loading...</p>) : (
        <>
          <div className='bg-white flex items-center gap-3 rounded overflow-hidden shadow shadow-light w-full'>
            <div className='h-32 overflow-hidden bg-yellow-500 flex'>
              {dataEntry ? (
                <img src={dataEntry} alt={entry.name} className='object-cover' />
              ) : (<img src={PostserDefault} alt={entry.name} className='object-cover' />)}
            </div>
            <div className='flex flex-col gap-8 '>
              <p className='text-sm uppercase font-bold text-dark/80 '>{entry.name}</p>
              <p className='capitalize'>{entry.type} <span className=' relative -top-1 text-4xl'>.</span> releasing</p>
            </div>
          </div>
        </>)}
    </>
  )
}

const OverviewCharacters = ({ id }) => {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      axios.get(`https://api.jikan.moe/v4/anime/${id}/characters`).then((res) => setCharacters(res.data.data.slice(0, 6)))
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }, [id])

  if (characters.length <= 0) {
    return
  }

  return (
    <>
      {loading ? (<p>Loading</p>) : (
        <>
          <p className='text-xl font-bold text-dark/80'>Characters</p>
          <div className='grid md:grid-cols-2 gap-3'>
            {
              characters.map((character) => {
                console.log()
                return (
                  <div className='flex justify-between items-center bg-white rounded overflow-hidden shadow shadow-light text-sm' key={character.character.mal_id}>
                    <div className='flex gap-2 w-1/2'>
                      {character.character.images.jpg.image_url != null ? (
                        <img className='h-24' src={character.character.images.jpg.image_url} alt={character.character.name} />
                      ) : (
                        <img className='h-24' src={PostserDefault} alt={character.character.name} />
                      )}
                      <div className='relative w-full'>
                        <p className='absolute top-1 '>{character.character.name}</p>
                        <p className='absolute bottom-1'>{character.role}</p>
                      </div>
                    </div>
                    <div className='flex gap-1 w-1/2 justify-end '>
                      <div className='relative w-full'>
                        <p className='absolute top-1 right-1'>
                          {character.voice_actors[0] && character.voice_actors[0].person && character.voice_actors[0].person.name}
                        </p>
                        <p className='absolute bottom-1 right-1'>
                          {character.voice_actors[0] && character.voice_actors[0].person && character.voice_actors[0].person.name}
                        </p>
                      </div>
                      {character.voice_actors[0] && character.voice_actors[0].person && character.voice_actors[0].person.images && character.voice_actors[0].person.images.jpg &&
                        <img className='h-24' src={character.voice_actors[0].person.images.jpg.image_url} alt='' />
                      }
                    </div>
                  </div>
                )
              })
            }
          </div>
        </>
      )}
    </>

  )
}

const OverviewStaff = ({ id }) => {
  const [staff, setStaff] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    try {
      axios.get(`https://api.jikan.moe/v4/anime/${id}/staff`).then((res) => setStaff(res.data.data.slice(0, 6)))
      setLoading(false)
    } catch (error) {

    }
  }, [id])

  return (
    <>
      {loading ? (<p>Loading</p>) : (
        <>
          <p className='text-xl font-bold text-dark/80'>Staff</p>
          <div className='grid md:grid-cols-2 gap-3'>
            {staff.map((staffData) => {
              return (
                <div className='flex justify-between items-center bg-white rounded overflow-hidden shadow shadow-light text-sm' key={staffData.person.mal_id}>
                  <div className='h-24 w-24 overflow-hidden'>
                    <img className='object-cover object-right h-full' src={staffData.person.images.jpg.image_url} alt={""} />
                  </div>
                  <div className='relative w-full flex flex-col gap-9'>
                    <p className='text-dark/80 font-semibold'>{staffData.person.name}</p>
                    <div className='flex gap-1 flex-wrap text-xs'>
                      {staffData.positions.map((position, index) => (
                        <p key={index}>{position}</p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>)}
    </>
  )
}

const OverviewRecommendations = ({ id }) => {
  const [recommendations, setRecommendations] = useState([])
  const [view, setView] = useState(false)
  const [count, setCount] = useState(5)
  const [loading, setLoading] = useState(true)
  const limit = recommendations.slice(0, count)

  if (id != null) {
    useEffect(() => {
      setTimeout(() => {
        try {
          axios.get(`https://api.jikan.moe/v4/anime/${id}/recommendations`)
            .then((res) => setRecommendations(res.data.data))
          setLoading(false)
        } catch (error) {
          console.log("error")
        }
      }, 3000);
    }, [id])

    if (recommendations.length <= 0) return
  }


  const handleView = () => {
    setView(!view)
    if (view == true) {
      setCount(25)
    } else if (view == false) {
      setCount(5)
    }
  }
  return (
    <>
      {loading ? (<p>Loading...</p>) : (
        <>
          <div className='flex justify-between items-center'>
            <p className='text-xl font-bold text-dark/80'>Recommendations</p>
            <p className='font-semibold cursor-pointer' onClick={handleView}>{view ? ("View All Recommendations") : ("View Less")}</p>
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 relative'>
            {limit.map((recommendation) => {
              const url = `/anime/${recommendation.entry.mal_id}/${recommendation.entry.title}`
              const path = decodeURIComponent(url).replace(/\s/g, '-');
              return (
                <Link to={path} key={recommendation.entry.mal_id} className='relative group/recommendation'>
                  <img className='md:h-52 h-64 w-full rounded' src={recommendation.entry.images.jpg.image_url} alt={`poster ${recommendation.entry.title}`} />
                  <div className='absolute top-0 right-5 left-5 md:right-0 md:left-0 md:h-52 h-64 hidden group-hover/recommendation:block'>
                    <div className='absolute p-3 flex bg-dark/80 rounded gap-2 bottom-2 left-2 right-2 justify-between '>
                      <div className='flex items-center gap-3'>
                        <FaThumbsUp size={15} className='fill-light/80' />
                        <FaThumbsDown size={15} className='fill-light/80' />
                      </div>
                      <p className='font-extrabold text-light/80'>+<span>{recommendation.votes}</span></p>
                    </div>
                  </div>
                  <p className='text-sm mt-2 font-semibold text-dark/80'>{recommendation.entry.title}</p>
                </Link>
              )
            })}
          </div>
        </>)
      }
    </>
  )
}

const OverviewForums = ({ id }) => {
  const [forums, setForums] = useState([])
  const [view, setView] = useState(false)
  const [count, setCount] = useState(3)
  const limit = forums.slice(0, count)
  const [loading, setLoading] = useState(true)

  if (id != null) {
    useEffect(() => {
      setTimeout(() => {
        try {
          axios.get(`https://api.jikan.moe/v4/anime/${id}/forum`).then((res) => setForums(res.data.data))
          setLoading(false)
        } catch (error) {
          setLoading(false)
        }
      }, 3000);
    }, [id])
    if (forums.length <= 0) return
  }
  const handleView = () => {
    setView(!view)
    if (view == true) {
      setCount(forums.length)
    } else if (view == false) {
      setCount(3)
    }
  }


  return (
    <>
      {loading ? (<p>Loading...</p>) : (<>
        <p className='text-xl font-bold text-dark/80'>Threads</p>
        <div className='lg:w-1/2   gap-3 relative flex flex-col'>
          {limit.map((forum) => {
            return (
              <div className='flex justify-between items-center bg-white rounded overflow-hidden shadow shadow-light text-sm' key={forum.mal_id}>
                <ForumsUser data={forum} handleView={handleView} view={view} />
              </div>
            )
          })}
        </div>
      </>)}

    </>
  )
}

const ForumsUser = ({ data, handleView, view }) => {
  const [users, setUsers] = useState([])
  if (data != null) {
    useEffect(() => {
      setTimeout(() => {
        try {
          axios.get(`https://api.jikan.moe/v4/users/${data.author_username}`).then((res) => setUsers(res))
        } catch (error) {
        }
      }, 1000);
    }, [data.author_username])
  }
  return (
    <>
      <p className='absolute right-0 -top-9 text-lg' onClick={handleView}>{!view ? ("view all") : ("close")}</p>
      {users.status == 200 && (
        <div className='p-5 flex justify-between relative w-full'>
          <div className='flex flex-col gap-3'>
            <div className='flex justify-between items-start gap-4'>
              <p className='text-lg font-semibold text-dark/80'>{data.title}</p>
              <p className='flex gap-2 items-center font-semibold'><MdForum size={20} />{data.comments}</p>
            </div>
            <div className='flex items-center justify-start gap-3'>
              <div className='h-10 w-10 overflow-hidden'>
                {users.data.data.images.jpg.image_url != null ? (
                  <img src={users.data.data.images.jpg.image_url} className='h-full w-full object-cover' alt={`foto profile user name ${data.author_username}`} />
                ) : (
                  <img src={PostserDefault} className='h-full w-full object-cover' alt={`foto profile user name ${data.author_username}`} />
                )}
              </div>
              <p className='font-semibold text-dark/80 hover:text-sky-500 cursor-pointer'>{data.author_username}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const Overview = ({ anime }) => {
  return (
    <div className='flex flex-col gap-3 mx-3 md:mx-0'>
      <p className='text-xl font-bold text-dark/80'>Relations</p>
      <div className='grid md:grid-cols-2 gap-3'>
        {anime.relations[0].entry.map((entry) => (
          <OverviewRelations entry={entry} key={entry.mal_id} />
        ))}
      </div>
      <OverviewCharacters id={anime.mal_id} />
      <OverviewStaff id={anime.mal_id} />
      <div>
        <p className='text-xl font-bold text-dark/80'>Trailer</p>
        <iframe
          className='rounded shadow shadow-light mt-2 w-full'
          width="560"
          height="315"
          src={`${anime.trailer.embed_url}&mute=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </div>
      <OverviewRecommendations id={anime.mal_id} />
      <OverviewForums id={anime.mal_id} />

    </div>
  )
}

export default Overview