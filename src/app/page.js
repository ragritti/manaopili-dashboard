'use client'

import { useEffect, useState } from "react"
import Dashboard from "./Dashboard"
import axios from "axios"

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

  const getData = async () => {
    const data = await axios.get("http://localhost:3000/api/dashboard/")
    console.log(data)
    setData(data?.data?.data)
  }
  
  useEffect(() => {
    getData()
  }, [])
  return (
    <div className="p-6">
      <Dashboard data={data} />
    </div>
  )
}

