"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CopyIcon } from "lucide-react"
import { copyTextToClipboard } from "./utils"

export default function Dashboard({ data }) {
  const [selectedOrg, setSelectedOrg] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

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
            {data?.length > 0 && <TableHeader>
              <TableRow>
                <TableHead>Organization Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>}
            <TableBody>
              {data?.length > 0 ? data?.map((org) => (
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
                        onClick={() => copyTextToClipboard(getData(org).toString())}
                      >
                        <CopyIcon className="w-6 h-6" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )) :
                <div className="flex w-full justify-center items-center h-52 text-gray-500">
                  No users have been added yet. Let's wait for some users to join us!
                </div>
              }
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>{selectedOrg?.OrganizationName} data</DialogTitle>
          </DialogHeader>
          <div className="h-full p-4 bg-gray-100 rounded-lg">
            <pre className="whitespace-pre-wrap">{getData(selectedOrg)}</pre>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

