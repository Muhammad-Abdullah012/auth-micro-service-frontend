export const request = async (url: string, method: string, data?: any) => {
  console.log("---------------------------------");
  const headers = {
    "Content-Type": "application/json",
  };

  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${url}`, {
    method,
    headers,
    body: JSON.stringify(data),
  })
    .then((res) => {
      console.log("res => ", res);
      return res.json();
    })
    .catch((err) => console.error("Error attempting request => ", err));
};
