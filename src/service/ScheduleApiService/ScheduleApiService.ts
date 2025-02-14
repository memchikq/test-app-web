class ScheduleApiService {
  async generateSechedule(templateId: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/schedule/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ templateId }),
    })
    const data = await response.json()
    return data
  }
  async updateScheduleGroupOrder(payload: { id: string; order: number }[]) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/schedule/update/order`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload }),
    })
    const data = await response.json()
    return data
  }
  async getSchedule(templateId: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/schedule?templateId=${templateId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    })
    const data = await response.json()
    return data
  }
}

export { ScheduleApiService }
