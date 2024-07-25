import React, { useEffect, useState } from "react";
import Cardfeatures from "./Cardfeatures";
import Filterproduct from "./Filterproduct";
import { useSelector } from "react-redux";

const Allproducts = ({ heading, loading }) => {
  const productData = useSelector((state) => state.product.productlist);
  const categoryList = [...new Set(productData.map((el) => el.category))];

  //Filter data display
  const [filterby, setfilrtBy] = useState("");
  const [DataFilter, SetDataFilter] = useState([]);
  useEffect(() => {
    SetDataFilter(productData);
  }, [productData]);

  const HandleFilterProduct = (category) => {
    const filter = productData.filter(
      (el) => el.category.toLowerCase() === category.toLowerCase()
    );
    SetDataFilter(() => {
      return [...filter];
    });
  };
  const loadingarrayfeature = new Array(10).fill(null);

  return (
    <div className="my-5">
      <h2 className="font-bold text-black -500 text-2xl mb-4">{heading}</h2>
      <div className="flex gap-4 justify-center overflow-scroll scrollbar-none">
        {categoryList[0] ? (
          categoryList.map((el) => {
            return (
              <Filterproduct
                category={el}
                key={el}
                onClick={() => HandleFilterProduct(el)}
              />
            );
          })
        ) : (
          <div className="min-h-[150px] flex justify-center items-center">
            <p>{loading}</p>
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-4 my-4">
        {DataFilter[0]
          ? DataFilter.map((el) => {
              return (
                <Cardfeatures
                  key={el._id}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  category={el.category}
                  price={el.price}
                />
              );
            })
          : loadingarrayfeature.map((el, index) => (
              <Cardfeatures loading="loading...." key={index + "allproduct"} />
            ))}
      </div>
    </div>
  );
};

export default Allproducts;
