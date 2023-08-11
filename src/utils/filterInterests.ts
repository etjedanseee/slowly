import { interest } from "../types/Auth/auth";

export const filterInterests = (intr1: interest[], intr2: interest[]) => {
  const commonInterests: interest[] = [];
  const differentInterests: interest[] = [];

  const allInterests = intr1.concat(intr2)

  for (let i = 0; i < allInterests.length; i++) {
    const currentInterest = allInterests[i]
    const isCommonInterestsIncludes = commonInterests.find(intr => intr === currentInterest)

    if (allInterests.lastIndexOf(currentInterest) !== i && !isCommonInterestsIncludes) {
      commonInterests.push(currentInterest)
    } else if (intr1.includes(currentInterest) && !isCommonInterestsIncludes) {
      differentInterests.push(currentInterest)
    }
  }

  return [commonInterests, differentInterests]
}