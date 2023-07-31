import 'server-only'
import { NextRequest, NextResponse } from "next/server"
import { prisma } from '../../../../../prismaDB'
import {v4 as uuidv4} from 'uuid'
import formidable from 'formidable'


export async function POST(req){
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        if (err) return NextResponse.json({message:"error in uploading"},{status:400})
    }
}