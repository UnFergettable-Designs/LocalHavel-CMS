package config

type Config struct {
	RootPath      string
	ChunkSizeKB   int
	MaxStorageGB  int64
	MaxFileSizeMB int64
	CacheTTLHours int
}

func NewConfig() *Config {
	return &Config{
		RootPath:      "./data",
		ChunkSizeKB:   512,
		MaxStorageGB:  10,
		MaxFileSizeMB: 100,
		CacheTTLHours: 24,
	}
}
