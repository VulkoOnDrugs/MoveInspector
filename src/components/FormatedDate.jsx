import React from 'react'

function FormatedDate({dataString}) {
    const formatDate = (date) =>{
        const months = ['January','February','March','April','May','June','July','August','September','October','November','December']

        const d = new Date(date);
        const day = d.getDate();
        const month = months[d.getMonth()];
        const year = d.getFullYear();

        return `${day} ${month} ${year}`
    }
  return (
    <span>{formatDate(dataString)}</span>
  )
}

export default FormatedDate