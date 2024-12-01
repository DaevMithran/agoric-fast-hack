"use client"

import { File, Folder, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ToolbarProps {
  onNewFile: () => void
  onNewFolder: () => void
  onUploadFile: (file: File) => void
}

export function Toolbar({
  onNewFile,
  onNewFolder,
  onUploadFile,
}: ToolbarProps) {
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onUploadFile(file)
    }
  }

  return (
    <div className="flex items-center space-x-2 p-2 bg-[#2a2c3b] border-b border-[#3a3c4b]">
      <Button variant="ghost" size="icon" onClick={onNewFile}>
        <File className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={onNewFolder}>
        <Folder className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" asChild>
        <label>
          <Upload className="h-4 w-4" />
          <input type="file" className="hidden" onChange={handleUpload} />
        </label>
      </Button>
    </div>
  )
}
