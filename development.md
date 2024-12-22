# Development Guidelines

## Code Style & Standards

### Go Code Style

1. **Project Structure**
```go
project/
  ├── cmd/                    // Command line tools
  ├── internal/               // Private application code
  ├── pkg/                    // Public library code
  ├── api/                    // API definitions
  └── web/                    // Frontend application
```

2. **Naming Conventions**
```go
// Use meaningful names
func ProcessAsset(asset *Asset) error {}     // Good
func Process(a *Asset) error {}              // Bad

// Interface names
type Reader interface {}                     // Good
type ReaderInterface interface {}            // Bad

// Error variables
var ErrInvalidAsset = errors.New("invalid asset")  // Good
var invalidAsset = errors.New("invalid asset")      // Bad
```

3. **Error Handling**
```go
// Wrap errors with context
if err := processFile(file); err != nil {
    return fmt.Errorf("processing file %s: %w", file.Name, err)
}

// Use custom error types for specific cases
type ValidationError struct {
    Field string
    Reason string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("%s: %s", e.Field, e.Reason)
}
```

### Frontend Code Style

1. **Component Structure**
```typescript
// Single responsibility principle
const AssetUploader = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);

    const handleUpload = async () => {
        setUploading(true);
        try {
            await uploadFiles(files);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="uploader">
            <FileInput onChange={setFiles} />
            <UploadButton 
                onClick={handleUpload} 
                disabled={uploading} 
            />
        </div>
    );
};
```

2. **State Management**
```typescript
// Use appropriate state management
const useAssetStore = create((set) => ({
    assets: [],
    loading: false,
    error: null,
    fetchAssets: async () => {
        set({ loading: true });
        try {
            const assets = await api.getAssets();
            set({ assets, loading: false });
        } catch (error) {
            set({ error, loading: false });
        }
    },
}));
```

## Testing Guidelines

### Unit Testing
```go
func TestAssetProcessor_Process(t *testing.T) {
    tests := []struct {
        name    string
        input   Asset
        want    ProcessedAsset
        wantErr bool
    }{
        {
            name: "valid asset",
            input: Asset{ID: "1", Type: "image"},
            want: ProcessedAsset{ID: "1", Status: "processed"},
            wantErr: false,
        },
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            processor := NewAssetProcessor()
            got, err := processor.Process(tt.input)
            
            if (err != nil) != tt.wantErr {
                t.Errorf("Process() error = %v, wantErr %v", err, tt.wantErr)
                return
            }
            
            if !reflect.DeepEqual(got, tt.want) {
                t.Errorf("Process() = %v, want %v", got, tt.want)
            }
        })
    }
}
```

### Integration Testing
```go
func TestAssetAPI_Integration(t *testing.T) {
    if testing.Short() {
        t.Skip("skipping integration test")
    }

    // Setup test environment
    api := setupTestAPI(t)
    defer cleanupTestAPI(t, api)

    // Run tests
    t.Run("upload and process asset", func(t *testing.T) {
        // Test implementation
    })
}
```

## Git Workflow

1. **Branch Naming**
```bash
feature/add-asset-processing
bugfix/fix-upload-error
refactor/improve-error-handling
docs/update-api-docs
```

2. **Commit Messages**
```bash
# Format
<type>(<scope>): <description>

# Examples
feat(upload): add progress tracking for large files
fix(auth): resolve token refresh loop
docs(api): update webhook documentation
test(processor): add unit tests for asset processor
```

3. **Pull Request Process**
- Create feature branch from `develop`
- Keep changes focused and atomic
- Update documentation
- Add tests
- Request review from team members

## Code Review Guidelines

### Reviewer Responsibilities
1. Code Quality
   - Readability
   - Maintainability
   - Performance
   - Security

2. Implementation
   - Correctness
   - Edge cases
   - Error handling
   - Testing coverage

3. Documentation
   - Code comments
   - API documentation
   - Update changelog

### Author Responsibilities
1. Before Review
   - Self-review changes
   - Run tests locally
   - Update documentation
   - Check style compliance

2. During Review
   - Respond to comments promptly
   - Explain complex changes
   - Be open to feedback

3. After Review
   - Address all comments
   - Request re-review if needed
   - Update related tickets
