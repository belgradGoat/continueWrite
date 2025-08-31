const fs = require("fs");

const { writeBuildTimestamp } = require("./utils");

const esbuild = require("esbuild");

const flags = process.argv.slice(2);

const esbuildConfig = {
  entryPoints: ["src/extension.ts"],
  bundle: true,
  outfile: "out/extension.js",
  alias: {
    'vitest': './src/stubs/vitest.ts',
    'handlebars': './src/stubs/handlebars.ts',
    'web-tree-sitter': './src/stubs/web-tree-sitter.ts',
    '@continuedev/fetch': './src/stubs/fetch.ts'
  },
  external: [
    "vscode", 
    "esbuild", 
    "./xhr-sync-worker.js",
    // Core dependencies
    "system-ca",
    "@sentry/node",
    "@sentry/core", 
    "yaml",
    "comment-json",
    "dotenv",
    "plist",
    "node-fetch",
    "zod",
    "uuid",
    "winston",
    "web-tree-sitter",
    "js-tiktoken",
    "diff",
    "@continuedev/fetch",
    "@continuedev/config-yaml",
    "@continuedev/config-types",
    "@continuedev/llm-info",
    "@continuedev/openai-adapters",
    "@continuedev/openai-adapters/dist/apis/base",
    "handlebars",
    "vitest",
    "async-mutex",
    "sqlite",
    "sqlite3",
    "quick-lru",
    "@shikijs/transformers",
    "jsdom",
    "shiki",
    "@modelcontextprotocol/sdk/client/index.js",
    "@modelcontextprotocol/sdk/client/auth.js",
    "@modelcontextprotocol/sdk/client/sse.js", 
    "@modelcontextprotocol/sdk/client/stdio.js",
    "@modelcontextprotocol/sdk/client/streamableHttp.js",
    "@modelcontextprotocol/sdk/client/websocket.js",
    "@modelcontextprotocol/sdk/shared/auth.js",
    "@modelcontextprotocol/sdk/shared/transport.js",
    "fastest-levenshtein",
    "lru-cache",
    "dbinfoz",
    "@octokit/rest",
    "axios",
    "is-localhost-ip",
    "@mozilla/readability",
    "node-html-markdown",
    "posthog-node",
    "tar",
    "vectordb",
    "cheerio",
    "puppeteer",
    "puppeteer-chromium-resolver",
    "iconv-lite",
    "workerpool",
    "openai/resources/index",
    "openai/resources.mjs",
    "replicate",
    "@aws-sdk/client-bedrock-runtime",
    "@aws-sdk/credential-providers",
    "socket.io-client",
    "json-schema",
    "@aws-sdk/client-sagemaker-runtime",
    "google-auth-library",
    "partial-json",
    "mac-ca",
    "win-ca",
    "onnxruntime-node",
    "onnxruntime-web",
    "wink-nlp-utils",
    "pg",
    "adf-to-md", 
    "jinja-js",
    "@huggingface/jinja",
    "@jest/globals"
  ],
  format: "cjs",
  platform: "node",
  sourcemap: flags.includes("--sourcemap"),
  loader: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ".node": "file",
  },

  // To allow import.meta.path for transformers.js
  // https://github.com/evanw/esbuild/issues/1492#issuecomment-893144483
  inject: ["./scripts/importMetaUrl.js"],
  define: { "import.meta.url": "importMetaUrl" },
  supported: { "dynamic-import": false },
  metafile: true,
  plugins: [
    {
      name: "on-end-plugin",
      setup(build) {
        build.onEnd((result) => {
          if (result.errors.length > 0) {
            console.error("Build failed with errors:", result.errors);
            throw new Error(result.errors);
          } else {
            try {
              fs.writeFileSync(
                "./build/meta.json",
                JSON.stringify(result.metafile, null, 2),
              );
            } catch (e) {
              console.error("Failed to write esbuild meta file", e);
            }
            console.log("VS Code Extension esbuild complete"); // used verbatim in vscode tasks to detect completion
          }
        });
      },
    },
  ],
};

void (async () => {
  // Create .buildTimestamp.js before starting the first build
  writeBuildTimestamp();
  // Bundles the extension into one file
  if (flags.includes("--watch")) {
    const ctx = await esbuild.context(esbuildConfig);
    await ctx.watch();
  } else if (flags.includes("--notify")) {
    const inFile = esbuildConfig.entryPoints[0];
    const outFile = esbuildConfig.outfile;

    // The watcher automatically notices changes to source files
    // so the only thing it needs to be notified about is if the
    // output file gets removed.
    if (fs.existsSync(outFile)) {
      console.log("VS Code Extension esbuild up to date");
      return;
    }

    fs.watchFile(outFile, (current, previous) => {
      if (current.size > 0) {
        console.log("VS Code Extension esbuild rebuild complete");
        fs.unwatchFile(outFile);
        process.exit(0);
      }
    });

    console.log("Triggering VS Code Extension esbuild rebuild...");
    writeBuildTimestamp();
  } else {
    await esbuild.build(esbuildConfig);
  }
})();
