"use client"

import { useState } from "react"
import Editor from "@monaco-editor/react"

export function CodeEditor({ code }: { code: string }) {
  //const [code, setCode] = useState('// Write your Agoric contract here\n') //Removed useState hook as code is now passed as a prop

  return (
    <div className="flex-1 h-full">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={code}
        onChange={(value) => {}} //onChange is now a no-op as the code is managed externally.
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          roundedSelection: false,
          scrollBeyondLastLine: false,
          readOnly: false,
          automaticLayout: true,
        }}
      />
    </div>
  )
}
