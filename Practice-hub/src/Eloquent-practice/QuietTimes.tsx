export function QuietTimes() {
    async function activityTable() {
        // let logFileList = await textFile("camera_logs.txt");
    }

    let date = new Date(1695709940692);
    let getDate = Date.now();
    let day = date.getDay();
    // activityTable(1).then((table) => console.log(activityGraph(table)));

    return (
        <>
            <p>the getdate: {getDate}</p>

            <p>the day: {day}</p>
        </>
    );
}
