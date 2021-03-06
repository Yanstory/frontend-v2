const version = "v3.0.0";

module.exports = {
  version,
  api: {
    submitParams: {
      source: "frontend-v2",
      version
    }
  },
  cdn: {
    cn: "https://penguin.upyun.galvincdn.com",
    global: "https://penguin-stats.s3.amazonaws.com"
  },
  advancedQuery: {
    maxQueries: 5,
  },
  servers: ["CN", "US", "JP", "KR"]
}