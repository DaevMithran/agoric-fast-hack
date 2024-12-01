"use client"

import { useState } from "react"
import { FileExplorer } from "./file-explorer"
import { CodeEditor } from "./editor"
import { Terminal } from "./terminal"

export function IDE() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [selectedFileContent, setSelectedFileContent] = useState<string>(
    "// Write your Agoric contract here\n"
  )

  const handleFileSelect = (content: string) => {
    setSelectedFileContent(content)
    setSelectedFile(content)
  }

  const handleFileSave = (path: string, content: string) => {
    console.log(`Saving file: ${path}`)
    // Here you would typically save the file to your backend or local storage
    // For now, we'll just update the selected file content
    if (selectedFile === path) {
      setSelectedFileContent(content)
    }
  }

  return (
    <div className="flex h-full">
      <FileExplorer
        onFileSelect={handleFileSelect}
        onFileSave={handleFileSave}
      />
      <div className="flex-1 flex flex-col">
        <CodeEditor code={selectedFileContent} />
        <Terminal />
      </div>
    </div>
  )
}
