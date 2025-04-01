import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import FollowersList from "@/components/followers/followers-list"
import FollowersStats from "@/components/followers/followers-stats"
import FollowersActions from "@/components/followers/followers-actions"
import FollowersSearch from "@/components/followers/followers-search"

export default function FollowersDashboard() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Gestion des abonnés</h1>
        <p className="text-muted-foreground">
          Gérez vos abonnés, consultez les statistiques et effectuez des actions en masse.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <FollowersStats />
      </div>

      <div className="grid gap-4 grid-cols-1">
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle>Abonnés</CardTitle>
              <FollowersActions />
            </div>
            <CardDescription>Liste complète de vos abonnés avec options de filtrage et de recherche.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <FollowersSearch />
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">Tous</TabsTrigger>
                  <TabsTrigger value="active">Actifs</TabsTrigger>
                  <TabsTrigger value="inactive">Inactifs</TabsTrigger>
                  <TabsTrigger value="recent">Récents</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="space-y-4">
                  <FollowersList filter="all" />
                </TabsContent>
                <TabsContent value="active" className="space-y-4">
                  <FollowersList filter="active" />
                </TabsContent>
                <TabsContent value="inactive" className="space-y-4">
                  <FollowersList filter="inactive" />
                </TabsContent>
                <TabsContent value="recent" className="space-y-4">
                  <FollowersList filter="recent" />
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

