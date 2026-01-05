import { createContext, useContext, useState } from 'react'

const ExpandContext = createContext()

export function ExpandProvider({ children }) {
  const [expandAll, setExpandAll] = useState(false)

  return (
    <ExpandContext.Provider value={{ expandAll, setExpandAll }}>
      {children}
    </ExpandContext.Provider>
  )
}

export function useExpand() {
  return useContext(ExpandContext)
}
