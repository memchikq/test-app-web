"use client"

import { Button } from "@headlessui/react"
import { useState } from "react"
import CreateTemplateModal from "../CreateTemplateModal/CreateTemplateModal"

const Template = () => {
  const [openModal, setOpenModal] = useState(false)
  const refetchGroupData = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/group`)
    const data = await response.json()
  }

  const closeModal = () => {
    setOpenModal(false)
  }
  return (
    <div>
      <Button onClick={() => setOpenModal(true)} className={"border"}>
        Добавить шаблон
      </Button>
      {openModal && <CreateTemplateModal openModal={openModal} refetchGroupData={refetchGroupData} closeModal={closeModal} />}
    </div>
  )
}

export default Template
