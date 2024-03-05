
export type Location_type = {
  id: number
  locationname: string
  description: string
  pictureUrl: string
  latitude: number
  longitude: number
}

export type User_type = {
  username: string
  password: string
  totalPoints: number
}

export type Attended_type = {
  attendedId: number
  username: string
  locationId: number
}
