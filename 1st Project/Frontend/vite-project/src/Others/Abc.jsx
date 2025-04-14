import React, { useState, useEffect } from "react";

export default function Abc() {
  const [villages, setVillages] = useState([]);

  useEffect(() => {
    const fetchVillages = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/villages?stateName=Odisha&districtName=Cuttack&blockName=Athagarh&gpName=Bhogara`
        );
        if (!response.ok) {
          alert("Failed to fetch Villages");
        }
        let data = await response.json();

        console.log("Village Data: ", data.villages);
        console.log("Village Data: ", typeof data);

        if (data && data.villages && Array.isArray(data.villages)) {
          setVillages(data.villages);
        } else {
          setVillages([]);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchVillages();
  }, []);

  console.log(villages);

  return (
    <>
      <div className="col-span-12 md:col-span-3 mt-5 sm:mt-0">
        <label htmlFor="village" className="font-medium text-md text-gray-700">
          Village <sup className="text-red-500">*</sup>
        </label>
        <select
          name="village"
          id="village"
          className="w-full mt-2 p-3 border-b focus:outline-none focus:border-b-2 focus:border-blue-500"
          required
        >
          <option value="" disabled>
            --- Select ---
          </option>
          {villages.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <h1>HIII</h1>
    </>
  );
}

// function Abc() {
//   const [villages, setVillages] = useState([]);

//   useEffect(() => {
//     const fetchVillages = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:5000/villages?stateName=Odisha&districtName=Cuttack&blockName=Athagarh&gpName=Bhogara`
//         );
//         if (!response.ok) {
//           alert("Failed to fetch Villages");
//         }
//         let data = await response.json();

//         console.log("Village Data: ", data);
//         console.log("Village Data: ", typeof data);

//         // Make sure you're extracting only the villages array
//         if (data && data.villages && Array.isArray(data.villages)) {
//           setVillages(data.villages);  // Set only the array of villages
//         } else {
//           setVillages([]); // Handle case where villages array is empty or not present
//         }
//       } catch (err) {
//         console.error(err.message);
//       }
//     };
//     fetchVillages();
//   }, []);

//   console.log(villages);

//   return (
//     <>
//       <pre>
//         {villages.map((option, index) => (
//           <h1 key={index}>{option}</h1> // Render each village inside <h1>
//         ))}
//       </pre>
//     </>
//   );
// }
