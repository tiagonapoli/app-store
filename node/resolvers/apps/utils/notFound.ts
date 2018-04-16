export const notFound = (fallback: any) => error => {
  if (error.response && error.response.status === 404) {
    return fallback
  }
  throw error
}
