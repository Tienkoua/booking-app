import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createRoom = async (req,res,next)=>{
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body)

    try {
        const saveRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId,{$push:{rooms:saveRoom._id}})
        } catch (error) {
            next(error)
        }
        res.status(200).json(saveRoom)
    } catch (error) {
        next(error)
    }
}

//UPDATE
export const updateRoom = async (req,res,next) =>{
    try {

        const updatedRoom = await Room.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(updatedRoom)
        
    } catch (error) {
        next(error)
    }
}

export const updateRoomAvailability = async (req,res,next) =>{
    try {

        await Room.updateOne({"roomNumbers._id":req.params.id},
        {
            $push:{
                "roomNumbers.$.unavailableDates":req.body.dates
            }
        })
        res.status(200).json("Room status has been updated")
        
    } catch (error) {
        next(error)
    }
}

//DELETE

export const deleteRoom =async (req,res,next) =>{
    const hotelId = req.params.hotelId;

    try {
          await Room.findByIdAndDelete(req.params.id)

        try {
            await Hotel.findByIdAndUpdate(hotelId,{$pull:{rooms:req.params.id}})
        } catch (error) {
            next(error)
        }

        res.status(200).json("Room has been deleted")
        
    } catch (error) {
       next(error)
    }
}

//GET

export const getRoom = async (req,res,next) =>{
    try {

        const Room = await Room.findById(req.params.id)
        res.status(200).json(Room)
        
    } catch (error) {
        next(error)
    }
}

//GET ALL

export const getAllRooms = async (req,res,next) =>{
    try {

        const Rooms = await Room.find()
        res.status(200).json(Rooms)
        
    } catch (error) {
        next(error)
    }

}