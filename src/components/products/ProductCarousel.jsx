import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Touch + keyboard friendly image carousel.
 * Handles zero images, a single image and broken image URLs.
 */
export function ProductCarousel({ images = [], alt = "Product image", className, aspect = "aspect-4/3" }) {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState({});
  const [touchStart, setTouchStart] = useState(null);

  useEffect(() => {
    setIndex(0);
    setFailed({});
  }, [images]);

  const total = images.length;
  const hasImages = total > 0;
  const current = hasImages ? images[Math.min(index, total - 1)] : null;
  const broken = current ? failed[current] : true;

  const go = (delta) => setIndex((prev) => (prev + delta + total) % total);

  return (
    <div
      className={cn("relative w-full overflow-hidden bg-muted", aspect, className)}
      role="group"
      aria-roledescription="carousel"
      aria-label={alt}
      onKeyDown={(event) => {
        if (total < 2) return;
        if (event.key === "ArrowLeft") { event.preventDefault(); go(-1); }
        if (event.key === "ArrowRight") { event.preventDefault(); go(1); }
      }}
      onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
      onTouchEnd={(event) => {
        if (touchStart === null || total < 2) return;
        const delta = event.changedTouches[0].clientX - touchStart;
        if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1);
        setTouchStart(null);
      }}
      tabIndex={total > 1 ? 0 : -1}
    >
      {hasImages && !broken ? (
        <img
          src={current}
          alt={`${alt}${total > 1 ? ` (${index + 1} of ${total})` : ""}`}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-500 hover:scale-[1.03]"
          onError={() => setFailed((prev) => ({ ...prev, [current]: true }))}
        />
      ) : (
        <div className="flex size-full flex-col items-center justify-center gap-2 bg-secondary text-muted-foreground">
          <ImageOff className="size-8" aria-hidden="true" />
          <span className="text-xs">No image available</span>
        </div>
      )}

      {total > 1 ? (
        <>
          <button
            type="button"
            onClick={(event) => { event.preventDefault(); go(-1); }}
            aria-label="Previous image"
            className="absolute top-1/2 left-2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/85 text-foreground shadow-sm transition hover:bg-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(event) => { event.preventDefault(); go(1); }}
            aria-label="Next image"
            className="absolute top-1/2 right-2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/85 text-foreground shadow-sm transition hover:bg-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((image, dotIndex) => (
              <button
                key={image + dotIndex}
                type="button"
                aria-label={`Go to image ${dotIndex + 1}`}
                aria-current={dotIndex === index}
                onClick={(event) => { event.preventDefault(); setIndex(dotIndex); }}
                className={cn(
                  "h-2 rounded-full bg-background/70 transition-all",
                  dotIndex === index ? "w-5 bg-background" : "w-2",
                )}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
