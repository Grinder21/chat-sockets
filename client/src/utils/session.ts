export const session = {
  getUser: () => sessionStorage.getItem("username"), // try catch
  setUser: (name: string) => sessionStorage.setItem("username", name),
  clear: () => sessionStorage.removeItem("username"), // try catch
};
