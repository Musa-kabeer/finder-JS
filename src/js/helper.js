export const timeout = (s) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(
        new Error("There is connectvity issue. Please do check your network!")
      );
    }, s * 1000);
  });
};
