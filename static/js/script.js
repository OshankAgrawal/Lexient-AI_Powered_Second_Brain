const API_URL = "http://127.0.0.1:8000";

function switchTab(tabName, element) {
    document.querySelectorAll(".tab").forEach(btn => btn.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));

    if (element) element.classList.add("active");

    const tab = document.getElementById(tabName);
    if (tab) tab.classList.add("active");
}

// ================= TEXT =================
async function submitText() {
    const text = document.getElementById("textInput").value;

    if (!text) {
        alert("Enter text");
        return;
    }

    const res = await fetch(`${API_URL}/summarize-text`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
    });

    const data = await res.json();
    console.log("Text:", data);

    loadTimeline();
}

// ================= PDF =================
async function submitPDF() {
    const file = document.getElementById("pdfInput").files[0];

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API_URL}/summarize-pdf`, {
        method: "POST",
        body: formData
    });

    const data = await res.json();
    console.log("PDF:", data);

    loadTimeline();
}

// ================= AUDIO =================
async function submitAudio() {
    const file = document.getElementById("audioInput").files[0];

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API_URL}/summarize-audio`, {
        method: "POST",
        body: formData
    });

    const data = await res.json();
    console.log("Audio:", data);

    loadTimeline();
}

// ================= YOUTUBE =================
async function submitYoutube() {
    const url = document.getElementById("youtubeInput").value;

    const res = await fetch(`${API_URL}/summarize-youtube`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
    });

    const data = await res.json();
    console.log("YouTube:", data);

    loadTimeline();
}

// ================= TIMELINE =================
async function loadTimeline() {
    try {
        const res = await fetch(`${API_URL}/get-notes`);
        const data = await res.json();

        console.log("Timeline:", data);

        const timeline = document.getElementById("timeline");
        timeline.innerHTML = "";

        // 🔥 FIX HERE
        const notes = data.notes;

        if (!Array.isArray(notes) || notes.length === 0) {
            timeline.innerHTML = "<p>No data yet</p>";
            return;
        }

        notes.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).forEach(note => {
            const div = document.createElement("div");
            div.className = "timeline-item";
            
            div.innerHTML = `
                <p><strong>${note.type || "Unknown"}</strong></p>
                <p>${note.summary}</p>
                <small>${new Date(note.created_at).toLocaleString()}</small>
            `;

            timeline.appendChild(div);
        });

    } catch (err) {
        console.error(err);
        alert("Timeline load failed");
    }
}


// ================= Search Notes ======================
async function searchNotes() {
    const query = document.getElementById("searchInput").value;

    if (!query) {
        loadTimeline();
        return;
    }

    const res = await fetch(`${API_URL}/search?query=${query}`);
    const data = await res.json();

    const timeline = document.getElementById("timeline");
    timeline.innerHTML = `
        <p>No results found for "<b>${query}</b>"</p>
    `;

    const notes = data.notes || [];

    if (!notes.length) {
        timeline.innerHTML = "<p>No results found</p>";
        return;
    }

    notes
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .forEach(note => {

        const div = document.createElement("div");
        div.className = "timeline-item";

        div.innerHTML = `
            <p><strong>${note.type}</strong></p>
            <p>${note.summary}</p>
            <small>${new Date(note.created_at).toLocaleString()}</small>
        `;

        timeline.appendChild(div);
    });
}