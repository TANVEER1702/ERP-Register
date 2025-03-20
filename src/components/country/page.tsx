"use client";
import { useState, useEffect } from "react";
import { Button } from "../buttons";

interface Country {
  country_id: string;
  country_name: string;
}

const CountryScreen = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [newCountry, setNewCountry] = useState("");
  const [message, setMessage] = useState("");

  const fetchCountries = async () => {
    try {
      const res = await fetch(
        "https://erp-backend-kunxite.vercel.app/api/country/list-all"
      );
      const result = await res.json();

      console.log("Fetched API Response:", result);

      if (result.success && Array.isArray(result.data)) {
        setCountries(result.data);
      } else {
        console.warn("Unexpected API response format:", result);
        setCountries([]);
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const addCountry = async () => {
    if (!newCountry.trim()) {
      setMessage("Please enter a country name");
      return;
    }
    

    try {
      const res = await fetch(
        "https://erp-backend-kunxite.vercel.app/api/country/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ country_name: newCountry.trim() }),
        }
      );

      const result = await res.json();
      if (res.ok) {
        setMessage("Country added successfully!");
        setNewCountry("");
        fetchCountries();
      } else {
        setMessage(result.message || "Failed to add country");
      }
    } catch (error) {
      console.error("Error adding country:", error);
      setMessage("Something went wrong");
    }
  };

  const deleteCountry = async (countryName: string) => {
    try {
      const res = await fetch(
        `https://erp-backend-kunxite.vercel.app/api/country/delete/${countryName}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setMessage("Country deleted successfully!");
        fetchCountries();
      } else {
        setMessage("Failed to delete country");
      }
    } catch (error) {
      console.error("Error deleting country:", error);
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Manage Countries</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter country name"
          className="border p-2 flex-1 rounded"
          value={newCountry}
          onChange={(e) => setNewCountry(e.target.value)}
        />
        <Button
          label="Add"
            variant="primary"
            size="medium"
            onClick={addCountry}
        />
      </div>

      {message && (
        <p
          className={`text-sm ${
            message.includes("successful") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}

      <ul className="border p-4 rounded">
        {countries.length > 0 ? (
          countries.map((country) => (
            <li
              key={country.country_id}
              className="flex justify-between items-center p-2 border-b"
            >
              <span>{country.country_name}</span>

              <Button
              label="Delete"
              variant="danger"
                size="small"
                onClick={() => deleteCountry(country.country_name)}
              />            
            </li>
          ))
        ) : (
          <p className="text-gray-500">No countries found.</p>
        )}
      </ul>
    </div>
  );
};

export default CountryScreen;
