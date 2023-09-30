'use client'

import { useRouter } from 'next/navigation'
import './navbar.css'

const Sidebar = () => {
    const router = useRouter();
    const handlePush = () => {
        router.push('/home/vsComputer');
    }

    return (
        <div className="text-center flex flex-col rounded-3xl bg-slate-700 justify-center items-center gap-5  h-[640px]">
            <div className='custom-btn btn-2 mt-4'>
                Play with Friend
            </div>
            <div className='custom-btn btn-2 m-2' onClick={handlePush}>
                Play with Computer
            </div>
        </div>
    )
}

export default Sidebar