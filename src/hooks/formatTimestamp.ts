const formatTimestamp = (timestamp: string, asEpoch?: boolean) => {
  if (asEpoch) {
    // Split the original Slack timestamp to ignore the decimal
    const conv = Number.parseInt(timestamp.split('.')[0])
    // Multiply by 1000 to use epoch to form date object
    const date = new Date(conv * 1000)

    return date
  }

  const date = new Date(timestamp)

  return date
}

export { formatTimestamp }
