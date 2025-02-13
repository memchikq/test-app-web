import ClassRoom from "@/components/ClassRoom/ClassRoom"
import Group from "@/components/Group/Group"
import Subject from "@/components/Subject/Subject"
import Template from "@/components/Template/Template"
import React from "react"

async function fetchData(endpoint: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${endpoint}`, { next: { revalidate: 5 } })
  if (!res.ok) throw new Error(`Ошибка получения данных для ${endpoint}`)
  return res.json()
}

const Page = async () => {
  let groupData, templateData, classRoomData, subjectData
  try {
    ;[groupData, templateData, classRoomData, subjectData] = await Promise.all([
      fetchData("group"),
      fetchData("template"),
      fetchData("template/classroom"),
      fetchData("template/subject"),
    ])
  } catch (error) {
    console.error(error)
    return <div>Произошла ошибка при загрузке данных</div>
  }
  return (
    <div className="h-screen w-full flex flex-col gap-4  ">
      <div className="flex gap-3 justify-evenly w-full">
        <Template templateData={templateData} />
        <ClassRoom classRoomData={classRoomData} />
        <Subject subjectData={subjectData} />
        <Group groupData={groupData} />
      </div>
    </div>
  )
}

export default Page
