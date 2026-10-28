
const form = document.getElementById("gradeForm");
const message = document.getElementById("message");
const results = document.getElementById("results");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    message.textContent = "";
    results.innerHTML = "";

    // A. INPUT VALIDATION
    const name = document.getElementById("studentName").value.trim();
    const math = document.getElementById("math").value;
    const english = document.getElementById("english").value;
    const science = document.getElementById("science").value;
    const attendance = document.getElementById("attendance").value;
    const activity = document.getElementById("activity").value;

    if (name === "") {
        message.textContent = "Please enter the student's name.";
        return;
    }

    if (math === "" || english === "" || science === "" || attendance === "") {
        message.textContent = "Please fill in all marks and attendance.";
        return;
    }

    const m = Number(math);
    const e = Number(english);
    const s = Number(science);
    const att = Number(attendance);

    if (
        !Number.isFinite(m) || !Number.isFinite(e) ||
        !Number.isFinite(s) || !Number.isFinite(att) ||
        m < 0 || m > 100 ||
        e < 0 || e > 100 ||
        s < 0 || s > 100 ||
        att < 0 || att > 100
    ) {
        message.textContent = "Marks and attendance must be between 0 and 100.";
        return;
    }

    // B. TOTAL AND PERCENTAGE
    const total = m + e + s;
    const percentage = (total / 300) * 100;

    // C. GRADE USING IF / ELSE IF / ELSE
    let grade;

    if (percentage >= 90) {
        grade = "A+";
    } else if (percentage >= 80) {
        grade = "A";
    } else if (percentage >= 70) {
        grade = "B";
    } else if (percentage >= 60) {
        grade = "C";
    } else if (percentage >= 50) {
        grade = "D";
    } else {
        grade = "F";
    }

    // D. PASS OR FAIL USING LOGICAL AND (&&)
    let status;

    if (m >= 40 && e >= 40 && s >= 40 && percentage >= 50) {
        status = "PASS";
    } else {
        status = "FAIL";
    }

    // E. SCHOLARSHIP USING NESTED IF / ELSE
    let scholarship;

    if (status === "PASS") {
        if (percentage >= 90 && att >= 90) {
            scholarship = "Full Scholarship (100%)";
        } else if (percentage >= 80 && att >= 85) {
            scholarship = "50% Scholarship";
        } else if (percentage >= 70 && att >= 75) {
            scholarship = "25% Scholarship";
        } else {
            scholarship = "Not eligible";
        }
    } else {
        scholarship = "Not eligible (failed)";
    }

    // F. PERSONALIZED REMARK USING SWITCH
    let remark;

    switch (grade) {
        case "A+":
            remark = "Outstanding! Keep up your excellent performance.";
            break;
        case "A":
            remark = "Excellent work! Continue aiming high.";
            break;
        case "B":
            remark = "Very good! Keep improving your skills.";
            break;
        case "C":
            remark = "Good effort! More practice can improve your grade.";
            break;
        case "D":
            remark = "You passed the grade range. Work harder to improve.";
            break;
        case "F":
            remark = "You need more practice and support to improve.";
            break;
        default:
            remark = "Keep working hard.";
    }

    // G. ACTIVITY MESSAGE USING TERNARY OPERATOR
    const activityMessage = activity !== "none"
        ? "Great! Your participation in " +
          activity.replace("-", " ") +
          " is a positive achievement."
        : "No extra-curricular activity selected.";

    // DISPLAY RESULTS
    results.innerHTML = `
        <div class="result-card">
            <h2>Student Results</h2>
            <p><strong>Student:</strong> ${escapeHTML(name)}</p>
            <p><strong>Mathematics:</strong> ${m}</p>
            <p><strong>English:</strong> ${e}</p>
            <p><strong>Science:</strong> ${s}</p>
            <p><strong>Total:</strong> ${total} / 300</p>
            <p><strong>Percentage:</strong> ${percentage.toFixed(2)}%</p>
            <p><strong>Grade:</strong> ${grade}</p>
            <p><strong>Result:</strong> ${status}</p>
            <p><strong>Attendance:</strong> ${att}%</p>
            <p><strong>Scholarship:</strong> ${scholarship}</p>
            <p><strong>Remark:</strong> ${remark}</p>
            <p><strong>Activity:</strong> ${activityMessage}</p>
        </div>
    `;
});

// Safely display the student's name
function escapeHTML(value) {
    return value.replace(/[&<>"']/g, function (character) {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];
    });
}

// CLEAR THE FORM AND RESULTS
form.addEventListener("reset", function () {
    message.textContent = "";
    results.innerHTML = "";
});
