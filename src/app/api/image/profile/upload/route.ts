import 'server-only'
import { NextRequest, NextResponse } from "next/server"
import { prisma } from '../../../../../prismaDB'
import {v4 as uuidv4} from 'uuid'
import formidable from 'formidable'


export async function POST(req){
    const form = new formidable.IncomingForm();
    return
}