export const fetchData = async () => {
    try {
      const response = await fetch("https://reqres.in/api/users?delay=3");
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  };
  