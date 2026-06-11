import classNames from "classnames";
import { ReactNode, useEffect, useMemo, useState } from "react";
import Arrow from "./Arrow";
import MouseClickToKey from "./MouseClickToKey";

interface ItemData {
  _key: string;
  text: string;
}

function Item({ _key, text }: ItemData) {
  const [keydown, setKeydown] = useState(false);

  interface Config {
    [index: string]: {
      ["keyCode"]: string;
      ["component"]: () => ReactNode;
    };
  }

  const config = useMemo<Config>(
    () => ({
      forward: { keyCode: "ArrowUp", component: () => <Arrow /> },
      right: {
        keyCode: "ArrowRight",
        component: () => <Arrow className="rotate-90" />,
      },
      back: {
        keyCode: "ArrowDown",
        component: () => <Arrow className="rotate-180" />,
      },
      left: {
        keyCode: "ArrowLeft",
        component: () => <Arrow className="-rotate-90" />,
      },
    }),
    []
  );

  useEffect(() => {
    if (!_key) return;

    function keydownHandler(event: KeyboardEvent) {
      if (event.code !== config[_key].keyCode) return;
      setKeydown(true);
    }
    function keyupHandler(event: KeyboardEvent) {
      if (event.code !== config[_key].keyCode) return;
      setKeydown(false);
    }

    window.addEventListener("keydown", keydownHandler);
    window.addEventListener("keyup", keyupHandler);
    return () => {
      window.removeEventListener("keydown", keydownHandler);
      window.removeEventListener("keyup", keyupHandler);
    };
  }, [_key, config, setKeydown]);

  if (!_key || !text) return <></>;

  return (
    <div
      className={classNames(
        "flex items-center justify-center border px-1 pb-0.5 pt-1 bg-black/80",
        {
          "text-primary-100": keydown,
        }
      )}
    >
      <div className="pointer-events-none">
        <div className="text-[7px] flex justify-center pt-0.5">
          {config[_key].component()}
        </div>
        <div className="text-[9px] flex justify-center pt-px text-white">
          {text}
        </div>
      </div>
    </div>
  );
}

function ControlsInfo() {
  return (
    <div
      className={classNames(
        "flex text-primary transition-opacity duration-[2000ms]"
      )}
    >
      <div className="grid grid-cols-3 max-w-xs gap-1">
        <div></div>
        <MouseClickToKey keyCode="ArrowUp">
          <Item _key="forward" text="DRIVE" />
        </MouseClickToKey>
        <div></div>
        <MouseClickToKey keyCode="ArrowLeft">
          <Item _key="left" text="LEFT" />
        </MouseClickToKey>
        <MouseClickToKey keyCode="ArrowDown">
          <Item _key="back" text="REVERSE" />
        </MouseClickToKey>
        <MouseClickToKey keyCode="ArrowRight">
          <Item _key="right" text="RIGHT" />
        </MouseClickToKey>
      </div>
    </div>
  );
}

export default ControlsInfo;
