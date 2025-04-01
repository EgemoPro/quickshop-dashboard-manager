"use client"

import { useSelector, useDispatch } from "react-redux"
import { Download, Mail, Tag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  selectFollowers,
  exportFollowers,
  removeFollowers,
  tagFollowers,
  messageFollowers,
} from "@/store/slices/followersSlice"
import { useState } from "react"

export default function FollowersActions() {
  const dispatch = useDispatch()
  const { selectedFollowers } = useSelector(selectFollowers)
  const [messageOpen, setMessageOpen] = useState(false)
  const [tagOpen, setTagOpen] = useState(false)
  const [messageSubject, setMessageSubject] = useState("")
  const [messageContent, setMessageContent] = useState("")
  const [tagName, setTagName] = useState("")

  const handleExport = () => {
    dispatch(exportFollowers(selectedFollowers) as any)
  }

  const handleRemove = () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ces abonnés ?")) {
      dispatch(removeFollowers(selectedFollowers) as any)
    }
  }

  const handleSendMessage = () => {
    dispatch(
      messageFollowers({
        followerIds: selectedFollowers,
        subject: messageSubject,
        content: messageContent,
      }) as any,
    )
    setMessageOpen(false)
    setMessageSubject("")
    setMessageContent("")
  }

  const handleTagFollowers = () => {
    dispatch(
      tagFollowers({
        followerIds: selectedFollowers,
        tag: tagName,
      }) as any,
    )
    setTagOpen(false)
    setTagName("")
  }

  const isDisabled = selectedFollowers.length === 0

  return (
    <div className="flex items-center gap-2">
      <Dialog open={messageOpen} onOpenChange={setMessageOpen}>
        <Dialog open={tagOpen} onOpenChange={setTagOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" disabled={isDisabled}>
                Actions en masse
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                {selectedFollowers.length} abonné{selectedFollowers.length > 1 ? "s" : ""} sélectionné
                {selectedFollowers.length > 1 ? "s" : ""}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={() => setMessageOpen(true)}>
                  <Mail className="h-4 w-4 mr-2" />
                  Envoyer un message
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={() => setTagOpen(true)}>
                  <Tag className="h-4 w-4 mr-2" />
                  Ajouter un tag
                </DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuItem onSelect={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600" onSelect={handleRemove}>
                <Trash2 className="h-4 w-4 mr-2" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un tag</DialogTitle>
              <DialogDescription>
                Ajoutez un tag aux {selectedFollowers.length} abonné{selectedFollowers.length > 1 ? "s" : ""}{" "}
                sélectionné{selectedFollowers.length > 1 ? "s" : ""}.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="tag-name">Nom du tag</Label>
                <Input
                  id="tag-name"
                  placeholder="ex: VIP, Prospect, Client..."
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setTagOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleTagFollowers} disabled={!tagName.trim()}>
                Ajouter le tag
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Envoyer un message</DialogTitle>
            <DialogDescription>
              Envoyez un message aux {selectedFollowers.length} abonné{selectedFollowers.length > 1 ? "s" : ""}{" "}
              sélectionné{selectedFollowers.length > 1 ? "s" : ""}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="subject">Sujet</Label>
              <Input
                id="subject"
                placeholder="Sujet du message"
                value={messageSubject}
                onChange={(e) => setMessageSubject(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Contenu du message..."
                className="min-h-[150px]"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMessageOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSendMessage} disabled={!messageSubject.trim() || !messageContent.trim()}>
              Envoyer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

