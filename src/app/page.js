'use client'

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios from "axios"
import { useEffect, useState } from "react"
import Dashboard from "./Dashboard"
import { run } from "./gemini"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Loading from "./loading"

// This would typically come from your API
const sampleData = [
  {
    "people": {
      "standard": [2, 3, 1, 2, 1, 0, 1, 1, 0, 0],
    },
    "process": {
      "standard": [2, 2, 2, 2, 1, 0, 1, 1, 0, 0],
    },
    "technology": {
      "standard": [2, 3, 1, 3, 1, 0, 2, 1, 0, 0],
    },
    _id: "67963a17ef1712e9caa7e7fc",
    email: "test@gmail.com",
    OrganizationName: "dndndndnd",
    __v: 0,
  },
]


export default function Page() {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState("total")
  const [res, setRes] = useState('')
  const [loading, setLoading] = useState(false)

  var res2 = ''


  const getData = async (key = 'success') => {
    const payload = {
      key
    }
    const data = await axios.post("https://manaopili-dashboard.vercel.app/api/dashboard", payload)
    setData(data?.data?.data)
  }

  const tabs = [
    {
      label: "Total Users",
      slug: "success",
    },
    {
      label: "Failed Users",
      slug: "error",
    }
  ]
  const handleTabChange = (value) => {
    setActiveTab(value)
    getData(value)

  }

  const handleGenerate = async (data) => {
    setLoading(true)
    res2 = await run(data)
    res2 && setLoading(false)
    setRes(res2)

  }

  useEffect(() => {
    getData()
  }, [])
  return (
    <div className="p-6">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="flex justify-start gap-5 border-b border-gray-200 bg-white">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.slug}
              value={tab.slug}
              className={`px-4 py-2 text-sm font-medium transition-colors
                ${activeTab === tab.slug ? "text-black border-b-2 border-black" : "text-gray-500 hover:text-gray-700"}`}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <Dashboard
          data={data}
          handleGenerate={handleGenerate}
        />
        <Dialog open={res || loading} onOpenChange={() => setRes('')}>
        <DialogHeader>
            </DialogHeader>
          <DialogContent className="max-w-4xl h-[80vh] overflow-y-auto">
            {res ? res : <Loading />}
          </DialogContent>
        </Dialog>
      </Tabs>
    </div>
  )
}

