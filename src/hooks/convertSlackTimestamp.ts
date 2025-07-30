const convertSlackTimestamp = (timestamp: string) => {
  // Split the original Slack timestamp to ignore the decimal
  const conv = Number.parseInt(timestamp.split('.')[0])
  // Multiply by 1000 to use epoch to form date object
  const date = new Date(conv * 1000)

  return date
}

export { convertSlackTimestamp }
