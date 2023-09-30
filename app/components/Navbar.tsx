'use client'

import { useState } from 'react'
import Image from 'next/image'
import './navbar.css'
import { signOut, useSession } from 'next-auth/react';
import Button from './Button';
import { useRouter } from 'next/navigation';

type Variant = 'puzzles' | 'learn' | 'commmunity' |'tools' |'watch' | '' | undefined;

const Navbar = () => {
    const [active, setActive] = useState<Variant>('');

    const session = useSession();

    const router = useRouter();

    const handleLogOut = () => {
        signOut();
        router.push('/');
    }

    return (
        <nav className='bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-b-sm'>
            <div className='flex justify-between'>
                <div>
                    <div className='flex items-center p-2 hover:cursor-pointer' onClick={() => setActive('')}>
                        <Image alt='logo' height={45} width={45} src="/assets/queen.png"></Image>
                        <div className='font-semibold font-serif text-emerald-300' >Chess.IO</div>
                    </div>
                </div>
                <div className='flex font-sans font-medium gap-10 items-center'>
                    <div className={` px-3 py-1 text-white rounded-full hover:cursor-pointer ${active === 'puzzles' ? ' bg-violet-500 focus:outline-none focus:ring focus:ring-violet-300' : 'hover:bg-violet-300'}`} onClick={() => setActive('puzzles')} >
                        <p>Puzzles</p>
                    </div>
                    <div className={` px-3 py-1 text-white rounded-full hover:cursor-pointer ${active === 'learn' ? ' bg-violet-500 focus:outline-none focus:ring focus:ring-violet-300' : 'hover:bg-violet-300'}`} onClick={() => setActive('learn')}>
                        <p>Learn</p>
                    </div>
                    <div className={` px-3 py-1 text-white rounded-full hover:cursor-pointer ${active === 'watch' ? ' bg-violet-500 focus:outline-none focus:ring focus:ring-violet-300' : 'hover:bg-violet-300'}`} onClick={() => setActive('watch')}>
                        <p>Watch</p>
                    </div>
                    <div className={` px-3 py-1 text-white rounded-full hover:cursor-pointer ${active === 'commmunity' ? ' bg-violet-500 focus:outline-none focus:ring focus:ring-violet-300' : 'hover:bg-violet-300'}`} onClick={() => setActive('commmunity')}>
                        <p>Community</p>
                    </div>
                    <div className={` px-3 py-1 text-white rounded-full hover:cursor-pointer ${active === 'tools' ? ' bg-violet-500 focus:outline-none focus:ring focus:ring-violet-300' : 'hover:bg-violet-300'}`} onClick={() => setActive('tools')}>
                        <p>Tools</p>
                    </div>
                </div>
                <div className='text-white flex items-center'>
                    {session.data ? (
                        <div className='flex justify-center items-center gap-1'>
                            <Image height={40} width={40} alt='image' src={session.data?.user?.image || '/assets/avatarPlaceholder.png'} className='rounded-full' />
                            <Button danger onClick={handleLogOut}>Log Out</Button>
                        </div>
                    ): (
                        <div>
                            <button className='bg-violet-500 rounded-full px-4 py-2 text-white' onClick={() => router.push('/')} >
                                Login
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar   