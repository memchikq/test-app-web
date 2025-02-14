"use client"

import { Button } from "@headlessui/react"
import { FC, useState } from "react"
import CreateSubjectModal from "../CreateSubjectModal/CreateSubjectModal"
import { ISubject } from "@/types/subject.types"
import ApiService from "@/service/ApiService"

interface SubjectProps {
  subjectData: ISubject[]
}

const Subject: FC<SubjectProps> = ({ subjectData }) => {
  const [openModal, setOpenModal] = useState(false)
  const [subjects, setSubjects] = useState<ISubject[]>(subjectData || [])
  const refetchSubjectData = async () => {
    const data = await ApiService.templateApiService.getTemplateSubject()
    setSubjects(data)
  }

  const closeModal = () => {
    setOpenModal(false)
  }
  return (
    <div>
      <Button onClick={() => setOpenModal(true)} className={"border"}>
        Добавить предмет
      </Button>
      <h2 className="text-center my-4 text-2xl">Список предметов</h2>
      {subjects.map((v) => (
        <div key={v._id} className="flex flex-col gap-2 border rounded-md p-2">
          <p>{v.name}</p>
        </div>
      ))}
      {openModal && <CreateSubjectModal openModal={openModal} refetchSubjectData={refetchSubjectData} closeModal={closeModal} />}
    </div>
  )
}

export default Subject
