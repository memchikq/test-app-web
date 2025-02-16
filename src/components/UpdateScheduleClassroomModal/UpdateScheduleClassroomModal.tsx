import ApiService from "@/service/ApiService"
import { IClassroomData, ISchedule, ISlot } from "@/service/ScheduleApiService/ScheduleApiService.types"
import { Button, Dialog, DialogPanel, DialogTitle, Select } from "@headlessui/react"
import { FC, useEffect, useState } from "react"

interface CreateSubjectModalProps {
  openModal: boolean
  selectedSlot: { id: string; slot: ISlot }
  templateId: string
  refetchData: () => Promise<void>
  closeModal: () => void
}

const UpdateScheduleClassroomModal: FC<CreateSubjectModalProps> = ({ openModal, selectedSlot, templateId, closeModal, refetchData }) => {
  const [selectedClassroomId, setSelectedClassroomId] = useState("")
  const [availableClassrooms, setAvailableClassrooms] = useState<IClassroomData[]>([])
  const handleSubmit = async () => {
    try {
      await ApiService.scheduleApiService.updateScheduleClassroom({
        id: selectedSlot.slot.groupData[0]._id,
        classRoomId: selectedClassroomId,
        timeSlotId: selectedSlot.slot.timeSlot._id,
      })
      await refetchData()
      closeModal()
    } catch (error) {
      console.error(error)
    }
  }

  const getAvailableClassroom = async () => {
    const data = await ApiService.scheduleApiService.getAvailableClassroom(selectedSlot.slot.timeSlot._id, templateId)
    setAvailableClassrooms(data)
  }

  useEffect(() => {
    if (selectedSlot) getAvailableClassroom()
  }, [selectedSlot])
  console.log("se", selectedClassroomId)
  return (
    <Dialog open={openModal} onClose={closeModal} className="relative z-50 max-h-[80vh] overflow-auto">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="w-1/2 space-y-4 bg-black border p-12 overflow-auto">
          <DialogTitle className="font-bold ">Выберите доступную аудиторию</DialogTitle>

          {availableClassrooms.length ? (
            <div className="flex flex-col gap-2">
              <Select onChange={(e) => setSelectedClassroomId(e.target.value)} className={"text-black"}>
                {availableClassrooms.map((v) => (
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
            <h1>Нет доступных аудиторий</h1>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default UpdateScheduleClassroomModal
