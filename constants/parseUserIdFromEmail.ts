export const getIdFromEmail = (email: string) => {
  const id = email.split('_')[1].split('@')[0]

  return id
}
