"use client"
import React, { createContext } from "react";

const UrlContext = createContext({
  

recordCounter: "", 
updateRecordCount: () => {}, // Placeholder function to prevent errors if not used
pageCount:"",
updatePageCount: () => {}, // Placeholder function to prevent errors if not used
  });
export default UrlContext


