import React, { useState } from 'react';

const PaymentPage = () => {
    const [selectedPaymentMode, setSelectedPaymentMode] = useState(null);

    const handlePaymentModeSelection = (mode) => {
        setSelectedPaymentMode(mode);
    };

    const handlePlaceOrder = () => {
        alert('Order placed successfully!');
    };

    return (
        <div className="payment-page">
            <h1>Choose Payment Mode</h1>
            
            {/* Payment Options */}
            <div className="payment-options">
                <button onClick={() => handlePaymentModeSelection('cash-on-delivery')}>
                    Cash on Delivery
                </button>
                <button onClick={() => handlePaymentModeSelection('credit-card')}>
                    Credit/Debit Card
                </button>
                <button onClick={() => handlePaymentModeSelection('upi')}>
                    UPI
                </button>
                <button onClick={() => handlePaymentModeSelection('net-banking')}>
                    Net Banking
                </button>
            </div>

            {/* Section for Cash on Delivery */}
            {selectedPaymentMode === 'cash-on-delivery' && (
                <div className="payment-section">
                    <h2>Cash on Delivery (COD)</h2>
                    <p>You can pay via Cash/UPI on delivery.</p>
                    
                    <div className="cod-options">
                        <label>
                            <input type="radio" name="cod-option"  />
                            Cash on Delivery
                        </label>
                    </div>

                    <button className="place-order-button" onClick={handlePlaceOrder}>
                        Place Order
                    </button>
                </div>
            )}
        </div>
    );
};

export default PaymentPage;
