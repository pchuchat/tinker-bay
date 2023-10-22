"use client";

import CheckoutItem from "../components/CheckoutItem"
import MainLayout from "../layouts/MainLayout"


export default function Checkout() {

    
  return (
    <>
        <MainLayout>
            <div id="CheckoutPage" className="mt-4 max-w-[1100px] mx-auto">

                <div className="text-2xl font-bold mt-4 mb-4">Checkout</div>
    
                <div className="relative flex items-baseline gap-4 justify-between mx-auto w-full">
                    <div className="w-[65%]">
                        <div className="bg-white rounded-lg p-4 border">

                            <div className="text-xl font-semibold mb-2">Shipping Address</div>

                            <div>
                                {!isLoadingAddress ?
                                    <Link href="/address" className="text-blue-500 text-sm underline">
                                        {addressDetails.name ? 'Update Address' : 'Add Address'}
                                    </Link>
                                : null}

                                {!isLoadingAddress && addressDetails.name ?
                                    <ul className="text-sm mt-2">
                                        <li>Name: {addressDetails.name}</li>
                                        <li>Address: {addressDetails.address}</li>
                                        <li>Zip: {addressDetails.zipcode}</li>
                                        <li>City: {addressDetails.city}</li>
                                        <li>Country: {addressDetails.country}</li>
                                    </ul>
                                : null}

                                {isLoadingAddress ?
                                    <div className="flex items-center mt-1 gap-2">
                                        <AiOutlineLoading3Quarters className="animate-spin"/>
                                        Getting Address...
                                    </div>
                                : <div></div>}
                            </div>
                        </div>

                        <ClientOnly>
                            <div id="Items" className="bg-white rounded-lg mt-4">
                                {cart.getCart().map(product => (
                                    <CheckoutItem key={product.id} product={product} />
                                ))}
                            </div>
                        </ClientOnly>
                    </div>
                    
                    <div id="PlaceOrder" className="relative -top-[6px] w-[35%] border rounded-lg">
                        <ClientOnly>
                            <div className="p-4">
                                <div className="flex items-baseline justify-between text-sm mb-1">
                                    <div>Items ({cart.getCart().length})</div>
                                    <div>€{(cart.cartTotal() / 100).toFixed(2)}</div>
                                </div>
                                <div className="flex items-center justify-between mb-4 text-sm">
                                    <div>Shipping:</div>
                                    <div>Free</div>
                                </div>

                                <div className="border-t" />

                                <div className="flex items-center justify-between my-4">
                                    <div className="font-semibold">Order total</div>
                                    <div className="text-2xl font-semibold">
                                        €{(cart.cartTotal() / 100).toFixed(2)}
                                    </div>
                                </div>

                                <form onSubmit={pay}>
                                    <div 
                                        className="border border-gray-500 p-2 rounded-sm" 
                                        id="card-element" 
                                    />

                                    <p 
                                        id="card-error" 
                                        role="alert" 
                                        className="text-red-700 text-center font-semibold relative top-2" 
                                    />

                                    <button 
                                        type="submit"
                                        className="mt-4 bg-blue-600 text-lg w-full text-white font-semibold p-3 rounded-full"
                                    >
                                        <div>Confirm and pay</div>
                                    </button>
                                </form>
                            </div>
                        </ClientOnly>

                        <div className="flex items-center p-4 justify-center gap-2 border-t">
                            <img width={50} src="/images/logo.svg" />
                            <div className=" font-light mb-2 mt-2">MONEY BACK GUARANTEE</div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    </>
  )
}