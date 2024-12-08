import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/myOrderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
        }),
      });

      const data = await response.json();
      setOrderData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="container">
        <div className="row">
          {orderData.length > 0 ? (
            orderData.map((data, index) => {
              return (
                <div key={index}>
                  {data.orderData && data.orderData.order_data
                    ? data.orderData.order_data
                        .slice(0)
                        .reverse()
                        .map((item, itemIndex) => {
                          return item.map((arrayData, arrayDataIndex) => {
                            return (
                              <div key={arrayDataIndex}>
                                {arrayData.Order_date ? (
                                  <div className="m-auto mt-5">
                                    {arrayData.Order_date}
                                    <hr />
                                  </div>
                                ) : (
                                  <div className="col-12 col-md-6 col-lg-3">
                                    <div
                                      className="card mt-3"
                                      style={{
                                        width: "16rem",
                                        maxHeight: "360px",
                                      }}
                                    >
                                      {arrayData.img && (
                                        <img
                                          src={arrayData.img}
                                          className="card-img-top"
                                          alt="..."
                                          style={{
                                            height: "120px",
                                            objectFit: "fill",
                                          }}
                                        />
                                      )}
                                      <div className="card-body">
                                        {arrayData.name && (
                                          <h5 className="card-title">
                                            {arrayData.name}
                                          </h5>
                                        )}
                                        <div
                                          className="container w-100 p-0"
                                          style={{ height: "38px" }}
                                        >
                                          {arrayData.qty && (
                                            <span className="m-1">
                                              {arrayData.qty}
                                            </span>
                                          )}
                                          {arrayData.size && (
                                            <span className="m-1">
                                              {arrayData.size}
                                            </span>
                                          )}
                                          {arrayData.Order_date && (
                                            <span className="m-1">
                                              {arrayData.Order_date}
                                            </span>
                                          )}
                                          <div className=" d-inline ms-2 h-100 w-20 fs-5">
                                            {arrayData.price && (
                                              <span>₹{arrayData.price}/-</span>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          });
                        })
                    : ""}
                </div>
              );
            })
          ) : (
            <div>No orders found.</div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
