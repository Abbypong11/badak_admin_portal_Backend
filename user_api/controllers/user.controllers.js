import UserModel from "../models/user.models.js";
import errorHandler from "../middlewares/error.middleware.js";
import generateToken from "../token/token.js";

// Create a new user and return a success message
export const createUser = async (req, res, next) => {
  const userExist = await UserModel.findOne({ email: req?.body?.email });
  if (userExist) throw new errorHandler("User already exist");
  try {
    const user = await UserModel.create({ ...req.body });
    if (user) {
      return res.status(201).json({
        message: "User created successfully",
        user: user,
      });
    } else {
      return res.status(404).json({
        error: "Error creating new user",
      });
    }
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
};

// Function to check login credentials
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Retrieve user credentials from the database based on the provided EMAIL
    const user = await UserModel.findOne({ email });

    // Perform authentication
    if (!user) {
      return res.status(401).json({ error: "Invalid username email address" });
    }

    // Compare the provided password with the hashed password from the database
    const passwordMatch = await comparePasswords(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Respond with success message
    res.status(200).json({
      _id: user?._id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      isAdmin: user?.isAdmin,
      token: generateToken(user?._id),
    });
  } catch (error) {
    // Handle errors using the error handling middleware
    errorHandler(error, res);
  }
};

// Export functions to get ALL users
export const getUsers = async (req, res, next) => {
  try {
    const getResult = await UserModel.find({});
    if (getResult.length === 0) {
      return res.status(404).json("No data found");
    } else {
      return res.status(200).json(getResult);
    }
  } catch (error) {
    next(error);
  }
};

// Get a single user by ID, or return an error message if not found
export const getUser = async (req, res, next) => {
  try {
    const getSingleUser = await UserModel.findById(req.params.id);

    if (!getSingleUser) {
      return res
        .status(404)
        .json(`User with the given id:${req.params.id} was not found`);
    } else {
      res.status(200).json(getSingleUser);
    }
  } catch (error) {
    next(error);
  }
};

// Delete a user by ID and return a success message, or an error message if not found
export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteSingleUser = await UserModel.findByIdAndDelete(id);
    res.status(200).json("User deleted successfully", deleteSingleUser);
  } catch (error) {
    next(error);
  }
};

// Update a user by ID and return a success message, or an error message if not found
export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updateUser = await UserModel.findByIdAndUpdate(
      id,
      {
        firstName: req?.body?.firstName,
        lastName: req?.body?.lastName,
        email: req?.body?.email,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json("User has been updated Successfully", updateUser);
  } catch (error) {
    next(error);
  }
};
