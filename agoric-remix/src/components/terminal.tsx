"use client"

import { useState } from "react"
import { ChevronUp, ChevronDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Terminal() {
  const [isVisible, setIsVisible] = useState(true)
  const [output, setOutput] = useState([
    "> etners.js",
    "> sol-gpt <your Solidity question here>",
    "Type the library name to see available commands.",
  ])
  const [logs, setLogs] = useState([
    "[INFO] Application started",
    "[DEBUG] Connecting to database",
    "[INFO] Database connection established",
  ])

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-[#1d1e20] border-t border-[#3a3c4b] transition-all duration-300",
        isVisible ? "h-48" : "h-8"
      )}
    >
      <div className="flex items-center justify-between px-4 h-8 bg-[#2a2c3b] border-b border-[#3a3c4b]">
        <span className="text-sm text-gray-300">Terminal</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="text-gray-400 hover:text-white"
          >
            {isVisible ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronUp className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      {isVisible && (
        <Tabs defaultValue="terminal" className="h-40">
          <TabsList className="bg-[#2a2c3b] border-b border-[#3a3c4b]">
            <TabsTrigger value="terminal">Terminal</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
          </TabsList>
          <TabsContent value="terminal" className="p-4 h-full overflow-auto">
            <div className="font-mono text-sm">
              {output.map((line, i) => (
                <div key={i} className="text-gray-300">
                  {line}
                </div>
              ))}
              <div className="flex items-center text-gray-300 mt-2">
                <span className="mr-2">&gt;</span>
                <input
                  type="text"
                  className="flex-1 bg-transparent outline-none"
                  placeholder="Type a command..."
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="logs" className="p-4 h-full overflow-auto">
            <div className="font-mono text-sm">
              {logs.map((log, i) => (
                <div key={i} className="text-gray-300">
                  {log}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
