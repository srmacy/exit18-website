(function () {
  const SHOP_ADDRESS = "27 Morse Drive, Fairfax, VT 05454";
  const MINIMUM_CHARGE = 75;
  const RATE_PER_HOUR = 85;

  const tripConfig = {
    "pickup-return": {
      label: "Pickup + return",
      multiplier: 4,
    },
    "pickup-only": {
      label: "Pickup only",
      multiplier: 2,
    },
    "delivery-only": {
      label: "Delivery only",
      multiplier: 2,
    },
  };

  const form = document.querySelector("#quote-form");
  const addressInput = document.querySelector("#customer-address");
  const tripButtons = Array.from(document.querySelectorAll(".trip-button"));
  const quotePrice = document.querySelector("#quote-price");
  const driveTime = document.querySelector("#drive-time");
  const driveDistance = document.querySelector("#drive-distance");
  const statusLine = document.querySelector("#status-line");

  let selectedTrip = "pickup-return";

  function money(value) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  }

  function minutesToText(minutes) {
    if (minutes < 60) return `${Math.round(minutes)} min one-way`;

    const hours = Math.floor(minutes / 60);
    const remaining = Math.round(minutes % 60);
    return remaining ? `${hours} hr ${remaining} min one-way` : `${hours} hr one-way`;
  }

  function calculateQuote(oneWayMinutes) {
    const trip = tripConfig[selectedTrip];
    const billableHours = (oneWayMinutes * trip.multiplier) / 60;
    const calculated = billableHours * RATE_PER_HOUR;
    return Math.max(MINIMUM_CHARGE, calculated);
  }

  function setLoading(isLoading) {
    const button = form.querySelector(".primary-button");
    button.disabled = isLoading;
    button.textContent = isLoading ? "Checking..." : "Get estimate";
  }

  function setStatus(message, isError) {
    statusLine.textContent = message;
    statusLine.classList.toggle("is-error", Boolean(isError));
  }

  function showResult(route) {
    const finalQuote = calculateQuote(route.oneWayMinutes);
    quotePrice.textContent = money(finalQuote);
    driveTime.textContent = `Drive time: ${minutesToText(route.oneWayMinutes)}`;
    driveDistance.textContent = `Distance: ${route.oneWayMiles.toFixed(1)} mi one-way`;
    if (route.preview) {
      setStatus("Preview mode: Sam will connect this to Google Routes API on the live site.", false);
    } else {
      setStatus("Estimate is for pickup and delivery travel only. Repair costs are separate.", false);
    }
  }

  async function getRouteFromServer(address) {
    const response = await fetch(`/api/pickup-delivery-estimate?address=${encodeURIComponent(address)}`);

    if (!response.ok) {
      throw new Error("We could not get a route estimate right now. Please call the shop for help.");
    }

    return response.json();
  }

  function getPreviewRoute(address) {
    const seed = Math.max(18, Math.min(54, address.length + 12));
    return {
      oneWayMinutes: seed,
      oneWayMiles: seed * 0.62,
      preview: true,
    };
  }

  tripButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedTrip = button.dataset.trip;
      tripButtons.forEach((tripButton) => {
        const isSelected = tripButton === button;
        tripButton.classList.toggle("is-selected", isSelected);
        tripButton.setAttribute("aria-pressed", String(isSelected));
      });

      if (addressInput.value.trim()) {
        form.requestSubmit();
      }
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const address = addressInput.value.trim();
    if (!address) {
      setStatus("Enter your pickup address first.", true);
      return;
    }

    setLoading(true);
    setStatus("Checking Google drive time from Exit 18 Equipment...", false);

    try {
      let route;
      if (window.EXIT18_PICKUP_QUOTE_PREVIEW === true) {
        route = getPreviewRoute(address);
      } else {
        route = await getRouteFromServer(address);
      }
      showResult(route);
    } catch (error) {
      quotePrice.textContent = "$--";
      driveTime.textContent = "Drive time: --";
      driveDistance.textContent = "Distance: --";
      setStatus(error.message, true);
    } finally {
      setLoading(false);
    }
  });

  window.EXIT18_PICKUP_QUOTE_PREVIEW = window.EXIT18_PICKUP_QUOTE_PREVIEW ?? true;
})();
