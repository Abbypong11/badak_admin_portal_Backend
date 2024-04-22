import RequestModel from "../models/request.model.js";

// Controller function to handle userrequests
export const createRequest = async (req, res) => {
  const { name, school, certificate, program } = req.body;

  try {
    // Create a new user request
const request = await RequestModel.create({
      name,
      school,
      certificate,
      program,
    });

    res.status(201).json({ message: "User request submitted successfully" });
  } catch (error) {
    console.error("Error submitting user request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



// Controller function to retrieve all user requests
export const getAllRequests = async (req, res) => {
  try {
    const userRequests = await RequestModel.find();
    res.status(200).json(userRequests);
  } catch (error) {
    console.error("Error fetching user requests:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to retrieve a user request by ID
export const getRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const userRequest = await RequestModel.findById(id);
    res.status(200).json(userRequest);
  } catch (error) {
    console.error("Error fetching user request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// function to delete a user request
export const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUserRequest = await RequestModel.findByIdAndDelete(id);
    if (!deletedUserRequest) {
      return res.status(404).json({ error: "User request not found" });
    }
    res.status(200).json({ message: "User request deleted successfully" });
  } catch (error) {
    console.error("Error deleting user request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Controller function to update a user request
export const updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
   
  const request = await RequestModel.findById(id)
    if(status){
      request.status = status
      const updatedRequest = await request.save()
      res.json(updatedRequest)
    } else{
      res.json(request)
    }
    
  } catch (error) {
    console.error("Error updating user request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
