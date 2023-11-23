'use client'

import { useEffect, useMemo, useState } from "react";
import { Chessboard } from "react-chessboard";
import Engine from "@/public/engine";
import { Chess } from "chess.js";
import ChatWindow from "@/app/components/ChatWindow";
import MoveShow from "@/app/components/MoveShow";

const page = () => {
  const chessEngine = useMemo(() => new Engine(), []);
  const game = useMemo(() => new Chess(), []);

  const [position, setPosition] = useState(game.fen());
  const [rightClickedSquares, setRightClickedSquares] = useState<any>({});
  const [backgroundColor, setBackgroundColor] = useState({});
  const [moveHistory, setMoveHistory] = useState<string[]>(['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1']);
  const [actualGameIndex , setActualGameIndex] = useState<number>(0);
  const [currentMoveIndex, setCurrentMoveIndex] = useState<number>(1);

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
        // console.log("Move details:", moveDetails);
      }
      if (bestMove) {
        game.move({
          from: bestMove.substring(0, 2),
          to: bestMove.substring(2, 4),
          promotion: bestMove.substring(4, 5),
        }, { strict: true });

        setMoveHistory(prevMoveHistory => {
          const newMove = [...prevMoveHistory, game.fen()];
          setCurrentMoveIndex(newMove.length - 1);
          return newMove;
        });

        if (game.isCheckmate()) {
          const sound = new Audio("/sounds/checkmate.mp3");
          sound.play();
          setTimeout(() => { setPosition(game.fen()) }, 0)
        } else {
          setPosition(game.fen());
        }
        // console.log(game.pgn());
        // console.log(game.moves());
        if (game.isCheck()) {

        }
        if (game.isDraw()) alert("Draw!!");
      }
    });
  }, [chessEngine, game ])

  const onDrop = (sourceSquare: string, targetSquare: string, piece: string) => {
    try {

      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        // promotion: piece[1].toLowerCase() ?? "q",
      }, { strict: true });

      const newMove = [...moveHistory, game.fen()];
      setMoveHistory(newMove);
      setCurrentMoveIndex(moveHistory.length-1);

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
  const handleBackMove = () => {
    if (currentMoveIndex > 0) {
      setPosition(moveHistory[currentMoveIndex-1]);
      setCurrentMoveIndex(currentMoveIndex - 1);
      console.log(currentMoveIndex);
    }
    // game.undo();
    // console.log(game.fen());
    // setPosition(game.fen());
  }

  const handleFrontMove = () => {
    if (currentMoveIndex < moveHistory.length - 1) {
      setPosition(moveHistory[currentMoveIndex+1]);
      setCurrentMoveIndex(currentMoveIndex + 1);
      console.log(currentMoveIndex);
    }
  }

  const handleReset = () => {
    game.reset();
    setMoveHistory(['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1']);
    setPosition(game.fen());
  }

  return (
    <div className="flex items-center justify-evenly h-screen">
      <ChatWindow />
      <div>
        <Chessboard boardWidth={600} id="PlayVsStockfish" position={position} onPieceDrop={onDrop} onSquareRightClick={onSquareRightClick} customSquareStyles={{ ...rightClickedSquares }} onSquareClick={onSquareClick} customBoardStyle={{ borderRadius: "4px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.8)", ...backgroundColor, e1: "blue" }} />
      </div>
      <MoveShow chesspos={game.pgn()} handleBackMove={handleBackMove} opponent={'Bot'} user={'Anonymous'} handleFrontMove={handleFrontMove} handleReset={handleReset} currentMoveIndex={currentMoveIndex} />
      <button onClick={() => setPosition(moveHistory[currentMoveIndex])}>hello</button>
    </div>
  )
}

export default page