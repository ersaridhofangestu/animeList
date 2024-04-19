import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Characters = ({ anime }) => {
    const [characters, setCharacters] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        try {
            axios.get(`https://api.jikan.moe/v4/anime/${anime.mal_id}/characters`).then((res) => setCharacters(res.data.data))
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }, [anime.mal_id])

    if (characters.length <= 0) {
        return
    }

    return (
        <>
            {loading ? (<p>Loading</p>) : (
                <div className='px-3 md:px-0'>
                    <p className='text-xl font-bold text-dark/80'>Characters</p>
                    <div className='grid md:grid-cols-2 gap-3 mt-2'>
                        {
                            characters.map((data) => {
                                return (
                                    <div className='flex justify-between items-center bg-white rounded overflow-hidden shadow shadow-lighttext-sm' key={data.character.mal_id}>
                                        <div className='flex gap-2 w-1/2'>
                                            {data.character.images.jpg.image_url != null ? (
                                                <img className='h-24 ' src={data.character.images.jpg.image_url} alt={data.character.name} />
                                            ) : (
                                                <img className='h-24' src={PostserDefault} alt={data.character.name} />
                                            )}
                                            <div className='relative w-full'>
                                                <p className='absolute top-1 '>{data.character.name}</p>
                                                <p className='absolute bottom-1'>{data.role}</p>
                                            </div>
                                        </div>
                                        <div className='flex gap-1 w-1/2 justify-end '>
                                            <div className='relative w-full'>
                                                <p className='absolute top-1 right-1'>
                                                    {data.voice_actors[0] && data.voice_actors[0].person && data.voice_actors[0].person.name}
                                                </p>
                                                <p className='absolute bottom-1 right-1'>
                                                    {data.voice_actors[0] && data.voice_actors[0].person && data.voice_actors[0].person.name}
                                                </p>
                                            </div>
                                            {data.voice_actors[0] && data.voice_actors[0].person && data.voice_actors[0].person.images && data.voice_actors[0].person.images.jpg &&
                                                <img className='h-24' src={data.voice_actors[0].person.images.jpg.image_url} alt='' />
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )}
        </>

    )
}

export default Characters