'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function CompilationPanel() {
  return (
    <div className="h-full flex flex-col border-l">
      <Tabs defaultValue="compile" className="flex-1">
        <div className="h-12 border-b flex items-center px-4">
          <TabsList>
            <TabsTrigger value="compile">Compile</TabsTrigger>
            <TabsTrigger value="errors">Errors</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="compile" className="flex-1">
          <ScrollArea className="h-full">
            <div className="p-4">
              <pre className="text-sm">
                {`> Compiling Agoric contract...
> Hardening JavaScript code...
> Contract compiled successfully!`}
              </pre>
            </div>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="errors" className="flex-1">
          <ScrollArea className="h-full">
            <div className="p-4">No errors found.</div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}

