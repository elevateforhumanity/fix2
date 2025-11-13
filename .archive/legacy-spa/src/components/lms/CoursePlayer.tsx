import { useState } from 'react'
import { Play, Pause, Volume2, Maximize } from 'lucide-react'

interface CoursePlayerProps {
  videoUrl: string
  title: string
  onProgress?: (progress: number) => void
}

export default function CoursePlayer({ videoUrl, title, onProgress }: CoursePlayerProps) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleProgress = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget
    const percent = (video.currentTime / video.duration) * 100
    setProgress(percent)
    onProgress?.(percent)
  }

  return (
    <div className="bg-black rounded-2xl overflow-hidden">
      <video
        className="w-full aspect-video"
        src={videoUrl}
        onTimeUpdate={handleProgress}
        controls
      />
      <div className="bg-white p-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="mt-2 bg-slate-200 rounded-full h-2">
          <div 
            className="bg-brand-blue h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-slate-600 mt-1">{Math.round(progress)}% complete</p>
      </div>
    </div>
  )
}
