import { create } from 'zustand'

const useBookingStore = create((set, get) => ({
  // Booking state
  booking: null,
  isBooking: false,
  error: null,

  // Generate booking reference
  generateBookingRef: () => {
    return 'BK' + Date.now().toString(36).toUpperCase().slice(0, 8) + Math.random().toString(36).substr(2, 4).toUpperCase()
  },

  // Book a seat
  bookSeat: async (seatData) => {
    set({ isBooking: true, error: null })

    try {
      // In a real app, this would call Supabase
      // For now, simulate success
      await new Promise(resolve => setTimeout(resolve, 500))

      const booking = {
        id: get().generateBookingRef(),
        seat: seatData,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        gate: get().assignGate(seatData.block)
      }

      set({ booking, isBooking: false })
      return booking
    } catch (error) {
      set({ error: error.message, isBooking: false })
      throw error
    }
  },

  // Assign gate based on block
  assignGate: (block) => {
    const gateMap = {
      'A': 'A', 'B': 'A', 'C': 'B', 'D': 'B',
      'E': 'C', 'F': 'C', 'G': 'D', 'H': 'D',
      'I': 'E', 'J': 'E', 'K': 'F', 'L': 'F',
      'M': 'G', 'N': 'G', 'O': 'H', 'P': 'H'
    }
    return gateMap[block] || 'A'
  },

  // Cancel booking
  cancelBooking: () => {
    set({ booking: null })
  },

  // Clear error
  clearError: () => set({ error: null })
}))

export default useBookingStore