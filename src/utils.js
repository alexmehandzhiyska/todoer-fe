export const getDate = (day) => {
    let date;

    if (day === 'today') {
        date = new Date().toJSON().slice(0, 10);
    } else if (day === 'tomorrow') {
        const today = new Date();
        date = new Date(today);
        date.setDate(date.getDate() + 1);
        date = date.toJSON().slice(0, 10);
    } 

    return date;
};