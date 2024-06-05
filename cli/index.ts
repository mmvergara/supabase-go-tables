#!/usr/bin/env node
import shell from "shelljs";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const { SUPABASE_URL, SUPABASE_ANON_KEY } = process.env;

// Check if required environment variables are set
if (!SUPABASE_URL) {
  console.error("SUPABASE_URL is missing in .env file");
  process.exit(1);
}
if (!SUPABASE_ANON_KEY) {
  console.error("SUPABASE_ANON_KEY is missing in .env file");
  process.exit(1);
}

const main = async () => {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/?apikey=${SUPABASE_ANON_KEY}`
    );

    if (res.ok) {
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/openapi+json")) {
        const data = await res.json();

        if (data.definitions) {
          // Generate TableFormat struct
          let tablesStruct = "type TableFormat struct {\n";
          Object.keys(data.definitions).forEach((key) => {
            tablesStruct += `${key} string\n`;
          });
          tablesStruct += "}\n\n";

          // Generate Tables map
          let tablesMap = "var Tables = TableFormat{\n";
          Object.keys(data.definitions).forEach((key) => {
            tablesMap += `${key}: "${key}",\n`;
          });
          tablesMap += "}\n";
          const TableStructs = String(tablesStruct + tablesMap).trim();
          copyToClipboard(TableStructs);
        } else {
          console.error("No definitions found in the response");
        }
      } else {
        console.error("Invalid link");
      }
    } else {
      console.error("Error fetching data");
    }
  } catch (error) {
    console.error("Error occurred", error);
  }
};

const copyToClipboard = (text: string) => {
  if (shell.which("pbcopy")) {
    // macOS
    console.log("=== Definitions copied to clipboard ===");
    shell.echo(text).exec("pbcopy");
  } else if (shell.which("xclip")) {
    // Linux
    console.log("=== Definitions copied to clipboard ===");
    shell.echo(text).exec("xclip -selection clipboard");
  } else if (shell.which("clip")) {
    // Windows
    console.log("=== Definitions copied to clipboard ===");
    shell.echo(text).exec("clip");
  } else {
    console.log(
      "No clipboard command found. Please copy the structs manually."
    );
    console.log(text);
  }
};

main();
