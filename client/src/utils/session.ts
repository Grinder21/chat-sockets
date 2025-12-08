export const session = {
  getUser: () => {
    try {
      return sessionStorage.getItem("username");
    } catch {
      return null;
    }
  },

  setUser: (name: string) => {
    try {
      sessionStorage.setItem("username", name);
    } catch {
      return;
    }
  },

  clear: () => {
    try {
      sessionStorage.removeItem("username");
    } catch {
      return;
    }
  },
};
