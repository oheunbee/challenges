import React from "react"
import { useMediaQuery } from "react-responsive"

// const Mobile = ({children}) => {
//   const isMobile = useMediaQuery({maxWidth: 720});

//   return <React.Fragment>{isMobile && children}</React.Fragment>
// }
const Tablet = ({children}) => {
  const isTablet = useMediaQuery({maxWidth:768});
  return <React.Fragment>{isTablet && children}</React.Fragment>
}

const PC = ({children}) => {
  const isPc = useMediaQuery({minWidth: 769});
  return <React.Fragment>{isPc && children}</React.Fragment>
}

export  {PC,Tablet};