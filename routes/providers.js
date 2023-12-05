const express = require("express");
const axios = require("axios");
const router = express.Router();
const client = require("../database/db");
const { ObjectId } = require("mongodb");

const usersCollection = client.db("NeighborServe").collection("UsersData");
const ChatsCollection = client.db("NeighborServe").collection("Chats"); // Update with your actual database and collection names
const msgCollection = client.db("NeighborServe").collection("Messages");

router.get("/api/:id/:category", async (req, res) => {
  const id = req.params.id; // Use req.params.id to get the id from route parameters
  const category = req.params.category;
  const type = "Service Provider";
  const filter = { user_category: category, user_type: type };
  const result = await usersCollection.find(filter).toArray();
  const filter2 = { _id: new ObjectId(id) };
  const document = await usersCollection.find(filter2).toArray();
  const userLat = document[0].user_lat;
  const userLon = document[0].user_lon;

  // haversine algorithm to calculate distances between 2 coordinates
  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const lat1Rad = toRadians(lat1);
    const lon1Rad = toRadians(lon1);
    const lat2Rad = toRadians(lat2);
    const lon2Rad = toRadians(lon2);
    const dlon = lon2Rad - lon1Rad;
    const dlat = lat2Rad - lat1Rad;

    const a =
      Math.sin(dlat / 2) ** 2 +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    // console.log("distance: " + distance);
    return distance;
  }

  const dataArrayUpdated = result.map((place) => {
    const distance = haversine(
      userLat,
      userLon,
      place.user_lat,
      place.user_lon
    );
    return { ...place, distance };
  });

  // Sort the dataArrayWithDistances by distance in ascending order
  dataArrayUpdated.sort((a, b) => a.distance - b.distance);

  // dataArrayUpdated.slice(0, 5).map((data)=>{
  //   const newData=data;
  // })
  // const modifiedArray = dataArrayUpdated.slice(0, 5).map((data) => {});
  const dataArrayUpdatedArray = [...dataArrayUpdated];
  const firstFiveElements = dataArrayUpdatedArray.slice(0, 3);

  res.send(firstFiveElements);
});

router.get("/api/v2/:id/:category", async (req, res) => {
  try {
    const id = req.params.id;
    const category = req.params.category;

    // Make a GET request using axios to the first API
    const response = await axios.get(
      `http://localhost:5000/providers/api/${id}/${category}`
    );

    // Perform sentiment analysis for each element in response.data
    const promises = response.data.map(async (item) => {
      const firstUserReviews = item.user_reviews;

      // Extract reviews
      const extractedReviews = {
        sentences: firstUserReviews.map((review) => ({ text: review.review })),
      };

      // Make a POST request to the sentiment analysis API
      const response2 = await axios.post("http://localhost:5001/predict", {
        sentences: extractedReviews.sentences,
      });

      // Access the positiveness value from the response of the second API call
      const positiveness = response2.data.overall_score;

      // Store the positiveness value inside the current item
      item.positiveness = positiveness;

      return item;
    });

    // Wait for all promises to resolve
    const updatedData = await Promise.all(promises);

    // Send the updated response to the client
    res.json(updatedData);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/providers/:id/:category", async (req, res) => {
  const id = req.params.id; // Use req.params.id to get the id from route parameters
  const category = req.params.category;
  const type = "Service Provider";
  const filter = { user_category: category, user_type: type };
  const result = await usersCollection.find(filter).toArray();
  const filter2 = { _id: new ObjectId(id) };
  const document = await usersCollection.find(filter2).toArray();
  const userLat = document[0].user_lat;
  const userLon = document[0].user_lon;

  // haversine algorithm to calculate distances between 2 coordinates
  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const lat1Rad = toRadians(lat1);
    const lon1Rad = toRadians(lon1);
    const lat2Rad = toRadians(lat2);
    const lon2Rad = toRadians(lon2);
    const dlon = lon2Rad - lon1Rad;
    const dlat = lat2Rad - lat1Rad;

    const a =
      Math.sin(dlat / 2) ** 2 +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    // console.log("distance: " + distance);
    return distance;
  }

  const dataArrayUpdated = result.map((place) => {
    const distance = haversine(
      userLat,
      userLon,
      place.user_lat,
      place.user_lon
    );
    return { ...place, distance };
  });

  // Sort the dataArrayWithDistances by distance in ascending order
  dataArrayUpdated.sort((a, b) => a.distance - b.distance);

  res.send(dataArrayUpdated);
});

router.get("/getDistance/:userId/:proId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const proId = req.params.proId;
    const filter = { _id: new ObjectId(userId) };
    const filter2 = { _id: new ObjectId(proId) };
    const userData = await usersCollection.find(filter).toArray();
    const proData = await usersCollection.find(filter2).toArray();
    const userLat = userData[0].user_lat;
    const userLon = userData[0].user_lon;
    const userLocation = userData[0].user_location;
    const proLat = proData[0].user_lat;
    const proLon = proData[0].user_lon;
    const proLocation = proData[0].user_location;
    const uimg = userData[0].user_img;
    const pimg = proData[0].user_img;

    function toRadians(degrees) {
      return degrees * (Math.PI / 180);
    }

    function haversine(lat1, lon1, lat2, lon2) {
      const R = 6371000; // Radius of the Earth in meters
      const lat1Rad = toRadians(lat1);
      const lon1Rad = toRadians(lon1);
      const lat2Rad = toRadians(lat2);
      const lon2Rad = toRadians(lon2);
      const dlon = lon2Rad - lon1Rad;
      const dlat = lat2Rad - lat1Rad;

      const a =
        Math.sin(dlat / 2) ** 2 +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dlon / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;
      return distance;
    }

    const distanceInMeters = haversine(userLat, userLon, proLat, proLon);

    // Check for Nearby conditions
    let result = "";
    if (distanceInMeters === 0 || distanceInMeters <= 100 * 60) {
      result = "Nearby";
    } else {
      // Format the distance based on the value
      result =
        distanceInMeters < 1000
          ? `${Math.round(distanceInMeters)} meters`
          : `${(distanceInMeters / 1000).toFixed(2)} km`;
    }

    // Send the response as JSON
    res.json({
      distance: result,
      userLocation,
      proLocation,
      uimg,
      pimg,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getId/:userEmail", async (req, res) => {
  const email = req.params.userEmail;
  const filter = { user_email: email };
  const result = await usersCollection.find(filter).toArray();
  res.send(result);
});

router.get("/providersProfile", async (req, res) => {
  const id = req.query.id;
  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    return res.status(400).send("Invalid ObjectId format");
  }
  const filter = { _id: new ObjectId(id) };
  const result = await usersCollection.find(filter).toArray();
  res.send(result);
});

router.patch("/update_location/:userId", async (req, res) => {
  const id = req.params.userId;
  const { user_lat, user_lon, user_location } = req.body;
  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: {
      user_lat,
      user_lon,
      user_location,
    },
  };
  const result = await usersCollection.updateOne(filter, updateDoc);
  res.send(result);
});

router.patch("/update_pro/:userId", async (req, res) => {
  const id = req.params.userId;
  const { user_rating } = req.body;
  // console.log("rating: " + user_rating);
  const filter = { _id: new ObjectId(id) };
  const userData = await usersCollection.find(filter).toArray();
  const count = userData[0].user_hireCount;
  const newCount = count + 1;
  const updatedRating =
    count > 0
      ? parseFloat(
          ((userData[0].user_rating * count + user_rating) / newCount).toFixed(
            1
          )
        )
      : parseFloat(user_rating); // Parse the result to float
  const updateDoc = {
    $set: {
      user_hireCount: newCount,
      user_rating: updatedRating, // Use a different variable here
    },
  };
  const result = await usersCollection.updateOne(filter, updateDoc);
  res.send(result);
});

router.post("/post_review/:userId", async (req, res) => {
  const id = req.params.userId;
  const newReview = req.body;
  const result = await usersCollection.updateOne(
    { _id: new ObjectId(id) },
    {
      $push: {
        user_reviews: newReview,
      },
    }
  );
});

router.patch("/verification/:userId", async (req, res) => {
  const id = req.params.userId;
  const { user_phone, user_verificationStatus } = req.body;
  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: {
      user_phone,
      user_verificationStatus,
    },
  };
  const result = await usersCollection.updateOne(filter, updateDoc);
  res.send(result);
});

router.get("/appointment", async (req, res) => {
  const userId = req.query.id;
  const filter = { _id: new ObjectId(userId) };
  const userDocument = await usersCollection.findOne(filter);

  if (!userDocument) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  const appointments = userDocument.appointments || [];

  // Create an array of all possible time slots you want to consider
  const allTimeSlots = [
    "Choose a time slot",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
  ];

  // Get the current time
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  // Iterate through the appointments and remove already appointed time slots
  for (const appointment of appointments) {
    const appointmentTime = appointment.appointmentTime;
    const [hour, minutes] = appointmentTime.split(":");
    const appointmentHour = parseInt(hour, 10);
    const appointmentMinutes = parseInt(minutes, 10);

    if (
      appointmentHour < currentHour ||
      (appointmentHour === currentHour && appointmentMinutes <= currentMinutes)
    ) {
      // If the appointment has already passed, remove it from available time slots
      const index = allTimeSlots.indexOf(appointmentTime);
      if (index !== -1) {
        allTimeSlots.splice(index, 1);
      }
    }
  }

  res.json({ availableTimeSlots: allTimeSlots });
});

router.post("/create-appointment/:userId", async (req, res) => {
  const id = req.params.userId;
  const newappointmentData = req.body;

  try {
    const result1 = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $push: {
          appointments: newappointmentData,
        },
      }
    );

    if (result1.modifiedCount === 1) {
      // The update for the first user was successful

      // Now, update the second user (assuming user_id is a string)
      const secondUserId = newappointmentData.user_id;

      const result2 = await usersCollection.updateOne(
        { _id: new ObjectId(secondUserId) },
        {
          $push: {
            appointments: newappointmentData,
          },
        }
      );

      if (result2.modifiedCount === 1) {
        // The update for the second user was successful
        res.status(200).json({ message: "appointments added successfully" });
      } else {
        // No document was matched for the second update
        res.status(404).json({ error: "Second user not found" });
      }
    } else {
      // No document was matched for the first update
      res.status(404).json({ error: "First user not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error adding appointments" });
  }
});

router.get("/view_appointment/:userId", async (req, res) => {
  const id = req.params.userId;
  const filter = { _id: new ObjectId(id) };
  const result = await usersCollection.find(filter).toArray();

  if (result.length > 0) {
    const appointments = result[0].appointments;
    res.json({ appointments });
  } else {
    // Handle the case when the user is not found
    res.status(404).json({ error: "User not found" });
  }
});

// router.get("/request_count/:userId", async (req, res) => {
//   const id = req.params.userId;
//   const filter = { _id: new ObjectId(id) };
//   const result = await usersCollection.find(filter).toArray();

//   if (result.length > 0) {
//     const appointments = result[0].appointments;

//     // Count the number of appointments with status "Pending"
//     const pendingAppointmentsCount = appointments.filter(appointment => appointment.status === "Pending").length;
//     console.log(pendingAppointmentsCount);
//     res.json({ pendingAppointmentsCount });
//   } else {
//     // Handle the case when the user is not found
//     res.status(404).json({ error: "User not found" });
//   }
// });

router.patch(
  "/updateAppointment/:userId/:clientId/:appointmentId",
  async (req, res) => {
    const userId = req.params.userId;
    const clientId = req.params.clientId; // Use req.params.clientId here
    const appointmentId = req.params.appointmentId;
    const { status } = req.body;

    try {
      const filter = {
        _id: new ObjectId(userId),
        "appointments.appointmentId": appointmentId,
      };
      const filter2 = {
        _id: new ObjectId(clientId),
        "appointments.appointmentId": appointmentId,
      };
      // console.log("userId:", userId);
      // console.log("clientId:", clientId);
      // console.log("appointmentId:", appointmentId);
      // console.log("status:", status);
      const updateDoc = { $set: { "appointments.$.status": status } };
      const updateDoc2 = { $set: { "appointments.$.status": status } };

      const result = await usersCollection.updateOne(filter, updateDoc);
      const result2 = await usersCollection.updateOne(filter2, updateDoc2);

      if (result.modifiedCount > 0 || result2.modifiedCount > 0) {
        res
          .status(200)
          .json({ message: "Appointment status updated successfully" });
      } else {
        res
          .status(404)
          .json({ error: "Appointment not found or status not updated" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error updating appointment status" });
    }
  }
);

// router.patch("/updateAppointment2/:userId/:appointmentId", async (req, res) => {
//   const userId = req.params.userId;
//   const appointmentId = req.params.appointmentId;
//   const { status } = req.body;

//   try {
//     const filter = {
//       _id: new ObjectId(userId),
//       "appointments.appointmentId": appointmentId,
//     };
//     const updateDoc = { $set: { "appointments.$.status": status } };
//     const result = await usersCollection.updateOne(filter, updateDoc);

//     if (result.modifiedCount > 0 || result2.modifiedCount > 0) {
//       res
//         .status(200)
//         .json({ message: "Appointment status updated successfully" });
//     } else {
//       res
//         .status(404)
//         .json({ error: "Appointment not found or status not updated" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Error updating appointment status" });
//   }
// });

router.get("/appointment_details/:userId/:appointmentId", async (req, res) => {
  const userId = req.params.userId;
  const appointmentId = req.params.appointmentId;

  try {
    // Assuming your appointments are stored as an array of objects in your user document
    const filter = { _id: new ObjectId(userId) };
    const user = await usersCollection.findOne(filter);

    if (user) {
      const appointment = user.appointments.find(
        (appointment) => appointment.appointmentId === appointmentId
      );

      if (appointment) {
        res.status(200).json(appointment);
      } else {
        res.status(404).json({ error: "appointment not found" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching appointment" });
  }
});

router.delete(
  "/cancel_appointment/:userId/:appointmentId",
  async (req, res) => {
    const userId = req.params.userId;
    console.log("user id: " + userId);
    const appointmentId = req.params.appointmentId;
    const filter = { _id: new ObjectId(userId) };
    const update = {
      $pull: { appointments: { appointmentId: appointmentId } },
    };

    try {
      const document = await usersCollection.findOne(filter);

      if (document) {
        const appointments = document.appointments;
        const appointment = appointments.find(
          (router) => router.appointmentId === appointmentId
        );

        if (appointment) {
          const userId2 =
            userId === appointment.pro_id
              ? appointment.user_id
              : appointment.pro_id;

          console.log("pro id: " + userId2);

          const filter2 = { _id: new ObjectId(userId2) };
          const update2 = {
            $pull: { appointments: { appointmentId: appointmentId } },
          };
          const result = await usersCollection.updateOne(filter, update);
          const result2 = await usersCollection.updateOne(filter2, update2);
        } else {
          res.status(404).json({ error: "appointment not found" });
        }
      } else {
        res.status(404).json({ error: "User not found" });
      }

      // Send a success response or other routerropriate response here
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  }
);

router.patch("/approved/:id", async (req, res) => {
  const id = req.params.id;

  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: {
      status: "approved",
    },
  };

  const result = await usersCollection.updateOne(filter, updateDoc);
  res.send(result);
});

router.patch("/denied/:id", async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: {
      status: "denied",
    },
  };

  const result = await usersCollection.updateOne(filter, updateDoc);
  res.send(result);
});
//Salam
//Socket Implementation
// const { socket } = require("socket.io");

let Users = [];
const io = require("socket.io")(8080, {
  cors: {
    origin: "http://localhost:5173",
  },
});
io.on("connection", (socket) => {
  console.log("User Connected", socket.id);
  socket.on("addUser", (userId) => {
    console.log(
      "Received 'addUser' event from",
      socket.id,
      "with userId:",
      userId
    );
    const isUserExist = Users.find((user) => user.userId === userId);
    if (!isUserExist) {
      const User = { userId, socketId: socket.id };
      Users.push(User);
      console.log("Updated Users list:", Users);
      io.emit("getUsers", Users);
    }
  });

  socket?.on('sendMessage',async({senderId,receiverId,message,conversationId})=>{
    const receiver= Users.find(user=>user.userId=== receiverId);
    const sender=Users.find(user=>user.userId=== senderId);
    console.log("Sender: ",sender,"receiver",receiver);
    const user=await usersCollection.findOne(new ObjectId(senderId));
    console.log("User",user);
    if(receiver){
      io.to(receiver.socketId).to(sender.socketId).emit('getMessage',{
        senderId,
        message,
        conversationId,
        receiverId,
        user:{id:user._id,name:user.user_fullname,email:user.user_email}
      })
    }
  }) 
  socket?.on("disconnect", () => {
    Users = Users.filter((user) => user.socketId !== socket.id);
    console.log("Updated Users list after disconnect:", Users);
 
    io.emit("getUsers", Users);
  });
});



router.get("/service_history", async (req, res) => {
  try {
    const serviceCollection = client
      .db("NeighborServe")
      .collection("serviceHistory");
    const serviceHistory = await serviceCollection.find({}).limit(10).toArray();
    res.json(serviceHistory);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

router.post("/conversations", async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    console.log("Request Body:", req.body); // Add this line for logging
    console.log("SenderId:", senderId); // Add this line for logging
    console.log("ReceiverId:", receiverId); // Add this line for logging // Add this line for logging
    if (!senderId || !receiverId) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid request body" });
    }

    const result = await ChatsCollection.insertOne({
      members: [senderId, receiverId],
      timestamp: new Date(),
    });

    res.status(200).json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.error("Error creating chat:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.get("/conversations/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
      return res.status(400).send("Invalid ObjectId format");
    }
    console.log("Requested userId:", userId);

    // Find conversations where the provided userId is in the members array
    const conversations = await ChatsCollection.find({
      members: { $in: [userId] },
    }).toArray();

    const conversationUserData = await Promise.all(
      conversations.map(async (conversation) => {
        // Find the receiver's ID in the members array
        const receiverId = conversation.members.find(
          (member) => member !== userId
        );

        // Log the receiverId
        console.log("ReceiverId:", receiverId);

        // Convert receiverId to ObjectId
        const receiverObjectId = new ObjectId(receiverId);

        // Log the receiverObjectId
        console.log("ReceiverObjectId:", receiverObjectId);

        // Find the user data using the receiver's ObjectId
        const user = await usersCollection.findOne({ _id: receiverObjectId });

        // Log the user data
        console.log("User Data Of Conversation:", user);

        // Return an object with user information
        return {
          user: {
            email: user?.user_email,
            name: user?.user_fullname,
            receiverId: user?._id,
          },
          conversationId: conversation?._id,
        };
      })
    );

    res.status(200).json(conversationUserData);
    console.log("conversationUserData", conversationUserData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// router.get('/conversations/:userId', async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     console.log('Requested userId:', userId);

//     // Find conversations where the provided userId is in the members array
//     const conversations = await conversationsCollection.find({ members: { $in: [userId] } }).toArray();

//     const conversationUserData = await Promise.all(conversations.map(async (conversation) => {
//       // Find the receiver's ID in the members array
//       const receiverId = conversation.members.find((member) => member !== userId);

//       // Convert receiverId to ObjectId
//       const receiverObjectId = new ObjectId(receiverId);

//       // Find the user data using the receiver's ObjectId
//       const user = await usersCollection.findOne({ _id: receiverObjectId });

//       console.log('User Data:', user);

//       // Return an object with user information
//       return {
//         user: {
//           email: user?.email,
//           name: user?.user_fullname,
//           conversationId: user?._id,
//         },
//       };
//     }));

//     res.status(200).json(conversationUserData);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// const conversationsCollection = client.db("NeighborServe").collection("Chats");
// // const usersCollection = client.db("NeighborServe").collection("userCollection");

// router.get('/conversations/:userId', async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     console.log('Requested userId:', userId);

//     // Convert userId to ObjectId
//     const userIdObjectId = new ObjectId(userId);

//     // Find conversations where the provided userId is in the members array
//     const conversations = await conversationsCollection.find({ members: { $in: [userIdObjectId] } }).toArray();

//     // Fetch user data for each conversation
//     const conversationUserData = await Promise.all(conversations.map(async (conversation) => {
//       if (!conversation || !conversation.members) {
//         console.warn('Invalid conversation object:', conversation);
//         return null;
//       }

//       console.log('Conversation:', conversation);

//       const receiverId = conversation.members.find((member) => member !== userId);

//       if (!receiverId) {
//         console.warn(`ReceiverId not found for conversation: ${conversation._id}`);
//         return null;
//       }

//       const receiverObjectId = new ObjectId(receiverId);
//       console.log('Receiver ObjectId:', receiverObjectId);

//       const user = await usersCollection.findOne({ _id: receiverObjectId });

//       if (!user) {
//         console.warn(`User not found for conversationId: ${receiverObjectId}`);
//         return null;
//       }

//       return { user: { email: user.user_email, name: user.user_fullName, conversationId: receiverObjectId.user_id } };
//     }));

//     // Filter out null values before sending the response
//     const filteredUserData = conversationUserData.filter((data) => data !== null);

//     res.status(200).json(filteredUserData);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

router.post("/message", async (req, res) => {
  try {
    const { conversationId, senderId, message, receiverId = "" } = req.body;
    console.log(conversationId, senderId, message, receiverId);

    console.log("Received request body:", req.body);
    if (!senderId || !message) {
      return res.status(400).send("Please fill all required fields");
    }

    // const msgCollection = client.db("NeighborServe").collection("Messages");
    if (conversationId === "new" && receiverId) {
      const newConversation = await ChatsCollection.insertOne({
        members: [senderId, receiverId],
      });
      console.log("New Conversation", newConversation);

      const newMessage = {
        conversationId: newConversation.insertedId,
        senderId,
        message,
        receiverId,
      };

      await msgCollection.insertOne(newMessage);
      return res.status(200).send("Message sent successfully");
    } else if (!conversationId && !receiverId) {
      return res.status(400).send("Please fill all required fields");
    }

    const newMessage = await msgCollection.insertOne({
      conversationId: new ObjectId(conversationId),
      senderId: new ObjectId(senderId),
      message,
      receiverId: new ObjectId(receiverId),
    });

    res.status(200).json(newMessage); // Return the inserted message
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.get("/message/:conversationId", async (req, res) => {
  try {
    const checkMessage = async (conversationId) => {
      const messages = await msgCollection
        .find({ conversationId: new ObjectId(conversationId) })
        .toArray();

      const messageUserData = await Promise.all(
        messages.map(async (message) => {
          console.log("Fetching user for message:", message);
          console.log("Fetched receiverId:", message?.receiverId);

          const user = await usersCollection.findOne({
            _id: new ObjectId(message?.senderId),
          });

          console.log("Fetching user for message:", message);
          console.log("user:", user);

          return {
            user: {
              id: user._id,
              email: user?.user_email,
              name: user?.user_fullname,
              // Include conversationId,
            },
            message: message?.message,
            conversationId: message?.conversationId,
            receiverId: message?.receiverId,
          };
        })
      );
      res.status(200).json(messageUserData);
    };

    const conversationId = req.params.conversationId;

    // if (!/^[0-9a-fA-F]{24}$/.test(new ObjectId(conversationId))) {
    //   return res.status(400).send("Invalid ObjectId format");
    // }
    if (conversationId === "new") {
      const checkConversation = await ChatsCollection.find({
        members: { $all: [req.query.senderId, req.query.receiverId] },
      }).toArray();
      if (checkConversation.length > 0) {
        checkMessage(checkConversation[0]._id);
      } else {
        return res.status(200).json([]);
      }
    } else {
      checkMessage(conversationId);
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
      return res.status(400).send("Invalid ObjectId format");
    }

    const users = await usersCollection
      .find({ _id: { $ne: userId } })
      .limit(100)
      .toArray();

    // Use Promise.all with map
    const usersData = await Promise.all(
      users.map(async (user) => {
        return {
          user: {
            email: user.user_email,
            name: user.user_fullname,
            receiverId: user._id,
            // Assuming _id is an ObjectId, convert it to a string
          },
          UserId: user._id,
        };
      })
    );

    res.status(200).json(usersData);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
