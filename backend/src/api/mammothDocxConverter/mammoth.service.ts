export const formatUsername = (name: string | null): string[] | null => {
  if (!name) return null;

  let clean = name.trim();

  // Remove trailing semicolon
  if (clean.endsWith(";")) {
    clean = clean.slice(0, -1).trim();
  }

  const users = clean
    .replace(/;/g, ",") 
    .split(",")
    .map(u => u.trim())
    .filter(u => u.length > 0)
    .map(removeEmail); 

  return users;
};

export const removeEmail = (email: string) => {
  if (!email) return email;
  const idx = email.indexOf("@");
  return idx === -1 ? email : email.slice(0, idx);
};
