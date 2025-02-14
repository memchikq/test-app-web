class TemplateApiService {
  async getTemplate() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/template`)
    const data = await response.json()
    return data
  }
  async getTemplateClassRooms() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/template/classroom`)
    const data = await response.json()
    return data
  }
  async getTemplateSubject() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/template/subject`)
    const data = await response.json()
    return data
  }

  async createClassRooms(name: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/template/classroom/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
    const data = await response.json()
    return data
  }

  async createTemplate(body:ICreateTemplateBody) {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/template/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
  }
  async createSubject(name: string) {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/template/subject/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
  }
}

export { TemplateApiService }
