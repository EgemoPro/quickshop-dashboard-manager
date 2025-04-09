"use client"

import { useSelector } from "react-redux"
import { ArrowDown, ArrowUp, Users, UserPlus, UserMinus, Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { selectFollowers } from "@/store/slices/followersSlice"

export default function FollowersStats() {
  const { stats } = useSelector(selectFollowers)

  const statCards = [
    {
      title: "Total d'abonnés",
      value: stats.total,
      icon: Users,
      change: stats.growthRate,
      changeText: `${stats.growthRate > 0 ? "+" : ""}${stats.growthRate}% depuis le mois dernier`,
      changeDirection: stats.growthRate >= 0 ? "up" : "down",
    },
    {
      title: "Nouveaux abonnés",
      value: stats.newFollowers,
      icon: UserPlus,
      change: stats.newFollowersChange,
      changeText: `${stats.newFollowersChange > 0 ? "+" : ""}${stats.newFollowersChange}% depuis le mois dernier`,
      changeDirection: stats.newFollowersChange >= 0 ? "up" : "down",
    },
    {
      title: "Désabonnements",
      value: stats.unfollows,
      icon: UserMinus,
      change: stats.unfollowsChange,
      changeText: `${stats.unfollowsChange > 0 ? "+" : ""}${stats.unfollowsChange}% depuis le mois dernier`,
      changeDirection: stats.unfollowsChange <= 0 ? "up" : "down",
    },
    {
      title: "Taux d'engagement",
      value: `${stats.engagementRate}%`,
      icon: Activity,
      change: stats.engagementChange,
      changeText: `${stats.engagementChange > 0 ? "+" : ""}${stats.engagementChange}% depuis le mois dernier`,
      changeDirection: stats.engagementChange >= 0 ? "up" : "down",
    },
  ]

  return (
    <>
      {statCards.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              {stat.changeDirection === "up" ? (
                <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
              ) : (
                <ArrowDown className="h-3 w-3 mr-1 text-red-500" />
              )}
              <span className={stat.changeDirection === "up" ? "text-green-500" : "text-red-500"}>
                {stat.changeText}
              </span>
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

