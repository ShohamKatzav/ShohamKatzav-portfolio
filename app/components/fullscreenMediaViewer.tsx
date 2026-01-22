
"use client"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Loader2, X } from 'lucide-react';
import GalleryNavButton from './GalleryNavButton';

interface FullscreenMediaViewerProps {
    src: string;
    currentScreenshot: number;
    setCurrentScreenshot: Dispatch<SetStateAction<number>>;
    screenshotsLength: number;
    onClose: () => void;
}

export default function FullscreenMediaViewer({ src, currentScreenshot, setCurrentScreenshot, screenshotsLength, onClose }: FullscreenMediaViewerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Minimum distance required to be considered a "swipe"
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null); // Reset
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe && currentScreenshot < screenshotsLength - 1) {
            setCurrentScreenshot(prev => prev + 1);
        } else if (isRightSwipe && currentScreenshot > 0) {
            setCurrentScreenshot(prev => Math.max(0, prev - 1));
        }
    };

    useEffect(() => {
        // Prevent body scroll when fullscreen is open
        document.body.style.overflow = 'hidden';

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);

        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleEscape);
        };
    }, [onClose]);


    useEffect(() => {
        setIsError(false);
        setIsLoading(true);
    }, [currentScreenshot, src]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-9999 bg-black flex items-center justify-center"
            onClick={onClose}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >

            {isLoading && !isError && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <Loader2 className="w-10 h-10 text-white animate-spin opacity-50" />
                </div>
            )}

            <div className="hidden md:block">
                <GalleryNavButton direction="left" setCurrentScreenshot={setCurrentScreenshot} disabled={currentScreenshot === 0} />
            </div>
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10000 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                aria-label="Close fullscreen"
            >
                <X size={28} color="red" />
            </button>

            <div
                className="w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative w-full h-full">
                    <Image
                        src={isError ? '/Pictures/noImage.webp' : src}
                        alt="Fullscreen image"
                        fill
                        style={{ objectFit: 'contain' }}
                        priority
                        onLoad={() => setIsLoading(false)}
                        onError={() => {
                            setIsError(true);
                            setIsLoading(false);
                        }}
                    />
                </div>
            </div>

            <div className="hidden md:block">
                <GalleryNavButton direction="right" setCurrentScreenshot={setCurrentScreenshot} disabled={currentScreenshot === screenshotsLength - 1} />
            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest uppercase md:hidden">
                Swipe to navigate
            </div>
        </div>
    );
};