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
            aria-label={direction === 'left' ? 'Previous screenshot' : 'Next screenshot'}
            className="p-3 mx-4 rounded-md border border-white/70 bg-black text-white transition-colors hover:border-white disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={(e) => {
                e.stopPropagation();
                direction === 'left'
                    ? setCurrentScreenshot(prev => Math.max(0, prev - 1))
                    : setCurrentScreenshot(prev => prev + 1);
            }}
        >
            <Icon size={36} aria-hidden />
        </button>
    );
}