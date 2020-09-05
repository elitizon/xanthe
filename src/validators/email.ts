
/**
 * @param email to validate. No spaces or tab or is allowed at the start or at the end of the string
 * @returns true of false if the email is valid or not
 */
function isEmail(email: string) : boolean {
  // An email address is a word followed by an unique @ followed by a word then a . followed by a word with a length from 2 to 3 characters
  const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const result = regEx.test(email)
  return result
}


export {
  isEmail
}