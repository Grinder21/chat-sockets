export const session = {
  getUser: () => sessionStorage.getItem("username"),
  setUser: (name: string) => sessionStorage.setItem("username", name),
  clear: () => sessionStorage.removeItem("username"),
};
