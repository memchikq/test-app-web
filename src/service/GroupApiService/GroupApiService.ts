class GroupApiService {
  async createGroup(name: string) {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/group/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
  }

  async getGroup() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/group`)
    const data = await response.json()
    return data
  }
}

export { GroupApiService }
