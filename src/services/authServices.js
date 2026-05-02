import { supabase } from '../lib/supabaseClient'

// Kreye compte
export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })

  if (error) throw error
  return data
}

// Login
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) throw error
  return data
}

// Logout
export const signOut = async () => {
  await supabase.auth.signOut()
}