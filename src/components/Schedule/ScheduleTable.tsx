"use client"
import ApiService from "@/service/ApiService"
import { ISchedule, ISlot } from "@/service/ScheduleApiService/ScheduleApiService.types"
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react"
import { FC, useState } from "react"
import { toast } from "react-toastify"
import UpdateScheduleClassroomModal from "../UpdateScheduleClassroomModal/UpdateScheduleClassroomModal"

interface ScheduleTableProps {
  data: ISchedule[]
  templateId: string
}

const ScheduleTable: FC<ScheduleTableProps> = ({ data, templateId }) => {
  const [schedule, setSchedule] = useState<ISchedule[]>(data || [])
  const [numberVisits, setNumberVisits] = useState(0)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<null | {id:string,slot:ISlot}>(null)
  const [openUpdateClassroomModal, setOpenUpdateClassroomModal] = useState(false)
  console.log("sc", schedule)
  const handleRefectScheduleData = async () => {
    try {
      const data = await ApiService.scheduleApiService.getSchedule(templateId)
      setSchedule(data || [])
    } catch (error) {
      toast.error("Ошибка получения данных расписания")
    }
  }
  const updateOrderOnServer = async (updatedSchedule: ISchedule[]) => {
    try {
      const payload = updatedSchedule.map((item) => ({
        id: item._id,
        order: item.order,
      }))
      await ApiService.scheduleApiService.updateScheduleGroupOrder(payload)
      console.log("Порядок успешно обновлен на сервере")
    } catch (error) {
      console.log("err", error)
      console.error("Ошибка при обновлении порядка:", error)
    }
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDrop = (dropIndex: number) => {
    if (draggedIndex === null || draggedIndex === dropIndex) return

    const updatedSchedule = [...schedule]

    const [movedItem] = updatedSchedule.splice(draggedIndex, 1)

    updatedSchedule.splice(dropIndex, 0, movedItem)

    updatedSchedule.forEach((item, index) => {
      item.order = index + 1
    })

    setSchedule(updatedSchedule)

    updateOrderOnServer(updatedSchedule)

    setDraggedIndex(null)
  }

  const handleUpdateClassroomOpenModal = (id:string,slot: ISlot) => {
    setSelectedSlot({id,slot})
    setOpenUpdateClassroomModal(true)
  }

  console.log("selec",selectedSlot)

  const handleGenerate = async () => {
    try {
      setLoading(true)
      await ApiService.scheduleApiService.generateSechedule(templateId, +numberVisits)
      await handleRefectScheduleData()
      toast.success("Успешная генрация")
    } catch (error) {
      toast.error("Ошибка генерации")
    } finally {
      setLoading(false)
    }
  }
  const handleRegenerate = async () => {
    try {
      setLoading(true)
      await ApiService.scheduleApiService.regenerateSechedule(templateId)
      await handleRefectScheduleData()
      toast.success("Успешная пересборка расписания")
    } catch (error) {
      toast.error("Ошибка пересборки")
    } finally {
      setLoading(false)
    }
  }

  const handleChangeLockStatus = async (id: string, lock: boolean) => {
    try {
      await ApiService.scheduleApiService.updateLockStudentGroup({ id, lock })
      await handleRefectScheduleData()
      toast.success("Статус успешно изменен")
    } catch (error) {
      toast.error("Ошибка изменения статуса")
    }
  }

  return (
    <div className="max-w-full overflow-x-auto bg-gray-900 shadow-md rounded-lg">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Расписание</h2>
        <div className="gap-2">
          {!schedule.length ? (
            <input
              value={numberVisits}
              // @ts-ignore
              onChange={(e) => setNumberVisits(e.target.value)}
              type="number"
              placeholder="Количество посещений"
              className="bg-slate-600 py-2 rounded-md px-2"
            />
          ) : (
            ""
          )}
          <button
            disabled={loading}
            onClick={!schedule.length ? handleGenerate : handleRegenerate}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition duration-300"
          >
            {schedule.length ? "Пересобрать" : "Генерировать"}
          </button>
        </div>
      </div>

      {schedule.length ? (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-800">
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-300 border-b border-gray-700">Группа</th>
              {schedule?.[0]?.slots.map((v, i) => (
                <th key={i} className="py-3 px-4 text-center text-sm font-semibold text-gray-300 border-b border-gray-700">
                  <div className="flex flex-col items-center justify-center">
                    <p>{i + 1} урок</p>
                    <p className="break-words whitespace-normal w-12 text-xs text-gray-400">
                      {v.timeSlot.startTime}-{v.timeSlot.endTime}
                    </p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {schedule.map((v, i) => (
              <tr
                key={v._id}
                draggable
                onDragStart={() => handleDragStart(i)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(i)}
                className={`hover:bg-gray-700 transition duration-200 ${draggedIndex === i ? "opacity-50" : ""}`}
              >
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-200 border-b border-gray-700">
                  {v?.slots?.[0]?.groupData?.[0]?.name}{" "}
                  {v?.slots?.[0]?.isFixed ? (
                    <p className="cursor-pointer" onClick={() => handleChangeLockStatus(v._id, false)}>
                      ❌
                    </p>
                  ) : (
                    <p className="cursor-pointer" onClick={() => handleChangeLockStatus(v._id, true)}>
                      ✔️
                    </p>
                  )}
                </th>
                {v.slots.map((s, j) => (
                  <td key={j} className="py-3 px-4 text-center text-sm text-gray-300 border-b border-gray-700">
                    <Popover className="relative">
                      <PopoverButton>
                        {s?.subjectData?.[0]?.name} ({s?.classroomData?.[0]?.name})
                      </PopoverButton>
                      <PopoverPanel anchor="bottom" className="flex flex-col bg-slate-700">
                        <p onClick={() => handleUpdateClassroomOpenModal(v._id,s)} className="p-2 cursor-pointer">
                          Изменить аудиторию
                        </p>
                        <p className="p-2 cursor-pointer">Изменить предмет</p>
                      </PopoverPanel>
                    </Popover>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1 className="text-center my-5 text-5xl">Нет расписания</h1>
      )}
      {openUpdateClassroomModal && selectedSlot && (
        <UpdateScheduleClassroomModal
          openModal={openUpdateClassroomModal}
          closeModal={() => setOpenUpdateClassroomModal(false)}
          refetchData={handleRefectScheduleData}
          selectedSlot={selectedSlot}
          templateId={templateId}
        />
      )}
    </div>
  )
}

export default ScheduleTable
