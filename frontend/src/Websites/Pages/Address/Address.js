import React, { useEffect, useState, useRef } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { getUserAddresses, addUserAddress, updateUserAddress, deleteUserAddress ,UpdateDefaultAddress} from '../../../Services/UserService';

export default function Address() {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingAddressId, setEditingAddressId] = useState(null);
    const [showForm, setShowForm] = useState(false); // Track form visibility
    const [newAddress, setNewAddress] = useState({
        Name: '',
        Mobile: '',
        PinCode: '',
        Address: '',
        Locality: '',
        City: '',
        State: '',
        Type: 'Home',
        IsDefault: false,
    });

    const navigate = useNavigate();
    const isFetchedRef = useRef(false);

    useEffect(() => {
        if (!isFetchedRef.current) {
            const fetchAddresses = async () => {
                try {
                    const token = Cookies.get('token');
                    if (!token) {
                        navigate('/login', { state: { redirectTo: '/checkout/address' } });
                        return;
                    }
                    const response = await getUserAddresses(token);
                    setAddresses(response.data);
                    
                    const defaultAddress = response.data.find((address) => address.IsDefault);
                    if (defaultAddress) {
                        setSelectedAddress(defaultAddress._id); // Set the selected address to the default address
                    }
                } catch (error) {
                    console.error('Error fetching addresses:', error);
                    setError('Unable to fetch addresses. Please try again.');
                } finally {
                    setLoading(false);
                }
            };
            fetchAddresses();
            isFetchedRef.current = true;
        }
    }, [navigate]);

    const handleAddAddressClick = () => {
        setEditingAddressId(null);
        setNewAddress({
            Name: '',
            Mobile: '',
            PinCode: '',
            Address: '',
            Locality: '',
            City: '',
            State: '',
            Type: 'Home',
            IsDefault: false,
        });
        setShowForm(true); // Show the form
    };

    const handleSaveAddress = async (e) => {
        e.preventDefault();
        try {
            
            const token = Cookies.get('token');
            if (editingAddressId) {
                const response = await updateUserAddress(token, editingAddressId, newAddress);
                setAddresses(addresses.map((addr) => (addr._id === editingAddressId ? response.data : addr)));
            } else {
                const response = await addUserAddress(token, newAddress);
                setAddresses([...addresses, response.data]);
            }
            setEditingAddressId(null);
            setShowForm(false); // Hide the form after saving
            setNewAddress({
                Name: '',
                Mobile: '',
                PinCode: '',
                Address: '',
                Locality: '',
                City: '',
                State: '',
                Type: 'Home',
                IsDefault: false,
            });
        } catch (error) {
            console.error('Error saving address:', error);
            setError('Unable to save address. Please try again.');
        }
    };

    const handleEditAddress = (address) => {
        setEditingAddressId(address._id);
        setNewAddress({ ...address });
        setShowForm(true); // Show the form for editing
    };

    const handleDeleteAddress = async (id) => {
        if (window.confirm('Are you sure you want to delete this address?')) {
            try {
                const token = Cookies.get('token');
                await deleteUserAddress(token, id);
                setAddresses(addresses.filter((addr) => addr._id !== id));
            } catch (error) {
                console.error('Error deleting address:', error);
                setError('Unable to delete address. Please try again.');
            }
        }
    };

    const handleProceed = () => {
        if (selectedAddress) {
            navigate('/Checkout/payment', { state: { addressId: selectedAddress } });
        } else {
            alert('Please select an address.');
        }
    };
    const handleDefaultAddressChange = async (addressId) => {
        try {
            const response = await  UpdateDefaultAddress(addressId);
    
            if (!response.ok) {
                throw new Error('Failed to update default address');
            }
            const updatedAddresses = addresses.map((address) => ({
                ...address,
                IsDefault: address._id === addressId, 
            }));
            setAddresses(updatedAddresses);
        } catch (error) {
            console.error('Error updating default address:', error);
        }
    };
    
    if (loading) return <p>Loading addresses...</p>;

    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="address-container">
            <h2>Select Address</h2>
            {addresses.length === 0 ? (
                <p>No addresses found. Please add a new address.</p>
            ) : (
                addresses.map((address) => (
                    <div key={address._id} >
                        <input
                            type="radio"
                            id={address._id}
                            name="address"
                            value={address._id}
                            checked={address.IsDefault} // Select by default if IsDefault is true
                            onChange={() => handleDefaultAddressChange(address._id)}
                        />
                        <label htmlFor={address._id}>
                            <strong>{address.Name}</strong> ({address.Type}) <br />
                            {address.Address}, {address.Locality}, {address.City}, {address.State} - {address.PinCode} <br />
                            Mobile: {address.Mobile}
                            {address.IsDefault && <span className="default-label"> (Default)</span>}
                        </label>
                        <button className="edit-button" onClick={() => handleEditAddress(address)}>
                            Edit
                        </button>
                        <button className="delete-button" onClick={() => handleDeleteAddress(address._id)}>
                            Delete
                        </button>
                    </div>
                ))
            )}

            {!showForm && (
                <button className="add-address-button" onClick={handleAddAddressClick}>
                    Add New Address
                </button>
            )}

            {showForm && (
                <form className="add-address-form" onSubmit={handleSaveAddress}>
                    <h3>{editingAddressId ? 'Edit Address' : 'Add New Address'}</h3>
                    <input
                        type="text"
                        placeholder="Name"
                        value={newAddress.Name}
                        onChange={(e) => setNewAddress({ ...newAddress, Name: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Mobile"
                        value={newAddress.Mobile}
                        onChange={(e) => setNewAddress({ ...newAddress, Mobile: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Pin Code"
                        value={newAddress.PinCode}
                        onChange={(e) => setNewAddress({ ...newAddress, PinCode: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        value={newAddress.Address}
                        onChange={(e) => setNewAddress({ ...newAddress, Address: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Locality"
                        value={newAddress.Locality}
                        onChange={(e) => setNewAddress({ ...newAddress, Locality: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="City"
                        value={newAddress.City}
                        onChange={(e) => setNewAddress({ ...newAddress, City: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="State"
                        value={newAddress.State}
                        onChange={(e) => setNewAddress({ ...newAddress, State: e.target.value })}
                        required
                    />
                    <select
                        value={newAddress.Type}
                        onChange={(e) => setNewAddress({ ...newAddress, Type: e.target.value })}
                    >
                        <option value="Home">Home</option>
                        <option value="Work">Work</option>
                    </select>
                    <label>
                        <input
                            type="checkbox"
                            checked={newAddress.IsDefault}
                            onChange={(e) => setNewAddress({ ...newAddress, IsDefault: e.target.checked })}
                        />
                        Set as Default Address
                    </label>
                    <button type="submit">{editingAddressId ? 'Update Address' : 'Save Address'}</button>
                </form>
            )}
            {addresses.length > 0 && (<button className="proceed-button" onClick={handleProceed}>
                Proceed to Checkout
            </button>)}

        </div>
    );
}
