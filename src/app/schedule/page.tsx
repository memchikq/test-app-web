import ScheduleTable from "@/components/Schedule/ScheduleTable"

const Schedule = () => {
  return (
    <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
      <h1 className="text-5xl">Расписание</h1>
      <ScheduleTable />
    </div>
  )
}

export default Schedule
