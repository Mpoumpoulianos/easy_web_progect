// Selects the clock element from HTML
const clockElement = document.getElementById("clock");

// Function to update the time every second
function updateClock() {
    // Gets the current time
    const now = new Date();

    // Extracts hours, minutes, and seconds
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Adds a "0" in front of single-digit numbers (e.g., 09 instead of 9)
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // Formats time as 00:00:00
    const timeString = `${hours}:${minutes}:${seconds}`;

    // Updates the clock's display in the HTML
    clockElement.innerText = timeString;
}

// Calls updateClock() every 1000 milliseconds (1 second)
setInterval(updateClock, 1000);

// Calls updateClock() once at the start, so the clock doesn’t start blank
updateClock();
