import Group from "@/components/Group/Group"
import Template from "@/components/Template/Template"
import React from "react"

async function fetchGroupData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/group`, { cache: "no-store" })
  if (!res.ok) throw new Error("Ошибка получения данных")
  return res.json()
}

const Page = async () => {
  const groupData = await fetchGroupData()
  return ( 
    <div className="h-screen w-full flex flex-col gap-4  ">
      <div className="flex gap-3 justify-evenly w-full">
        <Template  />
        <Group groupData={groupData} />
      </div>
    </div>
  )
}

export default Page
