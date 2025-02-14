interface ICreateTemplateBody {
  name: string
  classRooms: string[]
  subjects: string[]
  timeRanges: { startTime: string; endTime: string }[]
}
