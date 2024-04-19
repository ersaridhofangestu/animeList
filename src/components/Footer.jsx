import { Link } from 'react-router-dom'

const FooterComponent = () => {
    return (
        <footer className='bg-dark w-full text-light'>
            <div className='max-w-[66rem]  mx-auto p-10  lg:grid grid-cols-6'>
                <div className='col-span-2'>
                    <p>Reference Design</p>
                    <div className='flex items-center gap-2 justify-start'>
                        <div className='flex flex-col items-center gap-2'>
                            <p className='ml-4'>Design  </p>
                            <p className='ml-4'>Api </p>
                        </div>
                        <div className='flex flex-col items-center font-extrabold gap-3'>
                            <p>:</p>
                            <p>:</p>
                        </div>
                        <div className='flex flex-col items-center gap-2'>
                            <Link to={"https://anilist.co/"} className='col-span-2 hover:text-sky-500 uppercase text-xl font-bold cursor-pointer'>Anilist.co</Link>
                            <Link to={"https://jikan.moe/"} className='col-span-2 hover:text-sky-500 uppercase text-xl font-bold cursor-pointer'>Jikan.moe</Link>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <Link to={"/"} className='hover:text-sky-500 cursor-not-allowed'>Donate</Link>
                    <Link to={"/"} className='hover:text-sky-500 cursor-not-allowed'>AniList.co</Link>
                    <Link to={"/"} className='hover:text-sky-500 cursor-not-allowed'>AniChart.net</Link>
                </div>
                <div className='flex flex-col gap-4'>
                    <Link to={"/"} className='hover:text-sky-500 cursor-not-allowed'>Apps</Link>
                    <Link to={"/"} className='hover:text-sky-500 cursor-not-allowed'>Site Stats</Link>
                    <Link to={"/"} className='hover:text-sky-500 cursor-not-allowed'>Recommendations</Link>
                    <Link to={"/"} className='hover:text-sky-500 cursor-not-allowed'>API</Link>
                </div>
                <div className='flex flex-col gap-4'>
                    <Link to={"/"} className='hover:text-sky-500 cursor-not-allowed'>Discord</Link>
                    <Link to={"/"} className='hover:text-sky-500 cursor-not-allowed'>Twitter</Link>
                    <Link to={"/"} className='hover:text-sky-500 cursor-not-allowed'>Facebook</Link>
                    <Link to={"/"} className='hover:text-sky-500 cursor-not-allowed'>GitHub</Link>
                </div>
                <div className='flex flex-col gap-4'>
                    <Link to={"/"} className='hover:text-sky-500 cursor-not-allowed'>Add Data</Link>
                    <Link to={"/"} className='hover:text-sky-500 cursor-not-allowed'>Moderators</Link>
                    <Link to={"/"} className='hover:text-sky-500 cursor-not-allowed'>Contact</Link>
                    <Link to={"/"} className='hover:text-sky-500 cursor-not-allowed'>Terms & Privacy</Link>
                    <Link to={"/"} className='hover:text-sky-500 cursor-not-allowed'>Site Map</Link>
                </div>
            </div>
            <p className='text-center p-3 border-t border-light/50'> © 2024 <Link to={"/"} className='hover:text-blue-500' >Ersa Ridho Fangestu</Link>. Seluruh hak cipta dilindungi undang-undang.
            </p>
        </footer>
    )
}

export default FooterComponent