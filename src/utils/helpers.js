export const getTodayString = () => {
  const current = new Date(Date.now())
  return `${current.getDate()}${current.getMonth() + 1}${current.getFullYear()}`
}