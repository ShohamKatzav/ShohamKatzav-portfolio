import { Dispatch, SetStateAction } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryNavButtonProps {
    direction: 'left' | 'right';
    setCurrentScreenshot: Dispatch<SetStateAction<number>>;
    disabled?: boolean;
}

export default function GalleryNavButton({ direction, setCurrentScreenshot, disabled }: GalleryNavButtonProps) {
    const Icon = direction === 'left' ? ChevronLeft : ChevronRight;

    return (
        <button
            disabled={disabled}
            className="group p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed mx-4"
            onClick={(e) => {
                e.stopPropagation();
                direction === 'left'
                    ? setCurrentScreenshot(prev => Math.max(0, prev - 1))
                    : setCurrentScreenshot(prev => prev + 1);
            }}
        >
            <Icon size={40} className="group-hover:scale-110 transition-transform" color="yellow" />
        </button>
    );
}