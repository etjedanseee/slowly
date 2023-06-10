import { useEffect, useState } from "react"
import { IUser } from "../types/Auth/auth"
import { coordsToDistance } from "../utils/calcDistance"

export const useDeliveryTime = (otherUser: IUser | null, user: IUser | null) => {
  //90 km - 1 min
  const [deliveredTime, setDeliveredTime] = useState(0)
  const [differenceDistance, setDifferenceDistance] = useState(0)

  useEffect(() => {
    if (otherUser && user && differenceDistance === 0) {
      const diffGeoDistance = coordsToDistance(user.geo.coord, otherUser.geo.coord)
      setDifferenceDistance(diffGeoDistance)
      setDeliveredTime(Math.round(diffGeoDistance / 90))
    }
  }, [otherUser, user, differenceDistance])

  return {
    deliveredTime,
    differenceDistance
  }
}