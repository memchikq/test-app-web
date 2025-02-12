import { Button, Dialog, DialogPanel, DialogTitle, Input } from "@headlessui/react"
import { FC, useState } from "react"

interface CreateGroupModalProps {
  openModal: boolean
  closeModal: () => void
  refetchGroupData: () => Promise<void>
}

const CreateGroupModal: FC<CreateGroupModalProps> = ({ openModal, refetchGroupData, closeModal }) => {
  const [name, setName] = useState("")

  const onSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault()
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/group/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      })
      await refetchGroupData()
      closeModal()
    } catch (error) {
      alert("Ошибка")
    }
  }
  return (
    <Dialog open={openModal} onClose={closeModal} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 border p-12">
          <DialogTitle className="font-bold">Добавить группы</DialogTitle>
          <form onSubmit={onSubmit} className="flex flex-col gap-2">
            <Input placeholder="Название" className={"bg-black text-white border"} value={name} onChange={(e) => setName(e.target.value)} />
            <Button type="submit" className={"border"}>
              Сохранить
            </Button>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default CreateGroupModal
