export const isProduction = () => process.env.NODE_ENV === 'production'

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
