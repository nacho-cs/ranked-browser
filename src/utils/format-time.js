export function formatTime(timestamp) {
    return timestamp.toISOString().slice(14, 23);
}
