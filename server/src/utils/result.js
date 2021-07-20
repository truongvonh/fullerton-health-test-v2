export const jsonSuccess = (data, meta = {}) => {
  return { success: true, ...data }
}

export const jsonError = (error) => {
  return { success: false, error }
}
