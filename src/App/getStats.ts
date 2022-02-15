import getItem from "./getItem";

const stats: {
  played: number
  wins: number
  maxStreak: number
  curStreak: number
  dist: number[]
} = getItem("stats",  {
  played: 0,
  wins: 0,
  maxStreak: 0,
  curStreak: 0,
  dist: [0,0,0,0,0,0]
});

export default stats;