"use client"
import { Agent } from '@/app/domain/Agent';
import { GameEngine } from '@/app/engine/GameEngine';
import { renderToHTML } from 'next/dist/server/render';
import React, { useRef, useEffect } from 'react';

const Canvas = (props: React.CanvasHTMLAttributes<HTMLCanvasElement>) =>  {
    const ref = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!ref.current) return;

        const engine = new GameEngine(ref.current);
        engine.start();


        return () => {
            engine.stop();
        }
    }, [])

    return <canvas ref={ref} {...props}/>
}


export default function Arena() {
  return <div  className='arena'>
    Hello Next.js!

    <Canvas width="800" height="500"></Canvas>
    </div>
}