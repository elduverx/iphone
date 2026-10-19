import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
import { useEffect, useRef, useState } from "react";

import { carouselApps as apps } from "../constants";
import { useLanguage } from "../i18n/LanguageContext";
import { ArrowRightIcon, PauseIcon, PlayIcon, ReplayIcon } from "./Icons";
import SmartLink from "./SmartLink";

const lastIndex = apps.length - 1;

const VideoCarousel = () => {
  const { t, tr } = useLanguage();
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  // video and indicator
  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState([]);
  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  useGSAP(() => {
    // slider animation to move the video out of the screen and bring the next video in
    gsap.to(".carousel-slide", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut", // show visualizer https://gsap.com/docs/v3/Eases
    });

    // video animation to play the video when it is in the view
    gsap.to(".carousel-video", {
      scrollTrigger: {
        trigger: ".carousel-video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    let currentProgress = 0;
    const span = videoSpanRef.current;
    const indicator = videoDivRef.current;

    if (!span[videoId]) return;

    // animation to move the indicator
    const anim = gsap.to(span[videoId], {
      onUpdate: () => {
        // get the progress of the video
        const progress = Math.ceil(anim.progress() * 100);

        if (progress != currentProgress) {
          currentProgress = progress;

          // set the width of the progress bar
          gsap.to(indicator[videoId], {
            width:
              window.innerWidth < 1200
                ? "10vw" // mobile / tablet
                : "4vw", // laptop
          });

          // set the background color of the progress bar
          gsap.to(span[videoId], {
            width: `${currentProgress}%`,
            backgroundColor: "white",
          });
        }
      },
    });

    if (videoId == 0) {
      anim.restart();
    }

    // update the progress bar from the real playback position
    const animUpdate = () => {
      const current = videoRef.current[videoId];
      if (!current) return;
      const duration = current.duration || apps[videoId].videoDuration;
      anim.progress(current.currentTime / duration);
    };

    gsap.ticker.add(animUpdate);

    return () => {
      gsap.ticker.remove(animUpdate);
      anim.kill();
      // collapse the indicator back to a dot when leaving this slide
      gsap.to(indicator[videoId], { width: "12px" });
      gsap.to(span[videoId], { width: "100%", backgroundColor: "#afafaf" });
    };
  }, [videoId, startPlay]);

  useEffect(() => {
    if (loadedData.length < apps.length) return;

    const current = videoRef.current[videoId];
    if (!isPlaying) {
      current.pause();
    } else if (startPlay) {
      current.play().catch(() => {});
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
        break;

      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;

      case "video-reset":
        setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false }));
        break;

      case "go-to":
        if (i === videoId) return;
        videoRef.current[videoId]?.pause();
        if (videoRef.current[i]) videoRef.current[i].currentTime = 0;
        setVideo((pre) => ({ ...pre, videoId: i, isLastVideo: false, isPlaying: true, startPlay: true }));
        break;

      case "toggle":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      default:
        return video;
    }
  };

  const handleLoadedMetaData = (i, e) => setLoadedData((pre) => [...pre, e]);

  const controlLabel = isLastVideo ? t('highlights.replay') : !isPlaying ? t('highlights.play') : t('highlights.pause');

  return (
    <>
      <div className="flex items-center">
        {apps.map((app, i) => (
          <div key={app.id} className="carousel-slide sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  className="carousel-video w-full h-full object-cover object-[78%_50%] md:object-center pointer-events-none"
                  playsInline={true}
                  preload="auto"
                  muted
                  poster={app.poster}
                  ref={(el) => (videoRef.current[i] = el)}
                  onEnded={() =>
                    i !== lastIndex
                      ? handleProcess("video-end", i)
                      : handleProcess("video-last")
                  }
                  onPlay={() =>
                    setVideo((pre) => ({ ...pre, isPlaying: true }))
                  }
                  onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                >
                  <source src={app.video} type="video/mp4" />
                </video>
              </div>

              {/* degradado para que el texto se lea sobre cualquier vídeo */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-black/75 via-black/20 to-transparent pointer-events-none" />

              <div className="absolute top-8 md:top-12 left-[5%] z-10 max-w-[55%]">
                {tr(app.tagline).map((text, j) => (
                  <p key={j} className={j === 0 ? "md:text-4xl text-2xl font-semibold mb-1" : "md:text-2xl text-lg font-medium text-gray-200"}>
                    {text}
                  </p>
                ))}
              </div>

              <div className="absolute bottom-6 md:bottom-10 left-[5%] z-10 flex flex-col gap-3">
                <div className="flex flex-wrap gap-2">
                  {app.platforms.map((platform) => (
                    <span key={platform} className="chip">{platform}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-1">
                  {app.caseSlug && (
                    <SmartLink to={`/casos/${app.caseSlug}`} className="text-link flex items-center text-sm md:text-base font-semibold">
                      {t('pages.viewCase')}
                      <ArrowRightIcon className="ml-1" />
                    </SmartLink>
                  )}
                  {app.appStoreUrl && (
                    <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer" className="text-link flex items-center text-sm md:text-base">
                      {t('highlights.appStore')}
                      <ArrowRightIcon className="ml-1" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {apps.map((app, i) => (
            <button
              key={app.id}
              type="button"
              aria-label={`${t('highlights.goTo')} ${app.name}`}
              onClick={() => handleProcess("go-to", i)}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer overflow-hidden"
              ref={(el) => (videoDivRef.current[i] = el)}
            >
              <span
                className="absolute left-0 top-0 h-full w-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el)}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          className="control-btn"
          aria-label={controlLabel}
          onClick={() => handleProcess(isLastVideo ? "video-reset" : "toggle")}
        >
          {isLastVideo ? <ReplayIcon /> : !isPlaying ? <PlayIcon /> : <PauseIcon />}
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
