export const GET_USER = "GET_USER"
export const LOG_OUT = "LOG_OUT"

export const getUser = (user) => {
  return {
      type: GET_USER,
      payload: user
  };
}

export const logout = (user) => {
  return {
      type: LOG_OUT,
      payload: null
  };
}