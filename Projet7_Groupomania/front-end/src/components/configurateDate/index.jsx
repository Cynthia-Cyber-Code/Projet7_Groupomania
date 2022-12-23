export const timestampParser = (num) => {
    let options = {
        hour: "2-digit",
        minute: "2-digit",
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
    };

    let date = new Date(num).toLocaleDateString("fr-FR", options);

    return date.toString();
};
