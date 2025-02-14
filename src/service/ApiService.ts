import { GroupApiService } from "./GroupApiService/GroupApiService"
import { TemplateApiService } from "./TemplateApiService/TemplateApiService"

class ApiService {
  templateApiService: TemplateApiService
  groupApiService: GroupApiService
  constructor() {
    this.templateApiService = new TemplateApiService()
    this.groupApiService = new GroupApiService()
  }
}

export default new ApiService()
