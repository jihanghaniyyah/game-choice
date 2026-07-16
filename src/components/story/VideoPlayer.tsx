interface VideoPlayerProps {
  src: string;
  onEnded?: () => void;
}

export default function VideoPlayer({ src, onEnded }: VideoPlayerProps) {
  return (
    <video
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      controls={false}
      onEnded={onEnded}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
