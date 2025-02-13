"use client"

import { Button } from "@headlessui/react"
import { FC, useState } from "react"
import CreateTemplateModal from "../CreateTemplateModal/CreateTemplateModal"
import { ITemplate } from "@/types/template.type"

interface TemplateProps {
  templateData: ITemplate[]
}

const Template: FC<TemplateProps> = ({ templateData}) => {
  const [templates, setTemplates] = useState<ITemplate[]>(templateData || [])
  const [openModal, setOpenModal] = useState(false)
  const refetchTemplateData = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/template`)
    const data = await response.json()
    setTemplates(data)
  }

  const closeModal = () => {
    setOpenModal(false)
  }
  return (
    <div>
      <Button onClick={() => setOpenModal(true)} className={"border"}>
        Добавить шаблон
      </Button>
      <h2 className="text-center my-4 text-2xl">Список шаблонов</h2>
      {templates.map((v) => (
        <div key={v._id} className="flex flex-col gap-2 border rounded-md p-2">
          <p>{v.name}</p>
          {v.timeRanges.map((time,i) => (
            <p key={i}>{`${time.startTime}-${time.endTime}`}</p>
          ))}
          {/* <p>Кол-во предметов {v.subjects.length}</p>
          <p>Кол-во аудиторий {v.classRooms.length}</p> */}
        </div>
      ))}
      {openModal && (
        <CreateTemplateModal
          openModal={openModal}
          refetchTemplateData={refetchTemplateData}
          closeModal={closeModal}
        />
      )}
    </div>
  )
}

export default Template
