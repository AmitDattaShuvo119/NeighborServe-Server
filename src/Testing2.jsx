import React, { useState, useEffect } from "react";

const Testing2 = () => {
  const [reverseGeocodedAddress, setReverseGeocodedAddress] = useState(null);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    // Reverse geocoding code
    const apiKey = "pk.abc469b9f78bca652e6cedf09705e250";
    const latitude = 23.77549736209817;
    const longitude = 90.4288627634394;

    const apiUrl = `https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const fullAddress = data.display_name;
        const dhakaIndex = fullAddress.indexOf("Dhaka");
        const slicedAddress =
          dhakaIndex !== -1
            ? fullAddress.slice(0, dhakaIndex + "Dhaka".length)
            : fullAddress;

        const address = slicedAddress;

        setReverseGeocodedAddress(address);
      })
      .catch((error) => {
        console.error("Error fetching address:", error);
      });

    // Click count logic
    const handleDocumentClick = () => {
      setClickCount((prevCount) => prevCount + 1);
    };

    // Attach the click event listener to the document
    document.addEventListener("click", handleDocumentClick);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div>
      <h2>Reverse Geocoded Address:</h2>
      <p>{reverseGeocodedAddress}</p>

      <h2>Click Count:</h2>
      <p>{clickCount}</p>
    </div>
  );
};

export default Testing2;
