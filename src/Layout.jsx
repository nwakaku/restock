/* eslint-disable react/prop-types */
import Header from "./components/Header"

const Layout = ({children}) => {
  return (
      <div>
          <Header />
          <div>
              {children}
          </div>
    </div>
  )
}

export default Layout