import ScheduleTable from "@/components/Schedule/ScheduleTable"
import ApiService from "@/service/ApiService"

const ScheduleByTemplateId = async ({ params }: { params: Promise<{ templateId: string }> }) => {
  const templateId = (await params).templateId
  const data = await ApiService.scheduleApiService.getSchedule(templateId)
//   console.log("data",data)
  return (
    <div>
      <ScheduleTable data={data} templateId={templateId} />
    </div>
  )
}

export default ScheduleByTemplateId
