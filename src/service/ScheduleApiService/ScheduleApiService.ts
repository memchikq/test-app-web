class ScheduleApiService {
  async generateSechedule(templateId: string, numberVisits: number) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/schedule/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ templateId, numberVisits }),
    })
    const data = await response.json()
    return data
  }
  async regenerateSechedule(templateId: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/schedule/regenerate`, {
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
  async updateScheduleClassroom(payload: { id: string; classRoomId: string; timeSlotId: string }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/schedule/${payload.id}/edit/classroom`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ classRoomId: payload.classRoomId,timeSlotId:payload.timeSlotId }),
    })
    const data = await response.json()
    return data
  }
  async updateScheduleSubject(payload: { id: string; classRoomId: string; timeSlotId: string }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/schedule/${payload.id}/edit/subject`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subjectId : payload.classRoomId,timeSlotId:payload.timeSlotId }),
    })
    const data = await response.json()
    return data
  }
  async updateLockStudentGroup(payload: { id: string; lock: boolean }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/schedule/${payload.id}/lock`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lock: payload.lock }),
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
  async getAvailableClassroom(timeSlotId: string, templateId: string) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/schedule/available/classroom?timeSlotId=${timeSlotId}&templateId=${templateId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    const data = await response.json()
    return data
  }
}

export { ScheduleApiService }
