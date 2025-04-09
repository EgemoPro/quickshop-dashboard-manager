import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"

// Types
export interface Follower {
  id: string
  name: string
  email: string
  avatar: string
  followDate: string
  lastActiveDate: string
  lastActive: number // days
  daysFollowing: number
  isVIP: boolean
  tags: string[]
}

interface FollowersState {
  followers: Follower[]
  filteredFollowers: Follower[]
  selectedFollowers: string[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
  stats: {
    total: number
    growthRate: number
    newFollowers: number
    newFollowersChange: number
    unfollows: number
    unfollowsChange: number
    engagementRate: number
    engagementChange: number
  }
}

// Initial state
const initialState: FollowersState = {
  followers: [],
  filteredFollowers: [],
  selectedFollowers: [],
  status: "idle",
  error: null,
  stats: {
    total: 0,
    growthRate: 0,
    newFollowers: 0,
    newFollowersChange: 0,
    unfollows: 0,
    unfollowsChange: 0,
    engagementRate: 0,
    engagementChange: 0,
  },
}

// Mock data generator
const generateMockFollowers = (): Follower[] => {
  const followers: Follower[] = []
  const names = [
    "Sophie Martin",
    "Thomas Bernard",
    "Emma Dubois",
    "Lucas Petit",
    "Chloé Leroy",
    "Hugo Moreau",
    "Léa Roux",
    "Jules Fournier",
    "Manon Simon",
    "Nathan Michel",
  ]

  for (let i = 0; i < 50; i++) {
    const randomName = names[Math.floor(Math.random() * names.length)]
    const daysFollowing = Math.floor(Math.random() * 365)
    const lastActive = Math.floor(Math.random() * 60)
    const isVIP = Math.random() > 0.8

    const follower: Follower = {
      id: `follower-${i}`,
      name: randomName,
      email: randomName.toLowerCase().replace(" ", ".") + "@example.com",
      avatar: `/placeholder.svg?height=40&width=40`,
      followDate: new Date(Date.now() - daysFollowing * 24 * 60 * 60 * 1000).toISOString(),
      lastActiveDate: new Date(Date.now() - lastActive * 24 * 60 * 60 * 1000).toISOString(),
      lastActive,
      daysFollowing,
      isVIP,
      tags: isVIP ? ["VIP"] : [],
    }

    followers.push(follower)
  }

  return followers
}

// Async thunks
export const fetchFollowers = createAsyncThunk(
  "followers/fetchFollowers",
  async ({ filter, page, perPage }: { filter: string; page: number; perPage: number }) => {
    // In a real app, this would be an API call
    return new Promise<Follower[]>((resolve) => {
      setTimeout(() => {
        resolve(generateMockFollowers())
      }, 500)
    })
  },
)

export const searchFollowers = createAsyncThunk(
  "followers/searchFollowers",
  async ({ term, filters }: { term: string; filters: any }) => {
    // In a real app, this would be an API call
    return new Promise<Follower[]>((resolve) => {
      setTimeout(() => {
        const followers = generateMockFollowers()
        const filtered = followers.filter((follower) => {
          const matchesTerm =
            term === "" ||
            follower.name.toLowerCase().includes(term.toLowerCase()) ||
            follower.email.toLowerCase().includes(term.toLowerCase())

          const matchesType = (filters.showVIP && follower.isVIP) || (filters.showRegular && !follower.isVIP)

          const matchesDateRange = (() => {
            if (filters.dateRange === "all") return true
            if (filters.dateRange === "lastMonth") return follower.daysFollowing <= 30
            if (filters.dateRange === "last3Months") return follower.daysFollowing <= 90
            if (filters.dateRange === "lastYear") return follower.daysFollowing <= 365
            return true
          })()

          return matchesTerm && matchesType && matchesDateRange
        })
        resolve(filtered)
      }, 500)
    })
  },
)

export const exportFollowers = createAsyncThunk("followers/exportFollowers", async (followerIds: string[]) => {
  // In a real app, this would generate a CSV or Excel file
  console.log("Exporting followers:", followerIds)
  return true
})

export const removeFollowers = createAsyncThunk("followers/removeFollowers", async (followerIds: string[]) => {
  // In a real app, this would be an API call
  return new Promise<string[]>((resolve) => {
    setTimeout(() => {
      resolve(followerIds)
    }, 500)
  })
})

export const tagFollowers = createAsyncThunk(
  "followers/tagFollowers",
  async ({ followerIds, tag }: { followerIds: string[]; tag: string }) => {
    // In a real app, this would be an API call
    return new Promise<{ followerIds: string[]; tag: string }>((resolve) => {
      setTimeout(() => {
        resolve({ followerIds, tag })
      }, 500)
    })
  },
)

export const messageFollowers = createAsyncThunk(
  "followers/messageFollowers",
  async ({ followerIds, subject, content }: { followerIds: string[]; subject: string; content: string }) => {
    // In a real app, this would be an API call
    console.log("Sending message to followers:", followerIds, subject, content)
    return true
  },
)

// Slice
const followersSlice = createSlice({
  name: "followers",
  initialState,
  reducers: {
    toggleSelectFollower: (state, action: PayloadAction<{ id: string; selected: boolean }>) => {
      const { id, selected } = action.payload
      if (selected) {
        state.selectedFollowers.push(id)
      } else {
        state.selectedFollowers = state.selectedFollowers.filter((followerId) => followerId !== id)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFollowers.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchFollowers.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.followers = action.payload
        state.filteredFollowers = action.payload

        // Calculate stats
        state.stats = {
          total: action.payload.length,
          growthRate: 12.5, // Mock data
          newFollowers: Math.floor(action.payload.length * 0.2),
          newFollowersChange: 8.3,
          unfollows: Math.floor(action.payload.length * 0.05),
          unfollowsChange: -3.2,
          engagementRate: 24.7,
          engagementChange: 5.9,
        }
      })
      .addCase(fetchFollowers.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Une erreur est survenue"
      })
      .addCase(searchFollowers.fulfilled, (state, action) => {
        state.filteredFollowers = action.payload
      })
      .addCase(removeFollowers.fulfilled, (state, action) => {
        state.followers = state.followers.filter((follower) => !action.payload.includes(follower.id))
        state.filteredFollowers = state.filteredFollowers.filter((follower) => !action.payload.includes(follower.id))
        state.selectedFollowers = []

        // Update stats
        state.stats.total = state.followers.length
      })
      .addCase(tagFollowers.fulfilled, (state, action) => {
        const { followerIds, tag } = action.payload
        state.followers = state.followers.map((follower) => {
          if (followerIds.includes(follower.id)) {
            return {
              ...follower,
              tags: follower.tags.includes(tag) ? follower.tags : [...follower.tags, tag],
            }
          }
          return follower
        })
        state.filteredFollowers = state.filteredFollowers.map((follower) => {
          if (followerIds.includes(follower.id)) {
            return {
              ...follower,
              tags: follower.tags.includes(tag) ? follower.tags : [...follower.tags, tag],
            }
          }
          return follower
        })
      })
  },
})

// Selectors
export const selectFollowers = (state: RootState) => state.followers

// Actions
export const { toggleSelectFollower } = followersSlice.actions

// Reducer
export default followersSlice.reducer

