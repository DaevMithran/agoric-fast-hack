"use client"

import { useEffect, useState } from "react"
import { ChevronRight, File, Folder } from "lucide-react"
import { cn } from "@/lib/utils"
import { Toolbar } from "./toolbar"

interface FileItem {
  name: string
  type: "file" | "folder"
  content?: string
  children?: FileItem[]
}

interface FileExplorerProps {
  onFileSelect: (content: string) => void
  onFileSave: (path: string, content: string) => void
}

export function FileExplorer({ onFileSelect, onFileSave }: FileExplorerProps) {
  const [files, setFiles] = useState<FileItem[]>([])

  const handleNewFile = () => {
    const fileName = prompt("Enter file name:")
    if (fileName) {
      setFiles([...files, { name: fileName, type: "file", content: "" }])
    }
  }

  const handleNewFolder = () => {
    const folderName = prompt("Enter folder name:")
    if (folderName) {
      setFiles([...files, { name: folderName, type: "folder", children: [] }])
    }
  }

  const handleUploadFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      setFiles([...files, { name: file.name, type: "file", content }])
    }
    reader.readAsText(file)
  }

  const handleFileSave = (path: string, content: string) => {
    const updateFileContent = (items: FileItem[]): FileItem[] => {
      return items.map((item) => {
        if (item.type === "file" && item.name === path) {
          return { ...item, content }
        }
        if (item.type === "folder" && item.children) {
          return { ...item, children: updateFileContent(item.children) }
        }
        return item
      })
    }

    setFiles(updateFileContent(files))
    onFileSave(path, content)
  }

  useEffect(() => {
    const fetchFiles = async () => {
      const response = await fetch("/api/files")
      const data = await response.json()
      setFiles(data)
    }

    fetchFiles()
  }, [])

  return (
    <div className="w-64 bg-[#2a2c3b] border-r border-[#3a3c4b] overflow-auto flex flex-col">
      <div className="p-4 border-b border-[#3a3c4b]">
        <h2 className="text-sm font-semibold">FILE EXPLORER</h2>
      </div>
      <Toolbar
        onNewFile={handleNewFile}
        onNewFolder={handleNewFolder}
        onUploadFile={handleUploadFile}
      />
      <div className="p-2 flex-1 overflow-auto">
        {files.map((item) => (
          <FileItem
            key={item.name}
            item={item}
            onFileSelect={onFileSelect}
            onFileSave={handleFileSave}
          />
        ))}
      </div>
    </div>
  )
}

interface FileItemProps {
  item: FileItem
  level?: number
  onFileSelect: (content: string) => void
  onFileSave: (path: string, content: string) => void
}

function FileItem({
  item,
  level = 0,
  onFileSelect,
  onFileSave,
}: FileItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    if (item.type === "folder") {
      setIsOpen(!isOpen)
    } else if (item.content !== undefined) {
      onFileSelect(item.content)
    }
  }

  return (
    <div>
      <div
        className={cn(
          "flex items-center py-1 px-2 hover:bg-[#3a3c4b] cursor-pointer",
          { "bg-[#3a3c4b]": isOpen }
        )}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={handleClick}
      >
        {item.type === "folder" && (
          <ChevronRight
            className={cn("w-4 h-4 mr-1", { "transform rotate-90": isOpen })}
          />
        )}
        {item.type === "folder" ? (
          <Folder className="w-4 h-4 mr-2" />
        ) : (
          <File className="w-4 h-4 mr-2" />
        )}
        <span className="text-sm">{item.name}</span>
      </div>
      {isOpen && item.children && (
        <div>
          {item.children.map((child) => (
            <FileItem
              key={child.name}
              item={child}
              level={level + 1}
              onFileSelect={onFileSelect}
              onFileSave={onFileSave}
            />
          ))}
        </div>
      )}
    </div>
  )
}
