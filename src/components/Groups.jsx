import { Link } from 'react-router-dom'

const GroupsComponent = ({ children, title, link = "view all", grid = "grid", href }) => {
    return (
        <div className="w-full flex flex-col gap-4">
            <div className='flex justify-between items-center text-2xl text-dark/50'>
                <Link to={href} className='uppercase font-bold hover:text-sky-500'>{title}</Link>
                <Link to={href} className='capitalize hover:text-sky-500'>{link}</Link>
            </div>
            <div className={`${grid} grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3`}>
                {children}
            </div>
        </div>

    )
}

const ItemBig = ({ api, number = false }) => {
    return (
        <>
            {api.map((anime, index) => {
                const url = `/anime/${anime.mal_id}/${anime.title}`
                const path = decodeURIComponent(url).replace(/\s/g, '-');
                return (
                    <Link to={path} key={anime.mal_id} className='relative group/anime'>
                        {anime.images.jpg.image_url !== null && (
                            <>
                                <img src={anime.images.jpg.image_url} alt={`poster ${anime.title}`}
                                    className='w-full h-72 rounded-lg' width={300} height={500} />
                                {number && (
                                    <p className='absolute -top-2 -left-2 rounded-full text-xl font-semibold bg-white w-10 h-10 flex justify-center items-center'>{index + 1}</p>
                                )}
                            </>

                        )}
                        <div className='absolute hidden top-0 group-hover/anime:flex bg-dark/70 w-full h-72 rounded-lg p-4 flex-col gap-1 capitalize text-light font-semibold text-sm'>
                            <p className='flex justify-end items-center'>{anime.season} {anime.year}</p>
                            {anime.studios.map((studio) => (
                                <span key={studio.mal_id} className='font-extrabold text-lg text-sky-500' >{studio.name} </span>
                            ))}
                            <p>{anime.type} show</p>
                            <div className='flex gap-1 items-center'>
                                {anime.episodes !== null ? (<p>{anime.episodes} episodes </p>) : (<p>movies</p>)}
                            </div>
                            <p>{anime.rating}</p>
                            <p>{anime.score}</p>
                            <div className='flex flex-wrap gap-1 absolute bottom-4 left-4 right-4'>
                                {anime.genres.map((genre) => (
                                    <p className='bg-sky-500 py-1 px-3 text-sm rounded-full' key={genre.mal_id}>{genre.name}</p>
                                ))}
                            </div>
                        </div >
                        <p>{anime.title}</p>
                    </Link >
                )
            })}
        </>
    )
}


const ItemSmall = ({ api }) => {
    return (
        <div className='flex flex-col gap-3 w-screen'>
            {api.map((anime, index) => {
                const url = `/anime/${anime.mal_id}/${anime.title}`
                const path = decodeURIComponent(url).replace(/\s/g, '-');
                return (
                    <div className='flex items-center gap-5 text-sm' key={anime.mal_id}>
                        <p className='text-4xl font-bold w-20 text-dark/50'>#{index + 1}</p>
                        <Link to={path} className='flex items-center bg-white p-3 rounded w-full' key={anime.mal_id}>
                            <div className='flex items-center gap-5 justify-start w-1/2'>
                                <img src={anime.images.jpg.image_url} alt={`poster ${anime.title}`} className='rounded w-12' width={300} height={500} />
                                <div className='flex flex-col gap-2'>
                                    <p className="font-bold" >{anime.title}</p>
                                    <div className='flex flex-wrap gap-1 text-white'>
                                        {anime.genres.map((genre) => (
                                            <p className='bg-sky-500 py-1 px-3 text-sm rounded-full' key={genre.mal_id}>{genre.name}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-10 text-dark/80 justify-end">
                                <div className='flex flex-col gap-2'>
                                    <p className='font-semibold capitalize'>{anime.score}%</p>
                                    <p>{anime.members} users</p>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    {anime.episodes !== 1 ? (
                                        <>
                                            <p className='font-semibold capitalize'>{anime.type} show</p>
                                            <p>{anime.episodes} episodes</p>
                                        </>
                                    ) : (
                                        <>
                                            <p className='font-semibold capitalize'>{anime.type}</p>
                                            <p>{anime.duration}</p>
                                        </>
                                    )}

                                </div>
                                <div className='flex flex-col gap-2'>
                                    <p className='font-semibold capitalize'>{anime.season} {anime.year}</p>
                                    <p>{anime.status}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export { GroupsComponent, ItemBig, ItemSmall }