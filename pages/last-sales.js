import { useState, useEffect } from "react";

function LastSales(props) {
  const [data, setData] = useState(props.sales);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(
        "https://nextjs-course-1-c35f3-default-rtdb.firebaseio.com/Sales.json"
      );
      const data = await response.json();
      setData(Object.values(data));
      setLoading(false);
    };
    fetchData();
  }, []);
  console.log("sales", data);
  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item.username}>
              {item.username} - ${item.value}{" "}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
export default LastSales;

export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-course-1-c35f3-default-rtdb.firebaseio.com/Sales.json"
  );
  const data = await response.json();
  const transformData = Object.values(data);
  return {
    props: {
      sales: transformData,
    },
    revalidate: 10,
  };
}
