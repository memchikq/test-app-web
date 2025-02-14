import ClassRoom from "@/components/ClassRoom/ClassRoom"
import Group from "@/components/Group/Group"
import Subject from "@/components/Subject/Subject"
import Template from "@/components/Template/Template"
import ApiService from "@/service/ApiService"
import React from "react"

const Page = async () => {
  let groupData, templateData, classRoomData, subjectData
  try {
    ;[groupData, templateData, classRoomData, subjectData] = await Promise.all([
      ApiService.groupApiService.getGroup(),
      ApiService.templateApiService.getTemplate(),
      ApiService.templateApiService.getTemplateClassRooms(),
      ApiService.templateApiService.getTemplateSubject(),
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
