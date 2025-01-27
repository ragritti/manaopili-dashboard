"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Dashboard({ data }) {
  const [selectedOrg, setSelectedOrg] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  if (!data.length) return <div>Loading...</div>

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
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((org) => (
                <TableRow key={org._id}>
                  <TableCell>{org.OrganizationName}</TableCell>
                  <TableCell>{org.email}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setSelectedOrg(org)
                        setIsDialogOpen(true)
                      }}
                    >
                      View Data
                    </Button>
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
            <DialogTitle>{selectedOrg?.OrganizationName} Data</DialogTitle>
          </DialogHeader>
          <div className="h-full">
            <iframe
              src={`${selectedOrg?._id}`}
              className="w-full h-full border-0"
              title="Organization Metrics"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

