import { create } from 'zustand'

const useStadiumStore = create((set, get) => ({
  // Stadium data
  stadium: {
    id: 'omnya-lab',
    name: 'Omnya Lab Stadium',
    capacity: 100000,
    stands: ['North', 'South', 'East', 'West']
  },

  // Seating data
  tiers: ['Upper', 'Middle', 'Lower'],

  blocks: {
    North: ['A', 'B', 'C', 'D'],
    South: ['E', 'F', 'G', 'H'],
    East: ['I', 'J', 'K', 'L'],
    West: ['M', 'N', 'O', 'P']
  },

  // Seat metadata
  selectedStand: null,
  selectedTier: null,
  selectedBlock: null,
  selectedRow: null,
  selectedSeat: null,

  // All seats data (generated procedurally)
  seats: {},

  // Generate seats data
  generateSeats: () => {
    const { stands, tiers, blocks } = get()
    const seats = {}

    stands.forEach(stand => {
      tiers.forEach((tier, tierIdx) => {
        const standBlocks = blocks[stand] || []
        standBlocks.forEach((block, blockIdx) => {
          // Rows vary by tier
          const rowCount = tier === 'Lower' ? 30 : tier === 'Middle' ? 25 : 20
          for (let row = 1; row <= rowCount; row++) {
            // Seats per row vary
            const seatsPerRowStart = tier === 'Lower' ? 80 : tier === 'Middle' ? 60 : 40
            const seatsPerRow = seatsPerRowStart + (row % 10) * 2
            const rowId = `${block}${row.toString().padStart(2, '0')}`

            seats[rowId] = {}
            for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
              // Base price varies by tier
              const basePrice = tier === 'Lower' ? 80 : tier === 'Middle' ? 120 : 200
              // Add premium for certain seats
              const isPremium = seatNum % 10 === 0 || seatNum === seatsPerRow
              const price = isPremium ? basePrice * 1.5 : basePrice

              // Random availability (70% available, 20% reserved, 10% sold)
              const rand = Math.random()
              const status = rand < 0.7 ? 'available' : rand < 0.9 ? 'reserved' : 'sold'

              seats[rowId][seatNum] = {
                id: `${stand}-${tier}-${block}-${row}-${seatNum}`,
                stand,
                tier,
                block,
                row,
                seat: seatNum,
                price,
                status,
                isPremium,
                x: 0, // Will be calculated during geometry setup
                y: 0,
                z: 0
              }
            }
          }
        })
      })
    })

    set({ seats })
    return seats
  },

  // Selection actions
  selectStand: (stand) => set({ selectedStand: stand }),
  selectTier: (tier) => set({ selectedTier: tier }),
  selectBlock: (block) => set({ selectedBlock: block }),
  selectRow: (row) => set({ selectedRow: row }),
  selectSeat: (seat) => set({ selectedSeat: seat }),

  // Reset selection
  resetSelection: () => set({
    selectedStand: null,
    selectedTier: null,
    selectedBlock: null,
    selectedRow: null,
    selectedSeat: null
  }),

  // Get available blocks for selected stand
  getAvailableBlocks: () => {
    const { selectedStand, blocks } = get()
    return selectedStand ? blocks[selectedStand] || [] : []
  },

  // Get available rows for selected block
  getAvailableRows: () => {
    const { seats, selectedStand, selectedTier, selectedBlock } = get()
    const blocks = get().blocks
    const results = []

    if (!selectedBlock) return results

    Object.keys(seats).forEach(rowId => {
      if (rowId.startsWith(selectedBlock)) {
        const rowSeats = seats[rowId]
        const hasAvailable = Object.values(rowSeats).some(s => s.status === 'available')
        if (hasAvailable) {
          const rowNum = parseInt(rowId.replace(selectedBlock, ''))
          results.push(rowNum)
        }
      }
    })

    return results.sort((a, b) => a - b)
  },

  // Get available seats in a row
  getAvailableSeats: (row) => {
    const { seats, selectedBlock } = get()
    const rowId = `${selectedBlock}${row.toString().padStart(2, '0')}`
    const rowSeats = seats[rowId] || {}

    return Object.entries(rowSeats)
      .filter(([_, seat]) => seat.status === 'available')
      .map(([num, seat]) => ({ num: parseInt(num), ...seat }))
  },

  // Select a seat
  selectSeatAction: (row, seatNum) => {
    const { seats } = get()
    const rowId = `${get().selectedBlock}${row.toString().padStart(2, '0')}`
    if (seats[rowId] && seats[rowId][seatNum]) {
      set({ selectedSeat: seatNum, selectedRow: row })
    }
  }
}))

export default useStadiumStore