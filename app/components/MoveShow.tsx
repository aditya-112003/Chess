'use-client'

import { divide } from 'lodash'
import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiFillFlag } from 'react-icons/ai'

interface moveshowprops {
    chesspos: string | null
    handleBackMove: () => void
    handleFrontMove: () => void
    handleReset: () => void
    opponent: string
    user: string
    currentMoveIndex : number
}

const MoveShow: React.FC<moveshowprops> = ({
    chesspos,
    handleBackMove,
    handleFrontMove,
    handleReset,
    opponent,
    user,
    currentMoveIndex
}) => {
    const moves = chesspos?.match(/\b[PNBRQK]?[a-h]?[1-8]?x?[a-h][1-8](?:=[NBRQ])?[+#]?|O-O(-O)?\b/g);

    console.log(moves);

    return (
        <div className='bg-slate-700 rounded-md flex flex-col w-[300px]'>
            <div className='flex items-center gap-2 m-2 '>
                <div className="w-3 h-3 rounded-full bg-green-400 border-2 border-green-600"></div>
                <div className='text-white font-bold text-md'>{opponent}</div>
            </div>
            <div className='grid grid-cols-2 max-h-[200px] max overflow-y-auto'>
                {moves && moves.map((move, index ) => (
                    <div key={index} className={` ${index % 4 == 0 || index % 4 == 1 ? 'bg-slate-400' : 'bg-slate-600'} `}>
                        {index % 2 === 0 ? (
                            <div className='flex items-center'>
                                {index / 2 + 1}{" . "}
                                <span className={`h-fit w-fit rounded-sm  ${currentMoveIndex===index+1 ? 'bg-white' : 'hover:bg-gray-500'}  m-[2px]`}>
                                    {move}
                                </span>
                            </div>
                        ) : (
                            <div>
                                <div>
                                    <div className={`h-fit w-fit rounded-sm ${currentMoveIndex===index+1 ? 'bg-white' : 'hover:bg-gray-500'} m-[2px]`}>
                                        {move}
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                ))}
            </div>
            <div className='grid grid-cols-4 gap-2 m-2'>
                <div className='bg-white flex items-center justify-center rounded-sm py-1 px-2 hover:bg-gray-200' onClick={handleReset}>
                    <AiOutlinePlus size={25} />
                </div>
                <div className='bg-white flex items-center justify-center rounded-sm py-1 px-2 hover:bg-gray-200' onClick={handleBackMove}>
                    <AiOutlineArrowLeft size={25} />
                </div>
                <div className='bg-white flex items-center justify-center rounded-sm py-1 px-2 hover:bg-gray-200' onClick={handleFrontMove}>
                    <AiOutlineArrowRight size={25} />
                </div>
                <div className='bg-white flex items-center justify-center rounded-sm py-1 px-2 hover:bg-gray-200'>
                    <AiFillFlag size={25} />
                </div>
            </div>
            <div className='flex items-center gap-2 m-2 '>
                <div className="w-3 h-3 rounded-full bg-green-400 border-2 border-green-600"></div>
                <div className='text-white font-bold text-md'>{user}</div>
            </div>
        </div>
    )
}

export default MoveShow