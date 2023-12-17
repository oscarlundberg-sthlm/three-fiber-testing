import classNames from "classnames";
import { ReactNode, useEffect, useMemo, useState } from "react";
import Arrow from "./Arrow";

interface ItemData {
    _key: string;
    text: string;
    setControlsUsed: (boolean: boolean) => void;
}

function Item({ _key, text, setControlsUsed }: ItemData) {
    const [keydown, setKeydown] = useState(false);

    interface Config {
        [index: string]: {
            ['keyCode']: string,
            ['component']: () => ReactNode,
        }
    }

    const config = useMemo<Config>(() => ({
        forward:    { keyCode: 'ArrowUp',       component: () => ( <Arrow /> ) },
        right:      { keyCode: 'ArrowRight',    component: () => ( <Arrow className="rotate-90" /> ) },
        back:       { keyCode: 'ArrowDown',     component: () => ( <Arrow className="rotate-180" /> ) },
        left:       { keyCode: 'ArrowLeft',     component: () => ( <Arrow className="-rotate-90" /> ) },
    }),[]);

    useEffect(() => {
        if (!_key) return;

        function keydownHandler(event: KeyboardEvent) {
            if (event.code !== config[_key].keyCode) return;
            setKeydown(true);
            setControlsUsed(true);
        }
        function keyupHandler(event: KeyboardEvent) {
            if (event.code !== config[_key].keyCode) return;
            setKeydown(false);
        }

        window.addEventListener('keydown', keydownHandler)
        window.addEventListener('keyup', keyupHandler)
        return () => {
            window.removeEventListener('keydown', keydownHandler);
            window.removeEventListener('keyup', keyupHandler);
        }
    },[_key, config, setControlsUsed, setKeydown]);

    if (!_key || !text) return <></>;

    return (
        <div 
            className={classNames("flex items-center justify-center border px-1 pb-0.5 pt-1", {
                'text-primary-100': keydown,
            }
        )}>
            <div className="pointer-events-none">
                <div 
                    className="text-[7px] flex justify-center pt-0.5"
                >
                    {config[_key].component()}
                </div>
                <div className="text-[9px] flex justify-center pt-px text-white">{text}</div>
            </div>
        </div>
    )
}

function ControlsInfo() {
    const [hasBeenUsed, setHasBeenUsed] = useState(false);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (!hasBeenUsed) return;

        setTimeout(() => {
            setVisible(false);
        }, 5000)
    }, [hasBeenUsed, setVisible])

    return (
        <div className={classNames("flex text-primary transition-opacity duration-[2000ms]", {
            'opacity-0': !visible
        })}>
            <div className="grid grid-cols-3 max-w-xs gap-1">
                <div></div>
                <div><Item _key="forward" text="DRIVE" setControlsUsed={() => setHasBeenUsed(true)} /></div>
                <div></div>
                <div><Item _key="left" text="LEFT" setControlsUsed={() => setHasBeenUsed(true)} /></div>
                <div><Item _key="back" text="REVERSE" setControlsUsed={() => setHasBeenUsed(true)} /></div>
                <div><Item _key="right" text="RIGHT" setControlsUsed={() => setHasBeenUsed(true)} /></div>
            </div>
        </div>
    )
}

export default ControlsInfo