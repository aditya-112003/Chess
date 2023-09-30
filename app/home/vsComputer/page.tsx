'use client'

import { useEffect, useMemo, useState } from "react";
import { Chessboard } from "react-chessboard";
import Engine from "@/public/engine";
import { Chess } from "chess.js";
import ChatWindow from "@/app/components/ChatWindow";

const page = () => {
  const chessEngine = useMemo(() => new Engine(), []);
  const game = useMemo(() => new Chess(), []);

  const [position, setPosition] = useState(game.fen());
  const [rightClickedSquares, setRightClickedSquares] = useState<any>({});
  const [backgroundColor , setBackgroundColor] =useState({});

  const computerMove = () => {
    try {
      chessEngine.evaluatePosition(game.fen(), 5);

    } catch (error) {
      console.log("error in computerMove", error);
    }
  }

  useEffect(() => {
    chessEngine.onMessage(({ bestMove }) => {
      if (bestMove) {
        const moveDetails = {
          from: bestMove?.substring(0, 2),
          to: bestMove?.substring(2, 4),
          promotion: bestMove.substring(4, 5),
        };
        console.log("Move details:", moveDetails);
      }
      if (bestMove) {
        game.move({
          from: bestMove.substring(0, 2),
          to: bestMove.substring(2, 4),
          promotion: bestMove.substring(4, 5),
        }, { strict: true });
        setPosition(game.fen());
        if( game.isCheck()){
          console.log(game.pgn());
        }
        if (game.isCheckmate()) alert('Chal kal try krna !!');
        if (game.isDraw()) alert("Draw!!");
      }
    });
  }, [chessEngine, game])

  const onDrop = (sourceSquare: string, targetSquare: string, piece: string) => {
    try {

      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        // promotion: piece[1].toLowerCase() ?? "q",
      }, { strict: true });

      setPosition(game.fen());

      if (move === null) return false;

      if (game.isCheckmate() || game.isDraw()) return false;

      computerMove();

      return true;

    } catch (error) {
      console.log("error in onDrop", error);
      return false;
    }
  }

  const onSquareRightClick = (square: string) => {
    const colour = "rgba(255, 0, 0, 0.4)";
    console.log("square", square);
    setRightClickedSquares({
      ...rightClickedSquares,
      [square]:
        rightClickedSquares[square] &&
          rightClickedSquares[square].backgroundColor === colour
          ? undefined
          : { backgroundColor: colour },
    });
  }

  const onSquareClick = (square: any) => {
    setRightClickedSquares({});
  }

  return (
    <div className="flex items-center justify-evenly h-screen">
      <ChatWindow/>
      <div>
        <Chessboard boardWidth={600} id="PlayVsStockfish" position={position} onPieceDrop={onDrop} onSquareRightClick={onSquareRightClick} customSquareStyles={{ ...rightClickedSquares }} onSquareClick={onSquareClick} customBoardStyle={{ borderRadius: "4px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.8)" , ...backgroundColor , e1 : "blue" }}  />
      </div>
    </div>
  )
}

export default page