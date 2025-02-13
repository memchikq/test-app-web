import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import { FC, useState } from "react"

interface CreateSubjectModalProps {
  openModal: boolean
  refetchSubjectData: () => Promise<void>
  closeModal: () => void
}

const CreateSubjectModal: FC<CreateSubjectModalProps> = ({ openModal, closeModal, refetchSubjectData }) => {
  const [name, setName] = useState("")

  const handleSubmit = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/template/subject/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      })
      await refetchSubjectData()
      closeModal()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog open={openModal} onClose={closeModal} className="relative z-50 max-h-[80vh] overflow-auto">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="w-1/2 space-y-4 bg-black border p-12 overflow-auto">
          <DialogTitle className="font-bold ">Добавить предмет</DialogTitle>

          <div className="flex flex-col gap-2">
            <input value={name} onChange={(e) => setName(e.target.value)} className="border text-black" placeholder="Название" />
            <Button onClick={handleSubmit} className={"border"}>
              Сохранить
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default CreateSubjectModal
