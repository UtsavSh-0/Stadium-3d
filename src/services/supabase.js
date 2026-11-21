import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
// Replace with your actual Supabase URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database tables structure (for reference):
/*
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Stadiums table
CREATE TABLE stadiums (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  capacity INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Stands table
CREATE TABLE stands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stadium_id UUID REFERENCES stadiums(id),
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blocks table
CREATE TABLE blocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stand_id UUID REFERENCES stands(id),
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seats table
CREATE TABLE seats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  block_id UUID REFERENCES blocks(id),
  row_number INTEGER NOT NULL,
  seat_number INTEGER NOT NULL,
  status TEXT CHECK (status IN ('available', 'selected', 'reserved', 'sold')),
  price DECIMAL(10, 2),
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seat_id UUID REFERENCES seats(id),
  user_id UUID REFERENCES users(id),
  booking_ref TEXT UNIQUE NOT NULL,
  status TEXT CHECK (status IN ('confirmed', 'cancelled', 'expired')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME_ZONE
);

-- VIP upgrades table
CREATE TABLE vip_upgrades (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES bookings(id),
  upgrade_type TEXT NOT NULL,
  price DECIMAL(10, 2),
  status TEXT CHECK (status IN ('confirmed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
*/

// Seat selection operations
export const selectSeat = async (seatId, userId = null) => {
  const { data, error } = await supabase
    .from('seats')
    .update({ status: 'selected' })
    .eq('id', seatId)
    .eq('status', 'available')
    .single()

  if (error) throw error
  return data
}

export const bookSeat = async (seatId, userId = null) => {
  const bookingRef = 'BK' + Date.now().toString(36).toUpperCase().slice(0, 8)

  const { data, error } = await supabase.rpc('create_booking', {
    p_seat_id: seatId,
    p_user_id: userId,
    p_booking_ref: bookingRef
  })

  if (error) throw error
  return data
}

// Export for use in components
export default supabase