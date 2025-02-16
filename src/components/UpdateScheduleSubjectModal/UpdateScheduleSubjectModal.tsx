import ApiService from "@/service/ApiService"
import { IClassroomData, ISchedule, ISlot } from "@/service/ScheduleApiService/ScheduleApiService.types"
import { Button, Dialog, DialogPanel, DialogTitle, Select } from "@headlessui/react"
import { FC, useEffect, useState } from "react"

interface CreateSubjectModalProps {
  openModal: boolean
  selectedSlot: { id: string; slot: ISlot }
  refetchData: () => Promise<void>
  closeModal: () => void
}

const UpdateScheduleSubjectModal: FC<CreateSubjectModalProps> = ({ openModal, selectedSlot, closeModal, refetchData }) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState("")
  const [subjects, setSubjects] = useState<IClassroomData[]>([])
  const handleSubmit = async () => {
    try {
      await ApiService.scheduleApiService.updateScheduleSubject({
        id: selectedSlot.slot.groupData[0]._id,
        classRoomId: selectedSubjectId,
        timeSlotId: selectedSlot.slot.timeSlot._id,
      })
      await refetchData()
      closeModal()
    } catch (error) {
      console.error(error)
    }
  }

  const getSubjects = async () => {
    const data = await ApiService.templateApiService.getTemplateSubject()
    setSubjects(data)
  }

  useEffect(() => {
    if (selectedSlot) getSubjects()
  }, [selectedSlot])
  return (
    <Dialog open={openModal} onClose={closeModal} className="relative z-50 max-h-[80vh] overflow-auto">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="w-1/2 space-y-4 bg-black border p-12 overflow-auto">
          <DialogTitle className="font-bold ">Выберите предмет</DialogTitle>

          {subjects.length ? (
            <div className="flex flex-col gap-2">
              <Select onChange={(e) => setSelectedSubjectId(e.target.value)} className={"text-black"}>
                {subjects.map((v) => (
                  <option value={v._id} key={v._id}>
                    {v.name}
                  </option>
                ))}
              </Select>
              <Button onClick={handleSubmit} className={"border"}>
                Сохранить
              </Button>
            </div>
          ) : (
            <h1>Нет доступных предметов</h1>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default UpdateScheduleSubjectModal
