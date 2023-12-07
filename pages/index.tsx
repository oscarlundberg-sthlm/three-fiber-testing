"use client";
import ThreeDEnvironment from "@/components/ThreeDEnvironment";
import { Controls } from "@/enums/controls";
import { KeyboardControls, KeyboardControlsEntry } from "@react-three/drei";
import { useMemo } from "react";

export default function Home() {
    const map = useMemo<KeyboardControlsEntry<Controls>[]>(
        () => [
            { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
            { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
            { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
            { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
            { name: Controls.jump, keys: ["Space"] },
        ],
        []
    );

    return (
        <KeyboardControls map={map}>
            <main className="h-screen">
                <ThreeDEnvironment />
            </main>
        </KeyboardControls>
    );
}
