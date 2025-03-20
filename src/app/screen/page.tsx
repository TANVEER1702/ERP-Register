import CountryScreen from '@/components/country/page'
import React from 'react'
// async function getcountry() {
//   const res = await fetch("https://erp-backend-kunxite.vercel.app/api/country/list-all");

//   const data = await res.json();
//   return data.data;
// }
const page = async() => {
  // const country = await getcountry();

  return (
    <div>
      <CountryScreen/>
    </div>
  )
}

export default page
