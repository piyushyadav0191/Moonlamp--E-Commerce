import { useWishlistStore } from "@/store/useWishlistStore";
import Image from "next/image";
import { useEffect } from "react";

const WishList = () => {
  const wishlistStore = useWishlistStore();

  return (
    <div
      onClick={() => wishlistStore.toggleWishList()}
      className="fixed w-full h-screen top-0 left-0 bg-black/25 z-50 flex justify-center items-center"
    >
      <div className="bg-white md:w-2/5 w-3/4 h-full p-12 overflow-x-scroll rounded-lg shadow-lg">
        <button
          onClick={() => wishlistStore.toggleWishList()}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          Back to Store
        </button>
        {wishlistStore.onWishList === "wishlist" &&
        wishlistStore.wishList.length > 0 ? (
          <>
            <h1 className="text-2xl font-semibold mb-4">Hello</h1>
            <span className="text-gray-600">
              You have {wishlistStore.wishList.length} items in your wishlist
            </span>
            {wishlistStore.wishList.map((product) => (
              <div
                key={product.id}
                className="mt-4 border-b pb-4 flex items-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="ml-4">
                  <h1 className="text-lg font-semibold">{product.name}</h1>
                  <button
                    onClick={() =>
                      wishlistStore.removeFromWishlist({ ...product })
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <h1 className="font-bold italic text-xl">Your Wishlist is empty</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishList;
