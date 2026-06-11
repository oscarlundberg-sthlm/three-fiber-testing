"use client";
import ControlsInfo from "@/components/ControlsInfo";
import Marquee from "@/components/Marquee";
import ThreeDEnvironment from "@/components/ThreeDEnvironment";
import { Controls } from "@/enums/controls";
import { KeyboardControls, KeyboardControlsEntry } from "@react-three/drei";
import { Inter, Inter_Tight } from 'next/font/google';
import { Suspense, useMemo, useState } from "react";
import Loading from "./loading";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function Home() {
  const CRED = "unsafe";
  const [password, setPassword] = useState(CRED); // bypassing password for now, set to "" to enable password input

  const map = useMemo<KeyboardControlsEntry<Controls>[]>(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.brake, keys: ["Space"] },
      { name: Controls.respawn, keys: ["KeyR"] },
    ],
    [],
  );

  const skillsList = [
    "React",
    "Laravel",
    "Alpine.js",
    "Next.js",
    "Design",
    "Tailwind",
    "Laravel Forge",
    "Vercel",
    "Livewire",
    "Javascript",
    "PHP",
    "Typescript",
    "Sanity CMS",
    "Statamic CMS",
    "Git",
    "Integrations",
    "Wordpress",
  ];

  if (password !== CRED) {
    return (
      <div
        className={`h-screen flex flex-col justify-center items-center ${inter.variable} font-sans bg-black text-primary`}
      >
        <h1 className="text-lg font-medium sm:font-normal sm:text-2xl mb-1.5 sm:mb-4">
          Enter Password
        </h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-1 sm:p-2 border border-primary bg-black text-primary"
        />
      </div>
    );
  }

  return (
    <KeyboardControls map={map}>
      <main
        className={`h-screen relative ${interTight.variable} ${inter.variable} font-sans`}
      >
        <Suspense fallback={<Loading />}>
          <ThreeDEnvironment />
        </Suspense>
        <Marquee className="absolute top-0 inset-x-0 bg-black">
          {skillsList.map((skill, i, array) => (
            <div
              key={"skillsList" + skill + i}
              className="flex items-center bg-black h-7 font-sans-tight"
            >
              <span className="text-primary font-light text-sm tracking-wider">
                {skill}
              </span>
              <span className="text-primary text-xs px-6 opacity-40">•</span>
            </div>
          ))}
        </Marquee>
        <div className="m-4 absolute bottom-0 inset-x-0 flex sm:justify-between sm:items-end flex-col-reverse sm:flex-row">
          <div className="max-w-[420px] lg:max-w-[510px] border border-primary p-4 mt-4 bg-black">
            <div className="font-sans-tight font-extrabold lg:font-bold text-xl lg:text-4xl mb-2.5 lg:mb-6 leading-none lg:leading-none text-primary uppercase">
              Hello, <span>I&apos;m Oscar</span>.<br />
              Frontend developer &<br />
              all around creative person
            </div>
            <div className="font-sans-tight lg:font-light text-primary text-xs lg:text-base -mb-1 lg:mb-0">
              I build this with{" "}
              <span className=" text-primary-100  ">
                next.js, three.js & blender
              </span>
            </div>
          </div>
          <div className="self-end">
            <ControlsInfo />
          </div>
        </div>
      </main>
    </KeyboardControls>
  );
}
