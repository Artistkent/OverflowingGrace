import { NextRequest, NextResponse } from 'next/server';
 

const storedCredentials = {
  username: process.env.NEXT_PUBLIC_FIREBASE_APP_ADMIN_USERNAME,
  password: process.env.NEXT_PUBLIC_FIREBASE_APP_ADMIN_PASSWORD
};

const signIn = (providedCredentials: {  username?: string; password: string}) => {
  const { username, password } = providedCredentials;

  if (username === storedCredentials.username && password === storedCredentials.password) {
    console.log("Sign in successful!");
    return true;
  } else {
    console.log("Invalid username or password.");
    return false;
  }

    }


export async function POST(req: NextRequest){
  try {
    const { username, password } = await req.json()
    const isSignedIn = signIn({ username, password })
    
    if (isSignedIn) {
      return NextResponse.json({ success: true }, { status: 200 })
    } else {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 })
    }
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}