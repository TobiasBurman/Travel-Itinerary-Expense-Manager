import type { Activity, Trip, DestinationInfo } from "../models.js";

export const getDestinationInfo = async (
  countryName: string,
): Promise<DestinationInfo> => {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`,
    );
    const data = await response.json();

    return {
      currency: Object.keys(data[0].currencies)[0] || "Unknown",
      flag: data[0].flag,
    };
  } catch (error) {
    throw new Error("Could not fetch country data");
  }
};

(async () => {
  console.log(await getDestinationInfo("sweden"));
})();
