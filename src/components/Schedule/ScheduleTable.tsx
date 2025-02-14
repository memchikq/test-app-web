"use client"
import ApiService from "@/service/ApiService"
import { ISchedule } from "@/service/ScheduleApiService/ScheduleApiService.types"
import { FC, useState } from "react"

interface ScheduleTableProps {
  data: ISchedule[]
  templateId: string
}

const ScheduleTable: FC<ScheduleTableProps> = ({ data, templateId }) => {
  const [schedule, setSchedule] = useState<ISchedule[]>(data || [])
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const updateOrderOnServer = async (updatedSchedule: ISchedule[]) => {
    try {
      const payload = updatedSchedule.map((item) => ({
        id: item.originalId,
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

  const handleGenerate = async () => {
    await ApiService.scheduleApiService.generateSechedule(templateId)
  }

  return (
    <div className="max-w-full overflow-x-auto bg-gray-900 shadow-md rounded-lg">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Расписание</h2>
        <button onClick={handleGenerate} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition duration-300">
          Генерировать
        </button>
      </div>

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
                {v.slots[i].groupData[0].name}
              </th>
              {v.slots.map((s, j) => (
                <td key={j} className="py-3 px-4 text-center text-sm text-gray-300 border-b border-gray-700">
                  {s.subjectData[0].name} ({s.classroomData[0].name})
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ScheduleTable
