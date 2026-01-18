import Cookies from 'js-cookie'

export const authToken = () => {    
  return (
    Cookies.get('authToken')
  )
}
