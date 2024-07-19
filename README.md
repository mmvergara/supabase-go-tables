# Supabase Go Tables

Generate Go structs from your Supabase tables 🚀

## Generate Manually via API

**https://mmvergara.github.io/supabase-go-tables/**

## Generate Using CLI (Recommended)

### Installation

```bash
npm i -g supabase-go-tables
# or use any package manager
```

### Usage

```bash
# run on root folder where .env file is present
npx supabase-go-tables
```

Make sure that `SUPABASE_URL` and `SUPABASE_ANON_KEY` are set in your environment variables

This command will copy the generated Go structs to your clipboard.

### Sample Output

```go
type TableFormat struct {
  profiles string
  products string
}

var Tables = TableFormat{
  profiles: "profiles",
  products: "products",
}

// Then you can do
supabaseClient.From(Tables.profiles).Select("*").Execute()
```
