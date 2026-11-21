import { ClientOnly } from '@tanstack/react-router';
import { lazy, Suspense, useState, useRef, useEffect } from 'react';
import type { ViewKey } from '@/stadium/views';
import type { CameraTarget, StadiumInteraction } from '@/stadium/interaction';
import { useIsMobile } from '@/hooks/use-mobile';

const StadiumCanvas = lazy(() => import('@/stadium/StadiumCanvas'));

export function CanvasStage({ view = 'aerial', cameraTarget, interaction, lounge = false }: { view?: ViewKey; cameraTarget?: CameraTarget; interaction?: StadiumInteraction; lounge?: boolean }) {
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const observer = new IntersectionObserver(entries => setVisible(entries.some(entry => entry.isIntersecting)), { threshold: 0.05 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const loading = <div className="canvas-loading">Loading stadium visualization…</div>;
  const mobileLoading = <div className="canvas-loading">Open to explore</div>;

  return (
    <div ref={container} className="relative h-full w-full">
      {visible && (
        <ClientOnly fallback={!isMobile ? loading : mobileLoading}>
          <Suspense fallback={!isMobile ? loading : mobileLoading}>
            <StadiumCanvas
              view={view}
              onReady={() => setReady(true)}
              lounge={lounge}
              {...(cameraTarget ? { cameraTarget } : {})}
              {...(interaction ? { interaction } : {})}
            />
          </Suspense>
        </ClientOnly>
      )}
      {(!ready || !visible) && (
        <div className="absolute inset-0 flex items-center justify-center">
          {!visible ? (isMobile ? mobileLoading : loading) : loading}
        </div>
      )}
    </div>
  );
}