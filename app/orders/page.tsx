"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import formatPrice from "@/utils/formatPrice";
import { formatDate } from "@/utils/formatDate";
import { OrderTypes } from "@/types/orderTypes";

function OrdersPage() {
  const [orders, setOrders] = useState<OrderTypes[]>([]);
  const { user } = useUser();

  useEffect(() => {
    if (user && user.id) {
      fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (Array.isArray(data)) {
            setOrders(data);
          } else {
            console.error(
              "Data received from the server is not an array:",
              data
            );
          }
        })
        .catch((error) => console.error("Error fetching orders:", error));
    }
  }, [user]);

  if (!user) {
    return (
      <div className="w-[89%] m-auto text-center mt-10">
        <h2 className="font-bold text-2xl text-primary uppercase">
          WOAH THERE...
        </h2>
        <p>You must be signed in to view orders.</p>
      </div>
    );
  }

  return (
    <div className="w-[89%] m-auto flex flex-col gap-6">
      <div className="text-center my-10">
        <h2 className="font-bold text-3xl text-primary uppercase">
          Hello {user.username}!
        </h2>
        <p className="text-lg text-gray-600">Below are your recent orders</p>
      </div>
      {orders.length < 1 ? (
        <div className="font-bold text-center text-xl text-gray-600 uppercase">
          No recent orders
        </div>
      ) : (
        <>
          {orders.map((order, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xl font-semibold">
                  Order ID: {order.id.replace(/\D/g, "")}
                </p>
                <p className="text-sm text-gray-600">
                  Order Date: {formatDate(order.createdDate)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-base text-gray-600">Order Amount:</p>
                  <p className="text-2xl font-semibold text-primary">
                    {formatPrice(order.amount)}
                  </p>
                </div>
                <div>
                  <p className="text-base text-gray-600">Order Status:</p>
                  <p className="text-base text-primary">{order.status}</p>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default OrdersPage;
