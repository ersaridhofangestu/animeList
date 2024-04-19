import axios from "axios"
import { useEffect, useState } from "react"

const Staff = ({ anime }) => {
    const [staff, setStaff] = useState([])
    const [loading, setLoading] = useState(true)

    if (anime.mal_id != null) {
        useEffect(() => {
            try {
                axios.get(`https://api.jikan.moe/v4/anime/${anime.mal_id}/staff`).then((res) => setStaff(res.data.data))
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        }, [anime.mal_id])
    }

    return (
        <>
            {loading ? (<p>Loading</p>) : (
                <>
                    <p className='text-xl font-bold text-dark/80'>Staff</p>
                    <div className='grid grid-cols-2 gap-3 mt-2'>
                        {staff.map((staffData) => {
                            return (
                                <div className='flex justify-between items-center bg-white rounded overflow-hidden shadow shadow-light text-sm' key={staffData.person.mal_id}>
                                    <div className='h-24 w-24 overflow-hidden'>
                                        <img className='object-cover object-right h-full' src={staffData.person.images.jpg.image_url} alt={`foto ${staffData.person.name}`} />
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

export default Staff