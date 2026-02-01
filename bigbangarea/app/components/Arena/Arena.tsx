"use client"
import { Agent } from '@/app/domain/Agent';
import { renderToHTML } from 'next/dist/server/render';
import React, { useRef, useEffect } from 'react';

const Canvas = (props: React.CanvasHTMLAttributes<HTMLCanvasElement>) =>  {
    const ref = useRef<HTMLCanvasElement | null>(null);


    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;
        const context = canvas.getContext('2d')
        if (!context) return;
        let count = 0
        let animationID
        let agent1 = new Agent(canvas, 50, 50, 10, 10, 'orange', 10);
        let agent2 = new Agent(canvas, 70, 50, 70, 10, 'blue', 10);

        const renderer = () => {
            count++;
            context.clearRect(0,0, context.canvas.width, context.canvas.height)
            agent1.draw()
            agent2.draw()
            animationID= window.requestAnimationFrame(renderer)
        }
        renderer()
        return () => window.requestAnimationFrame(renderer)
    })

    return <canvas ref={ref} {...props}/>
}


export default function Arena() {
  return <div  className='arena'>
    Hello Next.js!

    <Canvas width="800" height="500"></Canvas>
    </div>
}