import React from 'react';
import { useSelector } from "react-redux";

const ReleaseDateDisplay = ({ releaseDate }) => {
  const lang = useSelector((state) => state.language.lang);
  const locale = lang === "bg" ? "bg-BG" : "en-US";

  if (!releaseDate) {
    return <span style={{color:"grey"}}>N/A</span>; // If releaseDate is null, display "N/A"
  }

  const date = new Date(releaseDate);
  const formattedDate = date.toLocaleDateString(locale, {
    month: 'long',
    year: 'numeric'
  });

  return <>{formattedDate}</>;
};

export default ReleaseDateDisplay;