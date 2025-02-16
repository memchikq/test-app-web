import ApiService from "@/service/ApiService"
import { IClassRoom } from "@/types/classroom.type"
import { Button, Dialog, DialogPanel, DialogTitle, Input } from "@headlessui/react"
import { FC, useEffect, useState } from "react"
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"

interface CreateTemplateModalProps {
  openModal: boolean
  closeModal: () => void
  refetchTemplateData: () => Promise<void>
}
interface Inputs {
  name: string
  timeRanges: {
    startTime: string
    endTime: string
  }[]
  classRooms: {
    id: string
  }[]
  subjects: {
    id: string
  }[]
}

const CreateTemplateModal: FC<CreateTemplateModalProps> = ({ openModal, refetchTemplateData, closeModal }) => {
  const [classRoms, setClassRooms] = useState<IClassRoom[]>([])
  const [subject, setSubject] = useState<IClassRoom[]>([])
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      classRooms: [{ id: "" }],
      name: "",
      subjects: [{ id: "" }],
      timeRanges: [{ startTime: "", endTime: "" }],
    },
  })
  const timeRangesArray = useFieldArray({
    control,
    name: "timeRanges",
  })
  const getClassRooms = async () => {
    const data = await ApiService.templateApiService.getTemplateClassRooms()
    setClassRooms(data)
  }
  useEffect(() => {
    getClassRooms()
  }, [])
  const getSubjects = async () => {
    const data = await ApiService.templateApiService.getTemplateSubject()
    setSubject(data)
  }
  useEffect(() => {
    getClassRooms()
    getSubjects()
  }, [])
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const classRooms = data.classRooms.filter((v) => v.id).map((v) => v.id)
    const subjects = data.subjects.filter((v) => v.id).map((v) => v.id)
    if (!classRooms.length) {
      alert("Нудно указать аудитории")
      return
    }
    if (!subjects.length) {
      alert("Нудно указать предметы")
      return
    }
    try {
      const body: ICreateTemplateBody = {
        name: data.name,
        classRooms,
        subjects,
        timeRanges: data.timeRanges,
      }
      await ApiService.templateApiService.createTemplate(body)
      await refetchTemplateData()
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
              <p>Добавить кабинет</p>
              {classRoms.map((field, index) => (
                <div className="flex flex-col gap-2  relative" key={field._id}>
                  <div className="flex gap-2 w-full text-white">
                    <p>{field.name}</p>
                    <input
                      value={field._id}
                      {...register(`classRooms.${index}.id`, {})}
                      placeholder="Название кабинета"
                      type="checkbox"
                      className={`${errors.classRooms?.[index]?.id ? "border-red-500" : ""}`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="max-h-60 overflow-y-auto flex flex-col gap-2">
              <p>Добавить предмет</p>
              {subject.map((field, index) => (
                <div className="flex flex-col gap-2  relative" key={field._id}>
                  <div className="flex gap-2 w-full text-white">
                    <p>{field.name}</p>
                    <input
                      {...register(`subjects.${index}.id`)}
                      value={field._id}
                      type="checkbox"
                      placeholder="Название предмета"
                      className={`${errors.subjects?.[index]?.id ? "border-red-500" : ""} flex-1`}
                    />
                  </div>
                  {errors.subjects?.[index]?.id && (
                    <span className="text-red-500 text-sm">{errors.subjects[index]?.id.message?.toString()}</span>
                  )}
                </div>
              ))}
            </div>
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
