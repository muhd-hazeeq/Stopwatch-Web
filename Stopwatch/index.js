const firstBtn = document.getElementById("lap");
const secondBtn = document.getElementById("start");
const millisecondsDisplay = document.getElementById("milliseconds");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const millisecondsLapDisplay = document.getElementById("milliseconds-lap");
const minutesLapDisplay = document.getElementById("minutes-lap");
const secondsLapDisplay = document.getElementById("seconds-lap");
const time = document.getElementById("time");
const lapTimeDisplay = document.getElementById("lap-time");
const table = document.querySelector("table");
const allBtn = document.querySelector(".btn");
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let minutesOverall = 0;
let secondsOverall = 0;
let millisecondsOverall = 0;
let minutesLap = 0;
let secondsLap = 0;
let millisecondsLap = 0;
let interval = null;
let count = 0;
let lapTime = 0;
let overallTime = 0;

firstBtn.addEventListener("click", () => {
  if (firstBtn.getAttribute("id") === "lap") {
    count++;
    minutesLap = secondsLap = millisecondsLap = 0;
    if (interval != null) {
      clearInterval(interval);
    }
    interval = setInterval(displayTime, 10);
    let mo = minutesDisplay.textContent;
    let so = secondsDisplay.textContent;
    let mso = millisecondsDisplay.textContent;
    let ml = minutesLapDisplay.textContent;
    let sl = secondsLapDisplay.textContent;
    let msl = millisecondsLapDisplay.textContent;
    overallTime = mo + " : " + so + " . " + mso;
    time.style.marginTop = "10vh";
    lapTimeDisplay.style.display = "flex";
    lapTime =
      count === 1
        ? mo + " : " + so + " . " + mso
        : ml + " : " + sl + " . " + msl;
    table.style.display = "flex";
    table.style.justifyContent = "center";
    allBtn.style.marginTop = 0;
    let row = table.insertRow(1);
    row.setAttribute("class", "row");
    let c1 = row.insertCell(0);
    let c2 = row.insertCell(1);
    let c3 = row.insertCell(2);
    if (count < 10) c1.innerText = "0" + count;
    else c1.innerText = count;
    c2.innerText = lapTime;
    c3.innerText = overallTime;
    c1.style.color = "#686565";
    c2.style.color = "#a39d9d";
    c3.style.color = "white";
  } else if (firstBtn.getAttribute("id") === "reset") {
    lapTimeDisplay.style.display = "none";
    time.style.marginTop = "30vh";
    millisecondsDisplay.textContent = "00";
    minutesDisplay.textContent = "00";
    secondsDisplay.textContent = "00";
    minutes = seconds = milliseconds = 0;
    firstBtn.style.color = "#ffffffa2";
    firstBtn.style.backgroundColor = "#0d0d0d";
    firstBtn.style.cursor = "auto";
    firstBtn.textContent = "Lap";
    firstBtn.setAttribute("id", "lap");
    secondBtn.textContent = "Start";
    secondBtn.style.backgroundColor = "#9900ff";
    secondBtn.setAttribute("id", "start");
    table.style.display = "none";
    allBtn.style.marginTop = "53.6vh";
    const rows = document.getElementsByClassName("row");
    while (rows.length > 0) {
      rows[0].parentNode.removeChild(rows[0]);
    }
    minutesOverall = secondsOverall = millisecondsOverall = 0;
    count = 0;
  }
});

secondBtn.addEventListener("click", () => {
  if (secondBtn.getAttribute("id") === "start") {
    if (interval != null) {
      clearInterval(interval);
    }
    interval = setInterval(displayTime, 10);
    firstBtn.style.color = "white";
    firstBtn.style.backgroundColor = "#1a1a1a";
    firstBtn.style.cursor = "pointer";
    secondBtn.textContent = "Stop";
    secondBtn.style.backgroundColor = "red";
    secondBtn.style.color = "white";
    secondBtn.style.cursor = "pointer";
    secondBtn.setAttribute("id", "stop");
  } else if (secondBtn.getAttribute("id") === "stop") {
    clearInterval(interval);
    firstBtn.textContent = "Reset";
    firstBtn.setAttribute("id", "reset");
    secondBtn.textContent = "Resume";
    secondBtn.style.backgroundColor = "#9900ff";
    secondBtn.setAttribute("id", "resume");
  } else if (secondBtn.getAttribute("id") === "resume") {
    if (interval != null) {
      clearInterval(interval);
    }
    interval = setInterval(displayTime, 10);
    firstBtn.textContent = "Lap";
    firstBtn.setAttribute("id", "lap");
    secondBtn.textContent = "Stop";
    secondBtn.style.backgroundColor = "red";
    secondBtn.setAttribute("id", "stop");
  }
});

function displayTime() {
  milliseconds += 10;
  if (milliseconds === 1000) {
    milliseconds = 0;
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
  }
  millisecondsLap += 10;
  if (millisecondsLap === 1000) {
    millisecondsLap = 0;
    secondsLap++;
    if (secondsLap === 60) {
      secondsLap = 0;
      minutesLap++;
    }
  }
  let ms = milliseconds / 10;
  ms = ms < 10 ? "0" + ms : ms;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let msl = millisecondsLap / 10;
  msl = msl < 10 ? "0" + msl : msl;
  let ml = minutesLap < 10 ? "0" + minutesLap : minutesLap;
  let sl = secondsLap < 10 ? "0" + secondsLap : secondsLap;
  millisecondsDisplay.textContent = ms;
  minutesDisplay.textContent = m;
  secondsDisplay.textContent = s;
  millisecondsLapDisplay.textContent = msl;
  minutesLapDisplay.textContent = ml;
  secondsLapDisplay.textContent = sl;
}
