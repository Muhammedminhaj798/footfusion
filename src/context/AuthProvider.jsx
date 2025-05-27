import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('loginUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [])
  return (
    <div>
      <AuthContext.Provider value={{ user }}>
        {children}
      </AuthContext.Provider>
    </div>
  )
}

export default AuthProvider
