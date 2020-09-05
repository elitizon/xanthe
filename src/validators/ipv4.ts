
/**
 * @param ip to validate. (No spaces or tab or is allowed at the start or at the end of the string)
 * @returns true of false if the IP is valid or not
 */
function isIPv4(ip: string) : boolean {
  // An ip V4 address has the form of X.X.X.X
  // Where X is a number between 0 to 255
  const regEx = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  const result = regEx.test(ip)
  return result
}


export {
  isIPv4
}