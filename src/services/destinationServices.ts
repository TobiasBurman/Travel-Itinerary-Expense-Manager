import type { Activity, Trip } from "../models.js";

export const getDestinationInfo = async (countryName: string) => {
  const countryName2 = "sweden";
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countryName2}`,
    );
    const data = await response.json();
    console.log(data[0].flags.png);
    console.log(data[0]);

    return {
      currency: Object.keys(data[0].currencies)[0],
      flag: data[0].flag,
    };
  } catch (error) {
    throw new Error("Could not fetch country data");
  }
};

getDestinationInfo("sweden");
