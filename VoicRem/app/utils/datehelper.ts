export  const formatDateTime = (date: Date = new Date()): string => {
    return date
        .toLocaleString('en-US',  {
            month: '2-digit',
            day: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        })
    .replace(',', ' ');
};