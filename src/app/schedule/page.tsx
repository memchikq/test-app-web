import ScheduleTable from "@/components/Schedule/ScheduleTable"
import ApiService from "@/service/ApiService"
import Link from "next/link"

const Schedule = async () => {
  const data = (await ApiService.templateApiService.getTemplateIdList()) || []
  console.log("data", data)
  return (
    <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
      <h1 className="text-5xl">Выбери расписание для шаблона</h1>
      <div className="flex gap-2">
        {data?.map((v: any) => (
          <Link key={v._id} href={`/schedule/${v._id}`}  className="flex flex-col border p-5">{v?.name}</Link>
        ))}
      </div>
    </div>
  )
}

export default Schedule
