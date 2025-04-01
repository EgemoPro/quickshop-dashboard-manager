"use client"

import type React from "react"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { searchFollowers } from "@/store/slices/followersSlice"

export default function FollowersSearch() {
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    showVIP: true,
    showRegular: true,
    dateRange: "all",
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(searchFollowers({ term: searchTerm, filters }) as any)
  }

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <form onSubmit={handleSearch} className="flex-1 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher par nom, email..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button type="submit">Rechercher</Button>
      </form>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtres
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Type d'abonné</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={filters.showVIP}
            onCheckedChange={(checked) => handleFilterChange("showVIP", checked)}
          >
            VIP
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={filters.showRegular}
            onCheckedChange={(checked) => handleFilterChange("showRegular", checked)}
          >
            Standard
          </DropdownMenuCheckboxItem>

          <DropdownMenuSeparator />
          <DropdownMenuLabel>Période d'abonnement</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={filters.dateRange === "all"}
            onCheckedChange={(checked) => checked && handleFilterChange("dateRange", "all")}
          >
            Tous
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={filters.dateRange === "lastMonth"}
            onCheckedChange={(checked) => checked && handleFilterChange("dateRange", "lastMonth")}
          >
            Dernier mois
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={filters.dateRange === "last3Months"}
            onCheckedChange={(checked) => checked && handleFilterChange("dateRange", "last3Months")}
          >
            3 derniers mois
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={filters.dateRange === "lastYear"}
            onCheckedChange={(checked) => checked && handleFilterChange("dateRange", "lastYear")}
          >
            Dernière année
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

