'use client'
import React from 'react'

import './test.css'
import Image from "next/image"
import Button from "../components/Button"
import { BsGoogle, BsGithub } from 'react-icons/bs'
import { useState, MouseEvent, useCallback } from "react";
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { signIn } from 'next-auth/react'

function throttle<T extends (...args: any[]) => any>(
    func: T,
    delay: number
): (...args: Parameters<T>) => void {
    let lastCall = 0;
    return (...args: Parameters<T>) => {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return func(...args);
    };
}

const Page = () => {
    const [mode, setMode] = useState('Login')
    const [rotate, setRotate] = useState({ x: 0, y: 0 });
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    
    const router = useRouter();

    const onMouseMove = useCallback(
        throttle((e: MouseEvent<HTMLDivElement>) => {
            const card = e.currentTarget;
            const box = card.getBoundingClientRect();
            const x = e.clientX - box.left;
            const y = e.clientY - box.top;
            const centerX = box.width / 2;
            const centerY = box.height / 2;
            const rotateX = (y - centerY) / 100;
            const rotateY = (centerX - x) / 100;

            setRotate({ x: rotateX, y: rotateY });
        }, 100),
        []
    );

    const toggleMode = () => {
        if (mode === 'Login') {
            setMode('Register');
        } else {
            setMode("Login");
        }
    }

    const onMouseLeave = () => {
        setRotate({ x: 0, y: 0 });
    };

    const handleFormSubmit = async (e: any) => {
        e.preventDefault();

        if (mode === 'Register') {
            try {
                const resUserExists = await fetch('/api/userExists', {
                    method: 'POST',
                    headers: {
                        'Content-Type': "application/json",
                    },
                    body: JSON.stringify({ email })
                })

                const { user } = await resUserExists.json();
                if (user) {
                    toast.error("User Already Exists!!");
                    return;
                }

                const response = await fetch('/api/register', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name, email, password
                    })
                });

                if (response.ok) {
                    toast.success("Registered Succesfully !!");
                    const form = e.target;
                    form.reset();
                    router.push('/home');
                } else {
                    console.log("User Registration Failed!!");
                    toast.error("User Registration Failed!!");
                }
            } catch (error) {
                console.log("error in registration", error);
            }
        } else {
            try {
                const response = await signIn('credentials', {
                    email,
                    password , 
                    redirect : false,
                })
                
                if(response?.error){
                    toast.error("Invalid Credentials !!");
                    return;
                }
                toast.success("Logged In !!")
                router.push('/home');
            } catch (error) {
                console.log("error in login", error);
            }
        }
    }

    return (
        <div className="flex justify-center items-center hoja h-screen ">
            <div className="flex rounded-2xl bg-white card relative transition-[all_400ms_cubic-bezier(0.03,0.98,0.52,0.99)_0s] will-change-transform h-auto " onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                style={{
                    transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
                    transition: "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s",
                }}>
                <Image alt="login-side" src="/assets/chessboardside.webp" height={350} width={350} className="rounded-l-2xl" />
                <div className="flex flex-col text-center items-center justify-center  border-emerald-700 border-r-2 border-t-2 border-b-2 rounded-r-2xl">
                    <p className="text-2xl text-emerald-800 flex font-semibold font-serif m-4 p-3">
                        {mode} to your Account
                    </p>
                    <div className="relative w-[275px]">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t  border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white text-gray-400 ">Use Credentials</span>
                        </div>
                    </div>

                    <form onSubmit={handleFormSubmit}>
                        {mode === 'Register' && (
                            <div className="flex flex-col items-start mt-6">
                                <p className="text-xs text-emerald-900 block leading-6 font-small font-medium ">
                                    Name
                                </p>
                                <input type="text" id="text" className=" w-[275px] h-[30px] border-2 border-gray-300 rounded-md text-sm p-3" onChange={(e) => setName(e.target.value)} required />
                            </div>
                        )}
                        <div className="flex flex-col items-start mt-3">
                            <p className="text-xs text-emerald-900 block leading-6 font-small font-medium ">
                                Email Address
                            </p>
                            <input type="email" id="email" className=" w-[275px] h-[30px] border-2 border-gray-300 rounded-md text-sm p-3" onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="flex flex-col items-start mt-3">
                            <p className="text-xs text-emerald-900 block leading-6 font-small font-medium ">
                                Password
                            </p>
                            <input type="password" id="password" className="w-[275px] h-[30px] border-2 border-gray-300 rounded-md text-sm p-3" onChange={(e) => setPassword(e.target.value)} required />
                        </div>

                        <div className="w-[275px] mt-4">
                            <Button green fullWidth type='submit'>
                                {mode === 'Login' ? 'Sign In' : 'Register'}
                            </Button>
                        </div>
                    </form>
                    <div className="my-4 relative w-[275px]">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t  border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white text-gray-400 ">Or continue with</span>
                        </div>
                    </div>
                    <div className="flex gap-2 w-[275px]">
                        <button type="button" onClick={() => { }} className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0">
                            <BsGithub />
                        </button>
                        <button type="button" onClick={() => { }} className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0">
                            <BsGoogle />
                        </button>
                    </div>
                    <div className="flex gap-2 justify-center text-sm my-2 px-2 text-gray-500">
                        <div>
                            {mode === 'Login' ? "New to Messenger ?" : "Already have an account ?"}
                        </div>
                        <div onClick={toggleMode} className="underline cursor-pointer">
                            {mode === 'Login' ? 'Create an account' : 'Login'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page