"use client"

import { Play, Pause, SkipBack, SkipForward } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"

export function TimelinePlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [time, setTime] = useState([600]) // 10:00 in minutes (600 minutes from 00:00)

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`
  }

  return (
    <div className="bg-card border-t px-6 py-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => setTime([Math.max(240, time[0] - 30)])}>
          <SkipBack className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="icon" onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>

        <Button variant="ghost" size="icon" onClick={() => setTime([Math.min(1440, time[0] + 30)])}>
          <SkipForward className="h-4 w-4" />
        </Button>

        <div className="flex-1 flex items-center gap-4">
          <span className="text-sm font-medium w-16">04:00</span>
          <Slider value={time} onValueChange={setTime} min={240} max={1440} step={30} className="flex-1" />
          <span className="text-sm font-medium w-16">24:00</span>
        </div>

        <div className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm font-medium min-w-[80px] text-center">
          {formatTime(time[0])}
        </div>
      </div>
    </div>
  )
}
