// const requireEnv = (key: string) => {
//   const val = process.env[key]

//   if (!val) {
//     throw new Error(`Missing required env var: ${key}`)
//   }

//   return val
// }

export const Env = {
//TODO
} as const

export type Env = typeof Env
