import { NextRequest, NextResponse } from 'next/server'
import React from 'react'

export default function middleware(req:NextRequest) {
    const pathname = req.nextUrl.pathname

    const token = req.cookies.get("JWT")?.value


    if(token && req.nextUrl.pathname.startsWith('/Signin') ){

        return NextResponse.redirect(new URL('/' , req.url))

    }

    
    if(token && req.nextUrl.pathname.startsWith('/Signup') ){

        return NextResponse.redirect(new URL('/' , req.url))

    }
    if (pathname === '/') {
        return NextResponse.redirect(new URL('/dashboard' , req.url))
      }
    

    
    

}
