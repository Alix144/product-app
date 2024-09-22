import User from "@/lib/models/User";
import Product from "@/lib/models/Product";
import connectToDb from "@/lib/utils";

import { NextResponse } from "next/server";
import mongoose, { Schema, model, models, Types } from "mongoose";

export const GET = async(request, { params }) => {
    const {userId} = params
    try {
        await connectToDb();
        const users = await User.findOne({userId}).populate('cart');
        if(!users){
            return new NextResponse('could not find user', {status: 400,})
        }
        return new NextResponse(JSON.stringify(users), {status: 200})
    } catch (error) {
        return new NextResponse('Error fetching users ' + error.message, {status: 500,})
    }
}