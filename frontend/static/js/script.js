function addToTimeline(type) {
    const table = document.getElementById("timelineTable");

    const now = new Date();
    const date = now.toLocaleString();

    const row = `
        <tr>
            <td>${type}</td>
            <td>${date}</td>
        </tr>
    `;

    table.innerHTML = row + table.innerHTML; // latest on top
}

// FORM FUNCTIONS

function submitText() {
    addToTimeline("Form 1 Data (Text)");
}

function submitPDF() {
    addToTimeline("Form 2 Data (PDF)");
}

function submitAudio() {
    addToTimeline("Form 3 Data (Audio)");
}

function submitYoutube() {
    addToTimeline("Form 4 Data (YouTube)");
}