"use client"

import ModeToggle from "@/components/common/ModeToggle"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useSettings } from "@/hooks/use-settings"

const SettingsModal = () => {
  const settings = useSettings()

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">My settings</h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>Apperance</Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Customize how Blaknotion looks on your device
            </span>
          </div>
          <ModeToggle />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SettingsModal
