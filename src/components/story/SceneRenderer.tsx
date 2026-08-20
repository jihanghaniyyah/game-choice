import { useState } from "react";
import { useEffect } from "react";

import { Scene } from "@/types/story";

import BackgroundLayer from "./BackgroundLayer";
import CharacterLayer from "./CharacterLayer";
import OverlayLayer from "./OverlayLayer";
import SplashBox from "./SplashBox";
import DialogueBox from "./DialogueBox";
import ChatBox from "./ChatBox";
import NarrationBox from "./NarrationBox";
import ChoiceList from "./ChoiceList";
import InfoBox from "./InfoBox";
import HotspotLayer from "./HotspotLayer";
import WardrobePanoramaOverlay from "./WardrobePanoramaOverlay";
import VideoPlayer from "./VideoPlayer";
import AudioPlayer from "./AudioPlayer";
import FlashEffect from "./FlashEffect";
import FadeTransition from "./FadeTransition";
import ImageChoice from "./ImageChoice";
import NotebookButton from "./NotebookButton";
import ObjectivePanel from "./ObjectivePanel";
import OverlayUI from "./OverlayUI";
import SearchHotspot from "./SearchHotspot";
import ComicCutscene from "./ComicCutscene";

interface SceneRendererProps {
  scene: Scene;
  nextScene: () => void;
  choose: (nextId: string) => void;
  visitedFriends: string[];
  flash: boolean;
  transition: boolean;
  readNotebooks: string[];
  markNotebookAsRead: () => void;
  cameraX: number;
  roomState: {
    desk: boolean;
    bed: boolean;
    painting: boolean;
    wardrobe: boolean;
  };
  wardrobeStep: number;
  gameSession: number;
  visibleMessages: number;
  onCameraLimitChange: (limit: number) => void;
}

export default function SceneRenderer({
  scene,
  nextScene,
  choose,
  visitedFriends,
  flash,
  transition,
  readNotebooks,
  markNotebookAsRead,
  cameraX,
  roomState,
  gameSession,
  visibleMessages,
  wardrobeStep,
  onCameraLimitChange,
}: SceneRendererProps) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [manualFlash, setManualFlash] = useState(false);

  useEffect(() => {
    setShowOverlay(false);
  }, [scene.id]);

  const allTasksCompleted =
    roomState.desk && roomState.bed && roomState.painting && roomState.wardrobe;

  const completedCount = Object.values(roomState).filter(Boolean).length;

  const isRoomExploration = scene.id === "day2_029";

  const isSelfieScene =
    scene.id === "competition_006" || scene.id === "competition_007";

  const hasComic = scene.type === "comic";

  const handleSelfie = () => {
    setManualFlash(true);

    setTimeout(() => {
      setManualFlash(false);

      if (scene.next) {
        choose(scene.next);
      }
    }, 250);
  };

  const notebookId = scene.overlay?.image;

  const hasNotebookNotification =
    !!notebookId && !readNotebooks.includes(notebookId);

  useEffect(() => {
    if (!hasNotebookNotification) return;

    const audio = new Audio("/audios/notebook_notification.mp3");

    audio.loop = true;
    audio.volume = 0.5;

    audio.play().catch(() => {
      // Browser dapat memblokir autoplay sebelum user berinteraksi
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [hasNotebookNotification]);

  return (
    <div className="relative h-full w-full overflow-visible">
      {/* Background */}
      <BackgroundLayer
        scene={scene}
        cameraX={cameraX}
        roomState={roomState}
        onHotspotClick={choose}
        onCameraLimitChange={onCameraLimitChange}
      />
      {scene.audio && <AudioPlayer src={scene.audio} />}
      <WardrobePanoramaOverlay step={wardrobeStep} cameraX={cameraX} />
      {/* Character */}
      <CharacterLayer scene={scene} gameSession={gameSession} />
      {hasComic && (
        <ComicCutscene
          images={scene.images ?? []}
          onFinished={() => {
            if (scene.next) {
              choose(scene.next);
            }
          }}
        />
      )}
      {/* Hotspot eksplorasi kamar */}
      {scene.hotspots && isRoomExploration && (
        <HotspotLayer
          hotspots={scene.hotspots}
          onClick={choose}
          roomState={roomState}
          cameraX={cameraX}
          sceneId={scene.id}
        />
      )}
      {/* Hotspot selfie */}
      {scene.hotspots && isSelfieScene && (
        <HotspotLayer
          hotspots={scene.hotspots}
          roomState={roomState}
          cameraX={cameraX}
          useCamera={false}
          onClick={handleSelfie}
          sceneId={scene.id}
        />
      )}
      {/* Notebook Icon */}
      {scene.showNotebook !== false && (
        <NotebookButton
          onOpen={() => {
            setShowOverlay(true);
            markNotebookAsRead();
          }}
          hasNotification={hasNotebookNotification}
        />
      )}
      {scene.objective && (
        <ObjectivePanel
          objective={scene.objective}
          roomState={scene.id === "day2_029" ? roomState : undefined}
          completedCount={scene.id === "day2_029" ? completedCount : undefined}
          totalCount={scene.id === "day2_029" ? 4 : undefined}
          hint={
            scene.id === "galeri_001" || scene.id === "day2_029"
              ? "Klik tombol → pada keyboard untuk melanjutkan"
              : undefined
          }
        />
      )}

      <OverlayLayer
        scene={scene}
        visible={showOverlay}
        onClose={() => setShowOverlay(false)}
      />
      {isRoomExploration && allTasksCompleted && (
        <button
          onClick={nextScene}
          className="
            brick
            absolute
            bottom-6
            right-8
            z-50

            cursor-pointer

            rounded-2xl
            border-2
            border-[#2DBE60]

            bg-white/95
            px-8
            py-4

            text-lg
            font-medium
            text-[#2DBE60]

            shadow-xl
            transition-all
            duration-300

            hover:-translate-y-1
            hover:scale-105
            hover:bg-[#2DBE60]
            hover:text-white
        "
        >
          Lanjut →
        </button>
      )}
      {/* UI Layer */}
      <div className="absolute inset-0 z-40 pointer-events-none">
        {scene.type === "splash" && <SplashBox onStart={nextScene} />}

        {scene.type === "dialogue" && (
          <DialogueBox speaker={scene.speaker ?? ""} text={scene.text ?? ""} />
        )}

        {scene.type === "narration" && <NarrationBox text={scene.text ?? ""} />}

        {scene.type === "chat" && (
          <ChatBox
            messages={scene.messages ?? []}
            visibleCount={visibleMessages}
            chatMode={scene.chatMode}
          />
        )}

        {scene.type === "choice" && (
          <ChoiceList
            choices={scene.choices ?? []}
            onChoose={choose}
            visitedFriends={visitedFriends}
            layout={scene.choiceLayout}
          />
        )}

        {scene.type === "image-choice" && (
          <ImageChoice hotspots={scene.hotspots ?? []} onChoose={choose} />
        )}

        {scene.type === "search" && (
          <SearchHotspot
            hotspots={scene.hotspots ?? []}
            target={scene.target ?? ""}
            wrongMessages={scene.wrongMessages ?? ["Bukan ini."]}
            cameraX={cameraX}
            onSuccess={() => {
              if (scene.next) {
                choose(scene.next);
              }
            }}
          />
        )}

        {scene.overlayUI?.type === "narration" && (
          <NarrationBox text={scene.overlayUI.text} />
        )}

        {(scene.type === "popup" ||
          scene.type === "ending" ||
          scene.type === "epilogue") && (
          <InfoBox title={scene.title} content={scene.content ?? []} />
        )}

        {scene.type === "video" && scene.video && (
          <VideoPlayer src={scene.video} onEnded={nextScene} />
        )}

        {scene.overlayUI && (
          <OverlayUI>
            {scene.overlayUI.type === "dialogue" ? (
              <DialogueBox
                speaker={scene.overlayUI.speaker ?? ""}
                text={scene.overlayUI.text}
              />
            ) : (
              <NarrationBox text={scene.overlayUI.text} />
            )}
          </OverlayUI>
        )}

        {scene.overlayChoice && (
          <ChoiceList
            choices={scene.overlayChoice.choices}
            onChoose={choose}
            visitedFriends={visitedFriends}
          />
        )}
      </div>
      <FlashEffect visible={flash || manualFlash} />
      <FadeTransition visible={transition} />
    </div>
  );
}
