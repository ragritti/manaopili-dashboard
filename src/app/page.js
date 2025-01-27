'use client'

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios from "axios"
import { useEffect, useState } from "react"
import Dashboard from "./Dashboard"

// This would typically come from your API
const sampleData = [
  {
    people: {
      standard: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      professional: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      enterprise: [0, 0, 4],
    },
    process: {
      standard: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      professional: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      enterprise: [0, 0, 2],
    },
    technology: {
      standard: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      professional: [0, 0, 1, 0, 1, 0, 0, 0, 0],
      enterprise: [0, 0, 0],
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

  function callApiPeriodically(url, interval = 5000) {
    const fetchApi = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('API Response:', data);
      } catch (error) {
        console.error('API Call Error:', error);
      }
    };

    // Initial call
    fetchApi();

    // Periodic calls
    return setInterval(fetchApi, interval);
  }

  const getData = async (key = '') => {
    const payload = {
      key
    }
    const data = await axios.post("http://localhost:3000/api/dashboard", payload)
    console.log(data)
    setData(data?.data?.data)
  }

  const tabs = [
    {
      label: "Total Users",
      slug: "total",
    },
    {
      label: "Failed Users",
      slug: "failed",
    }
  ]
  const handleTabChange = (value) => {
    setActiveTab(value)
    getData(value)

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
        <Dashboard data={data} />
      </Tabs>
    </div>
  )
}

