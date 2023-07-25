export const objectIdRegex = /^[0-9a-fA-F]{24}$|^[0-9a-fA-F]{12}$/
export const UUIDRegex =
  /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4[a-fA-F0-9]{3}-[8|9|aA|bB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}$/

export const dateFormatRegex = /^\d{4}-(0[1-9]|1[0-2])-\d{2}$/ // 2000-12-31 > valid | 2000-13-31 > invalid | 2000-00-31 > invalid

export const onlyNumbersRegex = /^[1-9]\d*$/

export const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/
