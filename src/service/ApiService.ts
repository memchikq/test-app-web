import { GroupApiService } from "./GroupApiService/GroupApiService"
import { ScheduleApiService } from "./ScheduleApiService/ScheduleApiService"
import { TemplateApiService } from "./TemplateApiService/TemplateApiService"

class ApiService {
  templateApiService: TemplateApiService
  groupApiService: GroupApiService
  scheduleApiService: ScheduleApiService
  constructor() {
    this.templateApiService = new TemplateApiService()
    this.groupApiService = new GroupApiService()
    this.scheduleApiService = new ScheduleApiService()
  }
}

export default new ApiService()
