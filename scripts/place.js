document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  const lastModifiedSpan = document.getElementById("lastModified");
  const windChillSpan = document.getElementById("windChill");

  yearSpan.textContent = new Date().getFullYear();
  lastModifiedSpan.textContent = document.lastModified;

  const temperature = parseFloat(document.getElementById("temperature").textContent);
  const windSpeed = parseFloat(document.getElementById("windSpeed").textContent);

  function calculateWindChill(tempC, speedKmh) {
    return (
      13.12 +
      0.6215 * tempC -
      11.37 * Math.pow(speedKmh, 0.16) +
      0.3965 * tempC * Math.pow(speedKmh, 0.16)
    ).toFixed(1);
  }

  if (temperature <= 10 && windSpeed > 4.8) {
    windChillSpan.textContent = `${calculateWindChill(temperature, windSpeed)} °C`;
  } else {
    windChillSpan.textContent = "N/A";
  }
});
