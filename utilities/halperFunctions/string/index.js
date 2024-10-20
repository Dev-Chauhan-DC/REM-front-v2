export function truncateText(text, limit, position = "end", suffix = "...") {
    if (text.length <= limit) {
        return text
    }

    const suffixLength = suffix.length
    const availableLength = limit - suffixLength

    switch (position) {
        case "start":
            // Truncate from the start
            return suffix + text.slice(text.length - availableLength)

        case "center":
            // Truncate from the middle
            const half = Math.floor(availableLength / 2)
            return text.slice(0, half) + suffix + text.slice(text.length - half)

        case "end":
        default:
            // Truncate from the end (default behavior)
            return text.slice(0, availableLength) + suffix
    }
}
