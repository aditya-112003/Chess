'use client'

import { Chessboard } from "react-chessboard"
import { Chess } from "chess.js"
import { useState, useEffect } from 'react'
import Button from "../components/Button"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

const Page =  () => {

    const [chess] = useState(new Chess());
    // chess.move('e4');
    // chess.move('e5');
    // chess.move('d4');
    const [position, setPosition] = useState(chess.fen())


    const makeRandomMove = () => {
        if (!chess.isGameOver()) {
            const moves = chess.moves();
            const move = moves[Math.floor(Math.random() * moves.length)];
            chess.move(move);
            // // setChess(chess.pgn());
            setPosition(chess.fen());
            console.log(chess.fen());
        }
    }
    const [disabled, setDisabled] = useState(false)
    const handleOnClick = () => {
        setInterval(makeRandomMove, 1200);
        setDisabled(true);
    }
    return (
        <>
            <Navbar />
            <div className="flex items-center justify-evenly">
                <Sidebar />
                <div className="flex items-center justify-center h-[91vh]">
                    <div>
                        <Chessboard boardWidth={600} customBoardStyle={{ borderRadius: "4px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.8)" }} position={position} animationDuration={500} areArrowsAllowed={false} arePiecesDraggable={false} />
                    </div>
                    <Button danger disabled={disabled} type="button" onClick={handleOnClick}>
                        Press Me
                    </Button>
                </div>  
            </div>
        </>
    )
}

export default Page