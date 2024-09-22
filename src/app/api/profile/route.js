import User from "@/lib/models/User";
import Product from "@/lib/models/Product";
import { authOptions } from "@/lib/nextAuth";
import connectToDb from "@/lib/utils";
import { connect } from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import mongoose, { Schema, model, models, Types } from "mongoose";

export const GET = async() => {
    try {
        await connectToDb();
        const users = await User.find();
        return new NextResponse(JSON.stringify(users), {status: 200})
    } catch (error) {
        return new NextResponse('Error fetching users ' + error.message, {status: 500,})
    }
}
console.log("");
// export const PATCH = async (request) => {
//     try {
//         const body = await request.json();
//         const {userId, newUsername } = body;

//         await connect();
//         if(!userId || !newUsername){
//             return new NextResponse(
//                 JSON.stringify({ message: 'id or new username is required'}), {status: 400},
//             )
//         }
//         if(!Types.ObjectId.isValid(userId)){
//             return new NextResponse(
//                 JSON.stringify({ message: 'invalied user id'}), {status: 400},
//             )
//         }

//         const updatedUser = await User.findOneAndUpdate({_id: new ObjectId(userId)}, {username: newUsername}, {new: true})

//         if(!updatedUser)
//         return new NextResponse(
//             JSON.stringify({message: 'User not found'}), {status: 400}
//         )

//         return new NextResponse(
//             JSON.stringify({message: 'User is updated', user: updatedUser}), {status: 200}
//         )
//     } catch (error) {
//         return new NextResponse(
//             JSON.stringify({message: 'error in catch block ' + error.message,}), {status: 500}
//         )
//     }
// }
console.log('')
// export const DELETE = async (request) => {
//   try {
//     const { searchParams } = new URL(request.url);
//     const userId = searchParams.get("userId");

//     if (!userId) {
//       return new NextResponse(JSON.stringify({ message: "id is required" }), {
//         status: 400,
//       });
//     }
//     if (!Types.ObjectId.isValid(userId)) {
//       return new NextResponse(JSON.stringify({ message: "invalied user id" }), {
//         status: 400,
//       });
//     }

//     await connect();

//     const deletedUser = await User.findByIdAndDelete(
//       new Types.ObjectId(userId)
//     );

//     if (!deletedUser) {
//       return new NextResponse(JSON.stringify({ message: "user not found" }), {
//         status: 400,
//       });
//     }

//     return new NextResponse(JSON.stringify({ message: "user deleted" }), {
//       status: 200,
//     });
//   } catch (error) {
//     return new NextResponse(
//       JSON.stringify({ message: "error deleting user" }),
//       { status: 400 }
//     );
//   }
// };
console.log('')
// export const POST = async (request) => {
//   try {
//     const body = await request.json();
//     await connectToDb();
//     const newUser = new User(body);
//     await newUser.save();
//     return new NextResponse(
//       JSON.stringify({ message: "user is created", user: newUser }),
//       { status: 200 }
//     );
//   } catch (error) {
//     return new NextResponse(
//       JSON.stringify({ message: "error creating user" + error.message }),
//       { status: 500 }
//     );
//   }
// };
console.log('')

const ObjectId = require("mongoose").Types.ObjectId;

export const PATCH = async (request) => {
    try {
        const body = await request.json();
        const {userId, newUsername } = body;

        await connectToDb();
        if(!userId || !newUsername){
            return new NextResponse(
                JSON.stringify({ message: 'id or new username is required'}), {status: 400},
            )
        }
        if(!Types.ObjectId.isValid(userId)){
            return new NextResponse(
                JSON.stringify({ message: 'invalied user id'}), {status: 400},
            )
        }

        const updatedUser = await User.findOneAndUpdate({_id: new ObjectId(userId)}, {name: newUsername}, {new: true})

        if(!updatedUser)
        return new NextResponse(
            JSON.stringify({message: 'User not found'}), {status: 400}
        )

        return new NextResponse(
            JSON.stringify({message: 'User is updated', user: updatedUser}), {status: 200}
        )
    } catch (error) {
        return new NextResponse(
            JSON.stringify({message: 'error in catch block ' + error.message,}), {status: 500}
        )
    }
}