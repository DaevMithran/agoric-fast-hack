'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface DeploymentPanelProps {
  selectedChain: string
}

export function DeploymentPanel({ selectedChain }: DeploymentPanelProps) {
  return (
    <div className="h-full flex flex-col border-l">
      <Tabs defaultValue="deploy" className="flex-1">
        <div className="h-12 border-b flex items-center px-4">
          <TabsList>
            <TabsTrigger value="deploy">Deploy</TabsTrigger>
            <TabsTrigger value="console">Console</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="deploy" className="flex-1">
          <ScrollArea className="h-full">
            <div className="p-4">
              <div className="text-sm">
                Selected network: <span className="font-medium">{selectedChain}</span>
              </div>
              <pre className="mt-4 text-sm">
                {`> Ready to deploy
> Connect wallet to continue...`}
              </pre>
            </div>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="console" className="flex-1">
          <ScrollArea className="h-full">
            <div className="p-4">No console output.</div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}

