import Group from "@/components/Group/Group"
import Template from "@/components/Template/Template"
import React from "react"

async function fetchGroupData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/group`, { cache: "no-store" })
  if (!res.ok) throw new Error("Ошибка получения данных")
  return res.json()
}
async function fetchTemplateData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/template`, { cache: "no-store" })
  if (!res.ok) throw new Error("Ошибка получения данных")
  return res.json()
}

const Page = async () => {
  const [groupData,templateData] = await Promise.all([fetchGroupData(), fetchTemplateData()])
  return ( 
    <div className="h-screen w-full flex flex-col gap-4  ">
      <div className="flex gap-3 justify-evenly w-full">
        <Template templateData={templateData} />
        <Group groupData={groupData} />
      </div>
    </div>
  )
}

export default Page
