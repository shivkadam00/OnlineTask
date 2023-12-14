import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [active, setActive] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const CommenFiled = ({ name, description, direction }) => {
    return (
      <div className={`flex w-full gap-2 flex-${direction}`}>
        <p className="font-bold">{name}</p>
        <p className="text-gray-700">{description}</p>
      </div>
    );
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const responce = await axios.get(
          `https://api.thecatapi.com/v1/breeds?limit=5&page=${currentPage}`,
          {
            headers: {
              "x-api-key":
                "live_HPvtNnVPu1A9xKut0K5qyf3W1PDYmtd0bF5cO9E4b91gexTeAIiryvgkuMhgSiqP",
            },
          }
        );
        setData(responce.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [currentPage]);

  const next = () => {
    setActive((preactive) => (preactive + 1) % data.length);
  };

  const Previous = () => {
    setActive((preactive) => (preactive - 1 + data.length) % data.length);
  };

  const openWiki = () => {
    const url = data[active]?.wikipedia_url;
    if (url) {
      window.open(url, "_black");
    }
  };

  return (
    <div className="flex justify-center align-center md:min-h-screen bg-gray-200">
      <div className="flex flex-col md:flex-row max-w-6xl rounded-md shadow-md p-8 w-full bg-white">
        <table className=" w-full table-auto md:w-1/3 md:mr-4">
          <thead>
            <tr className="bg-[#4472c4] text-white">
              <th className="border py-4 px-4">Breed Name</th>
              <th className="border py-4 px-4">Breed Origin</th>
              <th className="border py-4 px-4">view</th>
            </tr>
          </thead>
          <tbody>
            {data.map((breed, index) => (
              <tr
                key={index}
                className={
                  index === active
                    ? "bg-yellow-200"
                    : index % 2
                    ? "bg-[#cdd4ea]"
                    : "bg-[#e8ebf5]"
                }
              >
                <td
                  className="border py-4 px-4"
                  onClick={() => setActive(index)}
                >
                  {breed.name}
                </td>
                <td
                  className="border py-4 px-4"
                  onClick={() => setActive(index)}
                >
                  {breed.origin}
                </td>
                <td className="border py-4 px-4">
                  <button onClick={() => setActive(index)}>view</button>
                </td>
              </tr>
            ))}
          </tbody>
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              className="border rounded bg-[#4472c4] p-3"
            >
              pre
            </button>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="border rounded bg-[#4472c4] p-3"
            >
              next
            </button>
          </div>
        </table>
        <div className="flex flex-col md:w-2/3">
          <div className="max-w-md mx-auto mb-4 ">
            <div className="p-4">
              <img src={data[active]?.image?.url} />
            </div>
            <div className="flex justify-evenly mt-4">
              <button
                className="border rounded bg-[#4472c4] p-3"
                onClick={Previous}
              >
                Previous
              </button>
              <button
                className="border rounded bg-[#4472c4] p-3"
                onClick={next}
              >
                Next
              </button>
            </div>
          </div>
          <div className=" flex items-end flex-col p-5 bg-gray-100">
            {/* <div className="flex w-full gap-2 ">
              <p className="font-bold">Name :</p>
              <p className="text-gray-700">{data[active]?.name}</p>
            </div> */}
            <CommenFiled name={"Name :"} description={data[active]?.name} />
            <CommenFiled name={"Origin :"} description={data[active]?.origin} />
            <CommenFiled
              name={"Weight (in metric) :"}
              description={data[active]?.weight?.metric}
            />
            <CommenFiled
              direction={"col"}
              name={"Description :"}
              description={data[active]?.description}
            />

            <buton
              className="border rounded-r-sm bg-[#4472c4] p-2 text-white "
              onClick={openWiki}
            >
              openWiki
            </buton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
