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
  timeRanges: {
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
  } = useForm<Inputs>({
    defaultValues: {
      classRooms: [{ name: "" }],
      name: "",
      subjects: [{ name: "" }],
      timeRanges: [{ startTime: "", endTime: "" }],
    },
  })
  const timeRangesArray = useFieldArray({
    control,
    name: "timeRanges",
  })
  const classRoomsArray = useFieldArray({
    control,
    name: "classRooms",
  })
  const subjectsArray = useFieldArray({
    control,
    name: "subjects",
  })
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/template/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      await refetchGroupData()
      closeModal()
    } catch (error) {
      alert("Ошибка")
    }
  }

  const validatetimeRanges = (index: number, value: string, type: "start" | "end") => {
    const timeRanges = watch("timeRanges")

    if (!value) {
      return "Поле обязательно для заполнения"
    }

    const [hours, minutes] = value.split(":").map(Number)
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      return "Неверный формат времени. Используйте формат HH:mm"
    }

    if (type === "start") {
      if (index > 0) {
        const previousEndTime = timeRanges[index - 1]?.endTime

        if (!previousEndTime) {
          return "Предыдущее время окончания не задано"
        }

        if (value < previousEndTime) {
          return "Время начала должно быть больше предыдущего времени окончания"
        }
      }
    }

    if (type === "end") {
      const currentStartTime = timeRanges[index]?.startTime

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
    <Dialog open={openModal} onClose={closeModal} className="relative z-50 max-h-[80vh] overflow-auto">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="w-1/2 space-y-4 bg-black border p-12 overflow-auto">
          <DialogTitle className="font-bold ">Добавить шаблон</DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col max-h-[80vh] overflow-auto gap-2">
            <input {...register("name")} placeholder="Название шаблона" />
            <div className="max-h-60 overflow-y-auto flex flex-col gap-2">
              {timeRangesArray.fields.map((field, index) => (
                <div className="flex flex-col gap-2 text-blackn relative" key={field.id}>
                  <span
                    onClick={() => {
                      if (timeRangesArray.fields.length > 1) {
                        timeRangesArray.remove(index)
                      }
                    }}
                    className="absolute top-0 right-0 text-red-500 cursor-pointer font-bold"
                  >
                    X
                  </span>
                  <div className="flex gap-2 w-full text-black">
                    <input
                      {...register(`timeRanges.${index}.startTime`, { validate: (value) => validatetimeRanges(index, value, "start") })}
                      placeholder="Начало времени"
                      className={`${errors.timeRanges?.[index]?.startTime ? "border-red-500 border" : ""} flex-1`}
                    />
                    <input
                      {...register(`timeRanges.${index}.endTime`, { validate: (value) => validatetimeRanges(index, value, "end") })}
                      placeholder="Конец времени"
                      className={`${errors.timeRanges?.[index]?.endTime ? "border-red-500" : ""} flex-1`}
                    />
                  </div>
                  {errors.timeRanges?.[index]?.startTime && (
                    <span className="text-red-500 text-sm">{errors.timeRanges[index]?.startTime?.message?.toString()}</span>
                  )}
                  {errors.timeRanges?.[index]?.endTime && (
                    <span className="text-red-500 text-sm">{errors.timeRanges[index]?.endTime?.message?.toString()}</span>
                  )}
                </div>
              ))}
            </div>
            <Button onClick={() => timeRangesArray.append({ startTime: "", endTime: "" })} className={"border"}>
              Добавить время
            </Button>
            <div className="max-h-60 overflow-y-auto flex flex-col gap-2 relative">
              {classRoomsArray.fields.map((field, index) => (
                <div className="flex flex-col gap-2 text-black relative" key={field.id}>
                  <span
                    onClick={() => {
                      if (classRoomsArray.fields.length > 1) {
                        classRoomsArray.remove(index)
                      }
                    }}
                    className="absolute top-0 right-0 text-red-500 cursor-pointer font-bold"
                  >
                    X
                  </span>
                  <div className="flex gap-2 w-full">
                    <input
                      {...register(`classRooms.${index}.name`, {
                        required: "Поле обязательно для заполнения",
                        validate: (v) => v.trim().length > 0,
                      })}
                      placeholder="Название кабинета"
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
            <div className="max-h-60 overflow-y-auto flex flex-col gap-2">
              {subjectsArray.fields.map((field, index) => (
                <div className="flex flex-col gap-2 text-black relative" key={field.id}>
                  <span
                    onClick={() => {
                      if (subjectsArray.fields.length > 1) {
                        subjectsArray.remove(index)
                      }
                    }}
                    className="absolute top-0 right-0 text-red-500 cursor-pointer font-bold"
                  >
                    X
                  </span>
                  <div className="flex gap-2 w-full">
                    <input
                      {...register(`subjects.${index}.name`, {
                        required: "Поле обязательно для заполнения",
                        validate: (v) => v.trim().length > 0,
                      })}
                      placeholder="Название предмета"
                      className={`${errors.subjects?.[index]?.name ? "border-red-500" : ""} flex-1`}
                    />
                  </div>
                  {errors.subjects?.[index]?.name && (
                    <span className="text-red-500 text-sm">{errors.subjects[index]?.name.message?.toString()}</span>
                  )}
                </div>
              ))}
            </div>
            <Button onClick={() => subjectsArray.append({ name: "" })} className={"border"}>
              Добавить предмет
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
