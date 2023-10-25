import { interest } from "../types/Auth/auth";

export const filterInterests = (intr1: interest[], intr2: interest[]) => {
  const commonInterests: interest[] = [];
  const differentInterests: interest[] = [];
  const uniqueSet = new Set<interest>();

  for (const interest of intr1) {
    if (intr2.includes(interest) && !uniqueSet.has(interest)) {
      commonInterests.push(interest);
      uniqueSet.add(interest);
    } else {
      differentInterests.push(interest);
    }
  }

  for (const interest of intr2) {
    if (!uniqueSet.has(interest)) {
      differentInterests.push(interest);
    }
  }

  return [commonInterests, differentInterests]
}