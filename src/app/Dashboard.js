"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CopyIcon } from "lucide-react"
import { copyTextToClipboard } from "./utils"

export default function Dashboard({ data , handleGenerate}) {
  const [selectedOrg, setSelectedOrg] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [response,setResponse] = useState('')

  if (!data.length) return <div>Loading...</div>


  const getData = (org) => {
    const requiredData = {
      OrganizationName: org?.OrganizationName,
      email: org?.email,
      people: org?.people,
      process: org?.process,
      technology: org?.technology
    }
    return JSON.stringify(requiredData, null, 2)
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Total Organizations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{data.length}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Organizations</CardTitle>
        </CardHeader> 
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organization Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Generate AI Response</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((org) => (
                <TableRow key={org._id}>
                  <TableCell>{org.OrganizationName}</TableCell>
                  <TableCell>{org.email}</TableCell>
                  <TableCell>
                    <div className="flex justify-start items-center gap-2">
                      <Button
                        onClick={() => {
                          setSelectedOrg(org)
                          setIsDialogOpen(true)
                        }}
                      >
                        View Data
                      </Button>
                      <Button
                        onClick={() => copyTextToClipboard(getData(org).toString()) }
                      >
                        <CopyIcon className="w-6 h-6" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button onClick={()=> handleGenerate(getData(org).toString())} >
                      Generate
                    </Button>
                    {response&&<div>{response}</div>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>{selectedOrg?.OrganizationName} data</DialogTitle>
          </DialogHeader>
          <div className="h-full">
            {getData(selectedOrg)}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

