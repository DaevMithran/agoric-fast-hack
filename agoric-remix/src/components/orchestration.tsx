"use client"

import { useState, useEffect } from "react"
import { Plus, X, Play, History, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Method {
  name: string
  type: "public" | "creator"
  params: string[]
}

interface Tile {
  id: string
  network: string
  contractAddress: string
  methods: Method[]
}

interface OrchestrationHistory {
  id: string
  status: "Running" | "Success" | "Failed"
  completedSteps: number
  totalSteps: number
  logs: string[]
}

const networks = ["Agoric Mainnet", "Agoric Testnet", "Local Network"]

const contractTemplates = {
  NFT: {
    address: "0x1234567890123456789012345678901234567890",
    methods: [
      { name: "owner", type: "public", params: ["id"] },
      { name: "tokenURI", type: "public", params: ["id"] },
      { name: "transferFrom", type: "public", params: ["from", "to", "id"] },
      { name: "_mint", type: "creator", params: ["to", "id"] },
      { name: "_burn", type: "creator", params: ["id"] },
    ],
  },
  Token: {
    address: "0x0987654321098765432109876543210987654321",
    methods: [
      { name: "balanceOf", type: "public", params: ["account"] },
      { name: "transfer", type: "public", params: ["to", "amount"] },
      { name: "approve", type: "public", params: ["spender", "amount"] },
      { name: "_mint", type: "creator", params: ["to", "amount"] },
      { name: "_burn", type: "creator", params: ["from", "amount"] },
    ],
  },
  Marketplace: {
    address: "0x5555666677778888999900001111222233334444",
    methods: [
      { name: "listItem", type: "public", params: ["tokenId", "price"] },
      { name: "buyItem", type: "public", params: ["tokenId"] },
      { name: "cancelListing", type: "public", params: ["tokenId"] },
      { name: "setFee", type: "creator", params: ["newFee"] },
      { name: "withdrawFees", type: "creator", params: [] },
    ],
  },
}

const mockFetchMethods = async (
  network: string,
  address: string
): Promise<Method[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay
  const template = Object.values(contractTemplates).find(
    (t) => t.address === address
  )
  return template ? template.methods : []
}

const mockFetchIBCCalls = async (network: string): Promise<Method[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay
  return [
    {
      name: "sendPacket",
      type: "public",
      params: ["destinationChain", "data"],
    },
    { name: "receivePacket", type: "public", params: ["sourceChain", "data"] },
  ]
}

export function Orchestration() {
  const [tiles, setTiles] = useState<Tile[]>([])
  const [isOrchestrating, setIsOrchestrating] = useState(false)
  const [history, setHistory] = useState<OrchestrationHistory[]>([])
  const [selectedLogs, setSelectedLogs] = useState<string[]>([])

  const addTile = () => {
    const newTile: Tile = {
      id: Date.now().toString(),
      network: "",
      contractAddress: "",
      methods: [],
    }
    setTiles([...tiles, newTile])
  }

  const removeTile = (id: string) => {
    setTiles(tiles.filter((tile) => tile.id !== id))
  }

  const updateTile = (id: string, updates: Partial<Tile>) => {
    setTiles(
      tiles.map((tile) => (tile.id === id ? { ...tile, ...updates } : tile))
    )
  }

  const fetchMethods = async (id: string, network: string, address: string) => {
    const methods = address
      ? await mockFetchMethods(network, address)
      : await mockFetchIBCCalls(network)
    updateTile(id, { methods })
  }

  const handleOrchestrate = () => {
    setIsOrchestrating(true)
    const newOrchestration: OrchestrationHistory = {
      id: Date.now().toString(),
      status: "Running",
      completedSteps: 0,
      totalSteps: tiles.length,
      logs: [],
    }
    setHistory([newOrchestration, ...history])

    // Simulate orchestration process
    let currentStep = 0
    const intervalId = setInterval(() => {
      currentStep++
      if (currentStep <= tiles.length) {
        setHistory((prev) =>
          prev.map((item) =>
            item.id === newOrchestration.id
              ? {
                  ...item,
                  completedSteps: currentStep,
                  logs: [...item.logs, `Step ${currentStep} completed`],
                }
              : item
          )
        )
      } else {
        clearInterval(intervalId)
        setHistory((prev) =>
          prev.map((item) =>
            item.id === newOrchestration.id
              ? { ...item, status: Math.random() > 0.2 ? "Success" : "Failed" }
              : item
          )
        )
        setIsOrchestrating(false)
      }
    }, 1000)
  }

  return (
    <div className="h-full flex flex-col p-4 bg-[#1a1b1c] overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Orchestration</h2>
        <div className="flex space-x-2">
          <Button onClick={handleOrchestrate}>
            <Play className="mr-2 h-4 w-4" /> Orchestrate
          </Button>
          <Button onClick={addTile}>
            <Plus className="mr-2 h-4 w-4" /> Add Tile
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <History className="mr-2 h-4 w-4" /> History
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Orchestration History</DialogTitle>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-lg ${
                      item.status === "Running"
                        ? "bg-blue-500"
                        : item.status === "Success"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white">
                        ID: {item.id}
                      </span>
                      <span className="text-white">{item.status}</span>
                    </div>
                    <div className="text-white mt-2">
                      Progress: {item.completedSteps}/{item.totalSteps}
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="mt-2"
                      onClick={() => setSelectedLogs(item.logs)}
                    >
                      View Logs
                    </Button>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {tiles.map((tile) => (
          <Card key={tile.id} className="bg-[#3a3c4b] border-[#4a4c5b]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-100">
                Contract {tiles.indexOf(tile) + 1}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeTile(tile.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <Select
                value={tile.network}
                onValueChange={(value) => {
                  updateTile(tile.id, { network: value, methods: [] })
                  fetchMethods(tile.id, value, tile.contractAddress)
                }}
              >
                <SelectTrigger className="w-full mb-2 text-white">
                  <SelectValue placeholder="Select network" />
                </SelectTrigger>
                <SelectContent>
                  {networks.map((network) => (
                    <SelectItem key={network} value={network}>
                      {network}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={tile.contractAddress}
                onValueChange={(value) => {
                  updateTile(tile.id, { contractAddress: value, methods: [] })
                  if (value && tile.network) {
                    fetchMethods(tile.id, tile.network, value)
                  }
                }}
              >
                <SelectTrigger className="w-full mb-2 text-white">
                  <SelectValue placeholder="Select contract" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(contractTemplates).map(
                    ([name, { address }]) => (
                      <SelectItem key={address} value={address}>
                        {name} ({address.slice(0, 6)}...{address.slice(-4)})
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              <Tabs defaultValue="methods" className="w-full">
                <TabsList>
                  <TabsTrigger value="methods">Methods</TabsTrigger>
                  <TabsTrigger value="params">Params</TabsTrigger>
                </TabsList>
                <TabsContent value="methods">
                  <div className="space-y-2">
                    {tile.methods.map((method) => (
                      <div
                        key={method.name}
                        className={`p-2 rounded ${
                          method.type === "public"
                            ? "bg-blue-500"
                            : "bg-orange-500"
                        } text-gray-100`}
                      >
                        {method.name}
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="params">
                  <div className="space-y-4">
                    {tile.methods.map((method) => (
                      <div key={method.name} className="space-y-2">
                        <div
                          className={`font-medium ${
                            method.type === "public"
                              ? "text-blue-300"
                              : "text-orange-300"
                          }`}
                        >
                          {method.name}
                        </div>
                        {method.params.map((param) => (
                          <Input
                            key={param}
                            placeholder={param}
                            className="w-full bg-[#2a2c3b] text-gray-100 border-[#4a4c5b]"
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>
      <AnimatePresence>
        {isOrchestrating && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-lg font-semibold text-gray-800">
                Orchestrating...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Dialog
        open={selectedLogs.length > 0}
        onOpenChange={() => setSelectedLogs([])}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Orchestration Logs</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-2">
            {selectedLogs.map((log, index) => (
              <div key={index} className="text-sm text-gray-600">
                {log}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
