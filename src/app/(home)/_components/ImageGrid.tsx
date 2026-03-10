type MediaItem = {
    src: string
    alt: string
    type?: 'image' | 'video'
}

type ImageGridSection = {
    type?: string
    images: MediaItem[]
}

type ImageGridProps = {
    /**
     * Dominant aspect ratio for the media set.
     * Drives layout decisions (e.g. 9:16 = vertical, 16:9 = horizontal).
     */
    aspectRatio?: '16:9' | '9:16' | '1:1'
    media?: MediaItem[]
    sections?: ImageGridSection[]
}

const ImageGrid = ({ media, sections, aspectRatio = '1:1' }: ImageGridProps) => {
    // Flatten sections into media array if sections are provided
    const allMedia = media || (sections?.flatMap(section => section.images) ?? [])

    // Max items: 3 on mobile/tablet, 5 on desktop (1024px+)
    const maxMobile = 3
    const maxDesktop = 5

    if (!allMedia || allMedia.length === 0) return null

    const visibleMediaMobile = allMedia.slice(0, maxMobile)
    const visibleMediaDesktop = allMedia.slice(0, maxDesktop)
    const remainingCountMobile = Math.max(0, allMedia.length - maxMobile)
    const remainingCountDesktop = Math.max(0, allMedia.length - maxDesktop)

    /**
     * Whether we should wrap a single piece of media in a blurred background
     * container instead of showing it directly.
     */
    const shouldUseBlurredBackground = () => {
        return aspectRatio === "1:1" || aspectRatio === "9:16"
    }

    /**
     * Renders a single media item (image or video) with the blurred
     * background treatment used for portrait / square content.
     */
    const renderSingleMedia = (item: MediaItem) => {
        const isVideo = item.type === 'video' || item.src.match(/\.(mp4|webm|ogg)$/i)

        const content = isVideo ? (
            <video
                src={item.src}
                controls
                controlsList="nodownload"
                className="w-full h-full object-contain relative z-10"
                preload="metadata"
                playsInline
            />
        ) : (
            <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-contain relative z-10"
            />
        )

        if (shouldUseBlurredBackground()) {
            return (
                <div className="relative w-full aspect-video overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center blur-2xl opacity-60 scale-110"
                        style={{ backgroundImage: `url(${item.src})` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        {content}
                    </div>
                </div>
            )
        }

        return (
            <div className="w-full aspect-video">
                {content}
            </div>
        )
    }

    /**
     * Generic thumbnail renderer used in all multi-media layouts.
     * `aspectType` controls the container's aspect class.
     */
    const renderMedia = (item: MediaItem, index: number, isLast: boolean, remainingCount: number, aspectType: 'auto' | 'square' | 'video') => {
        const isVideo = item.type === 'video' || item.src.match(/\.(mp4|webm|ogg)$/i)

        return (
            <div key={index} className={`relative aspect-${aspectType} overflow-hidden`}>
                {isVideo ? (
                    <video
                        src={item.src}
                        className='h-full w-full object-cover'
                        controls={false}
                        muted
                        playsInline
                    />
                ) : (
                    <img
                        src={item.src}
                        alt={item.alt}
                        className='h-full w-full object-cover'
                    />
                )}

                {/* Overlay for last item if there are more */}
                {isLast && remainingCount > 0 && (
                    <div className='absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm'>
                        <span className='text-4xl font-bold text-white'>
                            +{remainingCount}
                        </span>
                    </div>
                )}
            </div>
        )
    }

    /**
     * Mobile / tablet layout (< 1024px).
     * Shows up to 3 items and uses "+N" overlay when there are more.
     */
    const renderMobileGrid = (items: MediaItem[], remainingCount: number) => {
        const count = items.length

        // 1 image: single full width with blurred background if needed
        if (count === 1) {
            return renderSingleMedia(items[0])
        }
        // 2 images: 2 columns
        if (count === 2) {
            return (
                <div className='grid grid-cols-2 gap-[0.5px]'>
                    {items.map((item, index) =>
                        renderMedia(item, index, index === 1 && remainingCount > 0, remainingCount, "square")
                    )}
                </div>
            )
        }

        // 3 images: Check aspect ratio
        if (count === 3) {
            // For 9:16 (portrait) images, show side by side in 3 columns
            if (aspectRatio === '9:16') {
                return (
                    <div className='grid grid-cols-3 gap-[0.5px]'>
                        {items.map((item, index) =>
                            renderMedia(item, index, index === 2 && remainingCount > 0, remainingCount, "auto")
                        )}
                    </div>
                )
            }

            // For 16:9 (landscape) images, show side by side in 3 columns
            if (aspectRatio === '16:9') {
                return (
                    <div className='grid gap-px'>
                        <div className='grid grid-cols-1 gap-[0.5px]'>
                            {renderMedia(items[0], 0, false, 0, "video")}
                        </div>
                        <div className='grid grid-cols-2 gap-px'>
                            {items.slice(1, 3).map((item, index) =>
                                renderMedia(item, index + 1, index === 1 && remainingCount > 0, remainingCount, "video")
                            )}
                        </div>
                    </div>
                )
            }


            // For other aspect ratios: 1 large on top, 2 small below (mobile Facebook style)
            return (
                <div className='grid gap-px'>
                    <div className='grid grid-cols-1 gap-[0.5px]'>
                        {renderMedia(items[0], 0, false, 0, "square")}
                    </div>
                    <div className='grid grid-cols-2 gap-px'>
                        {items.slice(1, 3).map((item, index) =>
                            renderMedia(item, index + 1, index === 1 && remainingCount > 0, remainingCount, "square")
                        )}
                    </div>
                </div>
            )
        }

        return null
    }

    /**
     * Desktop layout (>= 1024px).
     * Reuses the same media rendering primitives but with different grid / flex layouts.
     */
    const renderDesktopGrid = (items: MediaItem[], remainingCount: number, totalCount: number) => {
        const count = items.length

        // 1 image: single full width with blurred background if needed
        if (count === 1) {
            return renderSingleMedia(items[0])
        }

        // 2 images: 2 columns
        if (count === 2) {
            return (
                <div className='grid grid-cols-2 gap-[0.5px]'>
                    {items.map((item, index) =>
                        renderMedia(item, index, index === 1 && remainingCount > 0, remainingCount, "square")
                    )}
                </div>
            )
        }

        // 3+ images: Check aspect ratio
        if (count >= 3) {
            // For 9:16 (portrait) images, show side by side in 3 columns
            if (aspectRatio === '9:16') {
                const remaining = totalCount > 3 ? totalCount - 3 : 0

                return (
                    <div className='grid grid-cols-3 gap-[0.5px]'>
                        {items.slice(0, 3).map((item, index) => {
                            const isLast = index === 2 && remaining > 0
                            return renderMedia(item, index, isLast, remaining, "auto")
                        })}
                    </div>
                )
            }

            // For other aspect ratios: 1 large square on left, 2 small stacked on right
            const displayCount = 3
            const remaining = totalCount > displayCount ? totalCount - displayCount : 0
            const aspectType = aspectRatio === '16:9' ? 'video' : 'square'

            return (
                <div className='flex gap-[0.5px]'>
                    {/* Large square image on left (2x wider) */}
                    <div className='flex-2 gap-[0.5px]'>
                        {renderMedia(items[0], 0, false, 0, aspectType)}
                    </div>
                    {/* 2 small images stacked on right - match height of left square */}
                    <div className='flex flex-col flex-1'>
                        {items.slice(1, 3).map((item, index) => {
                            // Show overlay on last image if there are more images (4 or 5 total)
                            const isLast = index === 1 && remaining > 0
                            return renderMedia(item, index + 1, isLast, remaining, aspectType)
                        })}
                    </div>
                </div>
            )
        }

        return null
    }

    return (
        <section className='w-full'>
            {/* Mobile/Tablet Grid (max 3) - below 1024px */}
            <div className='lg:hidden'>
                {renderMobileGrid(visibleMediaMobile, remainingCountMobile)}
            </div>

            {/* Desktop Grid (max 5) - 1024px and above */}
            <div className='hidden lg:block'>
                {renderDesktopGrid(visibleMediaDesktop, remainingCountDesktop, allMedia.length)}
            </div>
        </section>
    )
}

export default ImageGrid
