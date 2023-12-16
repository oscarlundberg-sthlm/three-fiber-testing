import { useEffect, useState } from "react";
import Arrow from "./Arrow";


function Item({ arrowDirection, customDescriptor, text }: any) {
    const [keydown, setKeydown] = useState(false);

    // @ts-ignore
    const arrowClasses = {
        forward: '',
        right: 'rotate-90',
        back: 'rotate-180',
        left: '-rotate-90'
    }[arrowDirection];

    // @ts-ignore
    const isThisKey = {
        forward: 'ArrowUp',
        right: 'ArrowRight',
        back: 'ArrowDown',
        left: 'ArrowLeft',
        space: 'Space'
    }[arrowDirection ?? customDescriptor]

    function keydownHandler(event: any) {
        if (event.code !== isThisKey) return;
        setKeydown(true);
    }
    function keyupHandler(event: any) {
        if (event.code !== isThisKey) return;
        setKeydown(false);
    }

    useEffect(() => {
        window.addEventListener('keydown', keydownHandler)
        window.addEventListener('keyup', keyupHandler)
        return () => {
            window.removeEventListener('keydown', keydownHandler);
            window.removeEventListener('keyup', keyupHandler);
        }
    },[keydownHandler, keyupHandler]);

    return (
        <div className="flex items-center justify-center border px-1 pb-0.5 pt-1">
            <div style={{ color: keydown ? '#CFC8B1' : 'inherit' }}>
                <div 
                    className="text-[7px] flex justify-center pt-0.5"
                    style={{ opacity: customDescriptor ? 0 : 1 }}
                >
                    <Arrow className={arrowClasses} />
                </div>
                <div className="text-[9px] flex justify-center pt-px">{text}</div>
            </div>
        </div>
    )
}

function ControlsInfo() {

  return (
    <div className="flex text-primary">
        <div className="grid grid-rows-2 gap-1 mr-20">
            <div className="row-start-2 min-w-[200px]"><Item customDescriptor="space" text="BRAKE" /></div>
        </div>
        <div className="grid grid-cols-3 max-w-xs gap-1">
            <div></div>
            <div><Item arrowDirection="forward" text="DRIVE" /></div>
            <div></div>
            <div><Item arrowDirection="left" text="LEFT" /></div>
            <div><Item arrowDirection="back" text="REVERSE" /></div>
            <div><Item arrowDirection="right" text="RIGHT" /></div>
        </div>
    </div>
  )
}

export default ControlsInfo