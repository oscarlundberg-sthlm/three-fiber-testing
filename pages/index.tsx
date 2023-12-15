"use client";
import Marquee from "@/components/Marquee";
import ThreeDEnvironment from "@/components/ThreeDEnvironment";
import { Controls } from "@/enums/controls";
import { KeyboardControls, KeyboardControlsEntry } from "@react-three/drei";
import { Inter_Tight } from 'next/font/google';
import { useMemo } from "react";

const interTight = Inter_Tight({subsets: ['latin'], variable: '--font-inter-tight',})

export default function Home() {
    const map = useMemo<KeyboardControlsEntry<Controls>[]>(
        () => [
            { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
            { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
            { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
            { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
            { name: Controls.brake, keys: ["Space"] },
            { name: Controls.respawn, keys: ["KeyR"] },
        ],
        []
    );

    const skillsList = [
        'React',
        'Laravel',
        'Alpine.js',
        'Next.js',
        'Tailwind',
        'Laravel Forge',
        'Vercel',
        'Livewire',
        'Javascript',
        'PHP',
        'Typescript',
        'Sanity CMS',
        'Statamic CMS',
        'Design',
        'Git',
        'Integrations',
        'Wordpress'
    ]

    return (
        <KeyboardControls map={map}>
            <main className={`h-screen relative ${interTight.variable} font-sans`}>
                <ThreeDEnvironment />
                <Marquee className="absolute top-0 inset-x-0 bg-black">
                    {skillsList.map((skill, i, array) => (
                        <div key={"skillsList" + skill + i} className="flex items-center bg-black h-7">
                            <span className="text-primary font-light text-sm tracking-wider">{skill}</span>
                            <span className="text-primary text-xs px-6 opacity-40">•</span>
                        </div>
                    ))}
                    
                </Marquee>
                <div className="absolute left-4 bottom-4 max-w-[510px] border border-primary p-4 bg-black ">
                    <div className="font-bold text-4xl mb-6 leading-none text-primary uppercase">Hello, <span>I'm Oscar</span>. Frontend developer/<br/>all around creative person.</div>
                    <div className="text-primary-100">Reach me at <a href="mailto:oscarlundberg@hotmail.com" className="transition-colors hover:text-primary">oscarlundberg@hotmail.com</a>.</div>
                </div>
            </main>
        </KeyboardControls>
    );
}
