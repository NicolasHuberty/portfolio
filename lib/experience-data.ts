import { experience as _experiences } from "./portfolio-data"

export const experiences = _experiences
export type Experience = (typeof experiences)[number]
