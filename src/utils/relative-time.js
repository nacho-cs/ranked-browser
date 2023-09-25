export function relativeTime(date, relativeDate) {
    const rtf = new Intl.RelativeTimeFormat("en-US", {
        numeric: "auto",
        style: "narrow",
    });
    const measures = [
        { label: "year", amount: 315576e5 },
        { label: "month", amount: 2592e6 },
        { label: "week", amount: 3456e5 },
        { label: "day", amount: 864e5 },
        { label: "hour", amount: 36e5 },
        { label: "minute", amount: 6e4 },
        { label: "second", amount: 1e3 },
    ];
    const diff = relativeDate ? relativeDate - date : Date.now() - date;
    const measure = measures.find(measure => measure.amount <= Math.abs(diff));
    return measure
        ? rtf.format(-Math.floor((diff / measure.amount)), measure.label)
        : rtf.format(0, "second");
}
