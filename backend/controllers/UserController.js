const UserModel = require('../Models/User');
const RoleModel = require('../Models/Role')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const USerModel = require('../Models/User');
const AddressModel = require('../Models/Address');

const RegisterUser = async (req, res) => {
    try {
        const { Name, Username, Email, Phone, Password, IsAdmin, IsSystemAdmin } = req.body;
        if (!Name || !Username || !Email || !Phone || !Password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await UserModel.findOne({ Email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);
        const newUser = new UserModel({
            Name,
            Username,
            Email,
            Phone,
            Password: hashedPassword,
            IsAdmin,
            IsSystemAdmin
        });
        const savedUser = await newUser.save();
        if (!savedUser) {
            return res.status(500).json({ message: "User registration failed" });
        }
        if (IsAdmin) {
            const adminRole = new RoleModel({
                RoleName: 'Admin',
                userId: savedUser._id 
            });

            await adminRole.save();
        }
        if (IsSystemAdmin) {
            const systemAdminRole = new RoleModel({
                RoleName: 'SystemAdmin',
                userId: savedUser._id
            });

            await systemAdminRole.save();
        }
        return res.status(200).json({ message: "User registered successfully", userId: savedUser._id });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const LoginUser = async (req, res) => {
    try {
        const { Username, Password } = req.body;
        const user = await UserModel.findOne({ Username });
        if (!user) {
            return res.status(401).json({ error: "User does not exist" });
        }
        const validPassword = await bcrypt.compare(Password, user.Password);
        if (!validPassword) {
            return res.status(400).json({ error: "Invalid Password" });
        }
        const tokenPayload = {
            userId: user._id,
            email: user.email,
        };
        const jwtToken = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.cookie('token', jwtToken, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 30 * 24 * 60 * 60 * 1000, 
        });
        const roleData = await RoleModel.findOne({ userId: user._id });
        if (roleData != null) {
            const role = roleData.RoleName;
            res.cookie('role', role, {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            });
        }
        return res.status(200).json({ jwtToken: jwtToken, message: "Login successful" });
    } catch (err) {
        console.log("Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const GetAllUsers = async (req, res) => {
    try {
        const Users = await UserModel.find();
        if (!Users || Users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        const userIds = Users.map(user => user._id); 
        const Roles = await RoleModel.find({ userId: { $in: userIds } })
            .select('RoleName userId -_id'); 
        const usersWithRoles = Users.map(user => {
            const userRoles = Roles.filter(role => role.userId.toString() === user._id.toString());
            return {
                ...user._doc, 
                Roles: userRoles.map(role => role.RoleName) 
            };
        });
        return res.status(200).json({data:usersWithRoles});
    } catch (err) {
        console.error("Error:", err);       
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const GetUserByUsername = async (req, res) => {
    try {
        const { Username } = req.params;
        const User = await UserModel.findOne({ Username: { $regex: new RegExp(Username, 'i') } });

        if (!User) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(User);
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const UpdateUser = async (req, res) => {
    try {
        const { Name, Username, Email, Phone, IsAdmin, IsSystemAdmin } = req.body;
        const { Username: currentUsername } = req.params;
        const user = await UserModel.findOne({
            Username: { $regex: new RegExp(`^${currentUsername}$`, 'i') }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (Username && Username !== user.Username) {
            const existingUser = await UserModel.findOne({ Username });
            if (existingUser) {
                return res.status(400).json({ message: "Username already in use by another user" });
            }
            user.Username = Username; 
        }
        if (Email && Email !== user.Email) {
            const existingUser = await UserModel.findOne({ Email });
            if (existingUser) {
                return res.status(400).json({ message: "Email already in use by another user" });
            }
            user.Email = Email; 
        }
        if (Name) user.Name = Name;
        if (Phone) user.Phone = Phone;
        const updatedUser = await user.save();
        await RoleModel.deleteMany({ userId: updatedUser._id });

        if (IsAdmin) {
            const adminRole = new RoleModel({
                RoleName: 'Admin',
                userId: updatedUser._id
            });
            await adminRole.save();
        }

        if (IsSystemAdmin) {
            const systemAdminRole = new RoleModel({
                RoleName: 'SystemAdmin',
                userId: updatedUser._id
            });
            await systemAdminRole.save();
        }

        return res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        });

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
const DeleteUser = async (req, res) => { 
    const { id } = req.params;
    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const Role = await RoleModel.find({ UserId: user._id });

        await RoleModel.deleteMany({ UserId: user._id });
        await USerModel.findByIdAndDelete(id);

        res.status(200).json({ message: 'User and Role  deleted successfully!' });
    } catch (err) {
        console.error("Error deleting User:", err);
        res.status(500).json({ message: 'Error deleting User', error: err });
    }
};


const GetUserProfile = async (req, res) => {
    try {
        const user = req.user;
        return res.status(200).json({ user });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


const GetAddresses = async (req, res) => {
    try {
      const addresses = await AddressModel.find({ UserId: req.user.id });
      res.status(200).json(addresses);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching addresses', error });
    }
  };

  
  const AddAddress = async (req, res) => {
    const { Name, Mobile, PinCode, Address, Locality, City, State, IsDefault, Type } = req.body;

    try {
        // Create a new address object
        const newAddress = new AddressModel({
            UserId: req.user.id,
            Name,
            Mobile,
            PinCode,
            Address,
            Locality,
            City,
            State,
            IsDefault,
            Type,
        });

        // If IsDefault is true, make all other addresses for this user not default
        if (IsDefault) {
            await AddressModel.updateMany(
                { UserId: req.user.id },
                { IsDefault: false }
            );
        } else {
            // If no address exists, set the first address as default
            const existingAddresses = await AddressModel.find({ UserId: req.user.id });
            if (existingAddresses.length === 0) {
                newAddress.IsDefault = true;
            }
        }
        // Save the new address
        await newAddress.save();

        res.status(201).json({
            message: 'Address added successfully',
            data: newAddress,
        });
    } catch (error) {
        console.error('Error adding address:', error);
        res.status(500).json({ message: 'Error adding address', error });
    }
};



const UpdateUserAddress = async (req, res) => {
    try {
        const { editingAddressId } = req.params;

        const { Name, Mobile, PinCode, Address, Locality, City, State, IsDefault, Type } = req.body;

        const address = await AddressModel.findById(editingAddressId);
        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }

        if (Name) address.Name = Name;
        if (Mobile) address.Mobile = Mobile;
        if (PinCode) address.PinCode = PinCode;
        if (Address) address.Address = Address;
        if (Locality) address.Locality = Locality;
        if (City) address.City = City;
        if (State) address.State = State;
        if (Type) address.Type = Type;

        if (IsDefault === true) {
            // Set current address as default, and set others to non-default
            await AddressModel.updateMany(
                { UserId: address.UserId, _id: { $ne: editingAddressId } },
                { IsDefault: false }
            );
            address.IsDefault = true;
        } else {
            // If the current address is the only address left, it should be set as default
            const remainingAddresses = await AddressModel.find({ UserId: address.UserId });
            
            if (remainingAddresses.length === 1) {
                // Only one address left, so make it the default
                address.IsDefault = true;
            } else {
                // Check if there is already a default address
                const existingDefault = await AddressModel.findOne({ 
                    UserId: address.UserId, 
                    IsDefault: true, 
                    _id: { $ne: address._id } 
                });
                
                console.log(existingDefault)
                if (!existingDefault) {
                    // If no default address exists, make the first remaining address default
                    const firstRemainingAddress = await AddressModel.findOne({ UserId: address.UserId }).sort({ _id: 1 });
                    if (firstRemainingAddress) {
                        firstRemainingAddress.IsDefault = true;
                        await firstRemainingAddress.save();
                    }
                }
            }
        }

        const updatedAddress = await address.save();
        return res.status(200).json({
            message: "Address updated successfully",
            data: updatedAddress,
        });
    } catch (err) {
        console.error("Error updating address:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

  
  const DeleteUserAddress = async (req, res) => {
    const { id } = req.params;

    try {
        const address = await AddressModel.findById(id);
        
        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }

        const { UserId, IsDefault } = address;

        // Delete the address
        await AddressModel.findByIdAndDelete(id);

        // If the deleted address was the default, update the first remaining address to be default
        if (IsDefault) {
            const firstRemainingAddress = await AddressModel.findOne({ UserId }).sort({ _id: 1 }); // Sort by ID to get the first address

            if (firstRemainingAddress) {
                firstRemainingAddress.IsDefault = true;
                await firstRemainingAddress.save();
            }
        }

        res.status(200).json({ message: 'Address deleted successfully!' });
    } catch (err) {
        console.error("Error deleting address:", err);
        res.status(500).json({ message: 'Error deleting address', error: err });
    }
};

const UpdateDefaultAddress = async (req, res) => {
    try {
        const { AddressId } = req.params; // Extract AddressId from params
        const { Name, Mobile, PinCode, Address, Locality, City, State, IsDefault, Type } = req.body;

        // Find the address to update
        const address = await AddressModel.findById(AddressId);

        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }

        // Update the provided fields
        if (Name) address.Name = Name;
        if (Mobile) address.Mobile = Mobile;
        if (PinCode) address.PinCode = PinCode;
        if (Address) address.Address = Address;
        if (Locality) address.Locality = Locality;
        if (City) address.City = City;
        if (State) address.State = State;
        if (Type) address.Type = Type;

        // If IsDefault is true, set this address as default and unset others
        if (IsDefault) {
            await AddressModel.updateMany(
                { UserId: address.UserId, _id: { $ne: AddressId } }, // Exclude this address
                { IsDefault: false }
            );
            address.IsDefault = true;
        }

        // Save the updated address
        const updatedAddress = await address.save();

        return res.status(200).json({
            message: "Address updated successfully",
            data: updatedAddress,
        });
    } catch (err) {
        console.error("Error updating address:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { RegisterUser, LoginUser, GetUserByUsername, GetAllUsers, UpdateUser, 
    DeleteUser,GetUserProfile,GetAddresses,AddAddress,UpdateUserAddress,DeleteUserAddress,UpdateDefaultAddress };