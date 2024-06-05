# Supabase Go Tables

Generate Go structs from your Supabase tables

[![NPM Version](https://img.shields.io/npm/v/supabase-go-tables?logo=npm&labelColor=cb0000&color=black)](https://www.npmjs.com/package/supabase-go-tables)
![npm bundle size](https://img.shields.io/bundlephobia/min/supabase-go-tables?label=BundlePhobia&labelColor=blackn&color=green)

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
