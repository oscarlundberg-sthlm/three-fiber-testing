import { ReactNode } from "react";
import MarqueePlugin from "react-fast-marquee";

interface Props {
    children: ReactNode;
    className?: string;
}

const Marquee = ({ children, className }: Props) => {
    return (
        <div className={className}>
            <MarqueePlugin
                autoFill
                loop={0}
                speed={20}
                pauseOnHover
            >
                { children }
            </MarqueePlugin>
        </div>
    )
}

export default Marquee;