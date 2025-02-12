"use client"

import { IGroup } from "@/types/group.type"
import { Button } from "@headlessui/react"
import { FC, useState } from "react"
import CreateGroupModal from "../CreateGroupModal/CreateGroupModal"

const Group: FC<{ groupData: IGroup[] }> = ({ groupData }) => {
  const [groups, setGroups] = useState<IGroup[]>(groupData || [])
  const [openModal, setOpenModal] = useState(false)
  const refetchGroupData = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/group`)
    const data = await response.json()
    setGroups(data)
  }

  const closeModal = () => {
    setOpenModal(false)
  }

  return (
    <div>
      <Button className={"border"} onClick={() => setOpenModal(true)}>
        Добавить группу
      </Button>

      <div className="flex flex-col gap-2">
        <h2 className="text-center my-4 text-2xl">Список групп</h2>
        {groups.map((v) => (
          <div key={v._id} className="flex gap-2 border rounded-md p-2">
            {v.name}
          </div>
        ))}
      </div>

      {openModal && <CreateGroupModal closeModal={closeModal} openModal={openModal} refetchGroupData={refetchGroupData} />}
    </div>
  )
}

export default Group
