"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CheckCircle2, ChevronLeft, ChevronRight, MoreHorizontal, Star, UserX } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { fetchFollowers, selectFollowers, toggleSelectFollower } from "@/store/slices/followersSlice"
import { formatDate } from "@/lib/utils"

interface FollowersListProps {
  filter: "all" | "active" | "inactive" | "recent"
}

export default function FollowersList({ filter }: FollowersListProps) {
  const dispatch = useDispatch()
  const { followers, status, selectedFollowers } = useSelector(selectFollowers)
  const [page, setPage] = useState(1)
  const [perPage] = useState(10)

  useEffect(() => {
    dispatch(fetchFollowers({ filter, page, perPage }) as any)
  }, [dispatch, filter, page, perPage])

  const handleSelectAll = (checked: boolean) => {
    followers.forEach((follower) => {
      dispatch(toggleSelectFollower({ id: follower.id, selected: checked }))
    })
  }

  const handleSelectFollower = (id: string, checked: boolean) => {
    dispatch(toggleSelectFollower({ id, selected: checked }))
  }

  const filteredFollowers = followers.filter((follower) => {
    if (filter === "all") return true
    if (filter === "active") return follower.lastActive < 30
    if (filter === "inactive") return follower.lastActive >= 30
    if (filter === "recent") return follower.daysFollowing < 30
    return true
  })

  const totalPages = Math.ceil(filteredFollowers.length / perPage)
  const startIndex = (page - 1) * perPage
  const paginatedFollowers = filteredFollowers.slice(startIndex, startIndex + perPage)

  if (status === "loading") {
    return <div className="flex justify-center p-4">Chargement des abonnés...</div>
  }

  if (status === "failed") {
    return <div className="flex justify-center p-4 text-red-500">Erreur lors du chargement des abonnés</div>
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  onCheckedChange={handleSelectAll}
                  checked={selectedFollowers.length === followers.length && followers.length > 0}
                />
              </TableHead>
              <TableHead>Abonné</TableHead>
              <TableHead className="hidden md:table-cell">Date d'abonnement</TableHead>
              <TableHead className="hidden md:table-cell">Dernière activité</TableHead>
              <TableHead className="hidden md:table-cell">Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedFollowers.map((follower) => (
              <TableRow key={follower.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedFollowers.includes(follower.id)}
                    onCheckedChange={(checked) => handleSelectFollower(follower.id, !!checked)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={follower.avatar} alt={follower.name} />
                      <AvatarFallback>{follower.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="font-medium">{follower.name}</div>
                      <div className="text-sm text-muted-foreground">{follower.email}</div>
                    </div>
                    {follower.isVIP && (
                      <Badge variant="outline" className="ml-2">
                        <Star className="h-3 w-3 mr-1 text-yellow-500" />
                        VIP
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{formatDate(follower.followDate)}</TableCell>
                <TableCell className="hidden md:table-cell">{formatDate(follower.lastActiveDate)}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {follower.lastActive < 30 ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Actif
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                      Inactif
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Voir le profil</DropdownMenuItem>
                      <DropdownMenuItem>Envoyer un message</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <UserX className="h-4 w-4 mr-2" />
                        Bloquer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {paginatedFollowers.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  Aucun abonné trouvé
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Affichage de {paginatedFollowers.length > 0 ? startIndex + 1 : 0} à{" "}
          {Math.min(startIndex + perPage, filteredFollowers.length)} sur {filteredFollowers.length} abonnés
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => setPage(page - 1)} disabled={page === 1}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Page précédente</span>
          </Button>
          <div className="text-sm font-medium">
            Page {page} sur {totalPages || 1}
          </div>
          <Button variant="outline" size="sm" onClick={() => setPage(page + 1)} disabled={page >= totalPages}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Page suivante</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

