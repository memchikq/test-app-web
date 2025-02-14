"use client"
import CreateClassRoomModal from "@/components/CreateClassRoomModal/CreateClassRoomModal"
import ApiService from "@/service/ApiService"
import { IClassRoom } from "@/types/classroom.type"

import { Button } from "@headlessui/react"
import { FC, useState } from "react"

interface ClassRoomProps {
  classRoomData: IClassRoom[]
}

const ClassRoom: FC<ClassRoomProps> = ({ classRoomData }) => {
  const [openModal, setOpenModal] = useState(false)
  const [classRooms, setClassRooms] = useState<IClassRoom[]>(classRoomData || [])
  const refetchClassRoomData = async () => {
    const data = await ApiService.templateApiService.getTemplateClassRooms()
    setClassRooms(data)
  }

  const closeModal = () => {
    setOpenModal(false)
  }
  return (
    <div>
      <Button onClick={() => setOpenModal(true)} className={"border"}>
        Добавить аудиторию
      </Button>
      <h2 className="text-center my-4 text-2xl">Список аудиторий</h2>
      {classRooms.map((v) => (
        <div key={v._id} className="flex flex-col gap-2 border rounded-md p-2">
          <p>{v.name}</p>
        </div>
      ))}
      {openModal && <CreateClassRoomModal openModal={openModal} refetchClassRoomData={refetchClassRoomData} closeModal={closeModal} />}
    </div>
  )
}

export default ClassRoom
