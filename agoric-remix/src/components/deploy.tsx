"use client"

import { useState } from "react"
import { ChevronDown, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Banner3D } from "./banner-3d"

export function Deploy() {
  const [environment, setEnvironment] = useState("remix-vm")
  const [gasLimit, setGasLimit] = useState("estimated")
  const [customGas, setCustomGas] = useState("3000000")
  const [value, setValue] = useState("0")
  const [denomination, setDenomination] = useState("wei")

  return (
    <div className="h-full flex">
      <div className="w-80 bg-[#2a2c3b] border-r border-[#3a3c4b] overflow-auto">
        <div className="p-4 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>ENVIRONMENT</Label>
              <Info className="w-4 h-4 text-gray-400" />
            </div>
            <Select value={environment} onValueChange={setEnvironment}>
              <SelectTrigger className="w-full bg-[#1d1e20]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="remix-vm">Remix VM (Cancun)</SelectItem>
                <SelectItem value="injected">Injected Provider</SelectItem>
                <SelectItem value="web3">Web3 Provider</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="block mb-2">ACCOUNT</Label>
            <div className="p-2 bg-[#1d1e20] rounded-md">
              <div className="flex items-center justify-between text-sm">
                <span>0x5B3...eddC4</span>
                <span>100 ether</span>
              </div>
            </div>
          </div>

          <div>
            <Label className="block mb-2">GAS LIMIT</Label>
            <RadioGroup value={gasLimit} onValueChange={setGasLimit}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="estimated" id="estimated" />
                <Label htmlFor="estimated">Estimated Gas</Label>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom">Custom</Label>
                {gasLimit === "custom" && (
                  <Input
                    value={customGas}
                    onChange={(e) => setCustomGas(e.target.value)}
                    className="ml-2 w-32 bg-[#1d1e20]"
                  />
                )}
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label className="block mb-2">VALUE</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="bg-[#1d1e20]"
              />
              <Select value={denomination} onValueChange={setDenomination}>
                <SelectTrigger className="w-24 bg-[#1d1e20]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wei">Wei</SelectItem>
                  <SelectItem value="gwei">Gwei</SelectItem>
                  <SelectItem value="ether">Ether</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="block mb-2">CONTRACT</Label>
            <div className="p-2 bg-[#1d1e20] rounded-md text-sm text-gray-400">
              No compiled contracts
            </div>
            <div className="flex gap-2 mt-2">
              <Button variant="secondary" className="flex-1">
                At Address
              </Button>
              <Button variant="secondary" className="flex-1">
                Deploy
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 hover:bg-[#1d1e20] rounded-md cursor-pointer">
              <span>Transactions recorded</span>
              <div className="flex items-center">
                <span className="bg-blue-500 text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2">
                  0
                </span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-[#1d1e20] rounded-md cursor-pointer">
              <span>Deployed Contracts</span>
              <div className="flex items-center">
                <span className="bg-blue-500 text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2">
                  0
                </span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center"></div>
    </div>
  )
}
