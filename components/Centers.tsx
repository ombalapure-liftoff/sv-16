import { useEffect } from "react";

const Centers = () => {
  const getCenters = async () => {
    const response = await fetch("/api/centers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response);
  };

  useEffect(() => {
    getCenters();
  }, []);

  return (
    <>
      <div className="text-center text-3xl font-bold">Centers</div>\
    </>
  );
};

export default Centers;
