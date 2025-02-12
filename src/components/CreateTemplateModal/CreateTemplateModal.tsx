import { Button, Dialog, DialogPanel, DialogTitle, Input } from "@headlessui/react"
import { FC, useState } from "react"
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"

interface CreateTemplateModalProps {
  openModal: boolean
  closeModal: () => void
  refetchGroupData: () => Promise<void>
}
interface Inputs {
  name: string
  timeRange: {
    startTime: string
    endTime: string
  }[]
  classRooms: {
    name: string
  }[]
  subjects: {
    name: string
  }[]
}

const CreateTemplateModal: FC<CreateTemplateModalProps> = ({ openModal, refetchGroupData, closeModal }) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>()
  const timeRangeArray = useFieldArray({
    control,
    name: "timeRange",
  })
  const classRoomsArray = useFieldArray({
    control,
    name: "classRooms",
  })
  const subjectsArray = useFieldArray({
    control,
    name: "subjects",
  })
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  //   const onSubmit = async (e: React.FormEvent) => {
  //     try {
  //       e.preventDefault()
  //       await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/group/create`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         // body: JSON.stringify({ name }),
  //       })
  //       await refetchGroupData()
  //       closeModal()
  //     } catch (error) {
  //       alert("Ошибка")
  //     }
  //   }
  const validateTimeRange = (index: number, value: string, type: "start" | "end") => {
    const timeRange = watch("timeRange")

    if (!value) {
      return "Поле обязательно для заполнения"
    }

    const [hours, minutes] = value.split(":").map(Number)
    console.log("h", hours)
    console.log("m", minutes)
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      return "Неверный формат времени. Используйте формат HH:mm"
    }

    if (type === "start") {
      if (index > 0) {
        const previousEndTime = timeRange[index - 1]?.endTime

        if (!previousEndTime) {
          return "Предыдущее время окончания не задано"
        }

        if (value < previousEndTime) {
          return "Время начала должно быть больше предыдущего времени окончания"
        }
      }
    }

    if (type === "end") {
      const currentStartTime = timeRange[index]?.startTime

      if (!currentStartTime) {
        return "Время начала не задано"
      }

      if (value < currentStartTime) {
        return "Время окончания должно быть больше времени начала"
      }
    }

    return true
  }
  return (
    <Dialog open={openModal} onClose={closeModal} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="w-1/2 space-y-4 bg-black border p-12">
          <DialogTitle className="font-bold ">Добавить шаблон</DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <input {...register("name")} placeholder="Название шаблона" />
            <div className="max-h-60 overflow-y-auto flex flex-col gap-2">
              {timeRangeArray.fields.map((field, index) => (
                <div className="flex flex-col gap-2 text-black" key={field.id}>
                  <div className="flex gap-2 w-full">
                    <input
                      {...register(`timeRange.${index}.startTime`, { validate: (value) => validateTimeRange(index, value, "start") })}
                      placeholder="Начало времени"
                      className={`${errors.timeRange?.[index]?.startTime ? "border-red-500 border" : ""} flex-1`}
                    />
                    <input
                      {...register(`timeRange.${index}.endTime`, { validate: (value) => validateTimeRange(index, value, "end") })}
                      placeholder="Конец времени"
                      className={`${errors.timeRange?.[index]?.endTime ? "border-red-500" : ""} flex-1`}
                    />
                  </div>
                  {errors.timeRange?.[index]?.startTime && (
                    <span className="text-red-500 text-sm">{errors.timeRange[index]?.startTime?.message?.toString()}</span>
                  )}
                  {errors.timeRange?.[index]?.endTime && (
                    <span className="text-red-500 text-sm">{errors.timeRange[index]?.endTime?.message?.toString()}</span>
                  )}
                </div>
              ))}
            </div>
            <Button onClick={() => timeRangeArray.append({ startTime: "", endTime: "" })} className={"border"}>
              Добавить время
            </Button>
            <div className="max-h-60 overflow-y-auto flex flex-col gap-2">
              {classRoomsArray.fields.map((field, index) => (
                <div className="flex flex-col gap-2 text-black" key={field.id}>
                  <div className="flex gap-2 w-full">
                    <input
                      {...register(`classRooms.${index}.name`, { required: "Поле обязательно для заполнения",validate:(v)=> v.trim().length > 0 })}
                      placeholder="Начало времени"
                      className={`${errors.classRooms?.[index]?.name ? "border-red-500" : ""} flex-1`}
                    />
                  </div>
                  {errors.classRooms?.[index]?.name && (
                    <span className="text-red-500 text-sm">{errors.classRooms[index]?.name.message?.toString()}</span>
                  )}
                </div>
              ))}
            </div>
            <Button onClick={() => classRoomsArray.append({ name: "" })} className={"border"}>
              Добавить кабинет
            </Button>
            <Button type="submit" className="bg-blue-500 text-white">
              Сохранить
            </Button>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default CreateTemplateModal
