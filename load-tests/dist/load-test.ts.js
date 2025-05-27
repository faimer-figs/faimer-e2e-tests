var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/dotenv/package.json
var require_package = __commonJS({
  "node_modules/dotenv/package.json"(exports2, module2) {
    module2.exports = {
      name: "dotenv",
      version: "16.3.1",
      description: "Loads environment variables from .env file",
      main: "lib/main.js",
      types: "lib/main.d.ts",
      exports: {
        ".": {
          types: "./lib/main.d.ts",
          require: "./lib/main.js",
          default: "./lib/main.js"
        },
        "./config": "./config.js",
        "./config.js": "./config.js",
        "./lib/env-options": "./lib/env-options.js",
        "./lib/env-options.js": "./lib/env-options.js",
        "./lib/cli-options": "./lib/cli-options.js",
        "./lib/cli-options.js": "./lib/cli-options.js",
        "./package.json": "./package.json"
      },
      scripts: {
        "dts-check": "tsc --project tests/types/tsconfig.json",
        lint: "standard",
        "lint-readme": "standard-markdown",
        pretest: "npm run lint && npm run dts-check",
        test: "tap tests/*.js --100 -Rspec",
        prerelease: "npm test",
        release: "standard-version"
      },
      repository: {
        type: "git",
        url: "git://github.com/motdotla/dotenv.git"
      },
      funding: "https://github.com/motdotla/dotenv?sponsor=1",
      keywords: [
        "dotenv",
        "env",
        ".env",
        "environment",
        "variables",
        "config",
        "settings"
      ],
      readmeFilename: "README.md",
      license: "BSD-2-Clause",
      devDependencies: {
        "@definitelytyped/dtslint": "^0.0.133",
        "@types/node": "^18.11.3",
        decache: "^4.6.1",
        sinon: "^14.0.1",
        standard: "^17.0.0",
        "standard-markdown": "^7.1.0",
        "standard-version": "^9.5.0",
        tap: "^16.3.0",
        tar: "^6.1.11",
        typescript: "^4.8.4"
      },
      engines: {
        node: ">=12"
      },
      browser: {
        fs: false
      }
    };
  }
});

// node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/dotenv/lib/main.js"(exports2, module2) {
    var fs = require("fs");
    var path = require("path");
    var os = require("os");
    var crypto = require("crypto");
    var packageJson = require_package();
    var version = packageJson.version;
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match;
      while ((match = LINE.exec(lines)) != null) {
        const key = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    function _parseVault(options) {
      const vaultPath = _vaultPath(options);
      const result = DotenvModule.configDotenv({ path: vaultPath });
      if (!result.parsed) {
        throw new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`);
      }
      const keys = _dotenvKey(options).split(",");
      const length = keys.length;
      let decrypted;
      for (let i = 0; i < length; i++) {
        try {
          const key = keys[i].trim();
          const attrs = _instructions(result, key);
          decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key);
          break;
        } catch (error) {
          if (i + 1 >= length) {
            throw error;
          }
        }
      }
      return DotenvModule.parse(decrypted);
    }
    function _log(message) {
      console.log(`[dotenv@${version}][INFO] ${message}`);
    }
    function _warn(message) {
      console.log(`[dotenv@${version}][WARN] ${message}`);
    }
    function _debug(message) {
      console.log(`[dotenv@${version}][DEBUG] ${message}`);
    }
    function _dotenvKey(options) {
      if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
        return options.DOTENV_KEY;
      }
      if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
        return process.env.DOTENV_KEY;
      }
      return "";
    }
    function _instructions(result, dotenvKey) {
      let uri;
      try {
        uri = new URL(dotenvKey);
      } catch (error) {
        if (error.code === "ERR_INVALID_URL") {
          throw new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenv.org/vault/.env.vault?environment=development");
        }
        throw error;
      }
      const key = uri.password;
      if (!key) {
        throw new Error("INVALID_DOTENV_KEY: Missing key part");
      }
      const environment = uri.searchParams.get("environment");
      if (!environment) {
        throw new Error("INVALID_DOTENV_KEY: Missing environment part");
      }
      const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`;
      const ciphertext = result.parsed[environmentKey];
      if (!ciphertext) {
        throw new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`);
      }
      return { ciphertext, key };
    }
    function _vaultPath(options) {
      let dotenvPath = path.resolve(process.cwd(), ".env");
      if (options && options.path && options.path.length > 0) {
        dotenvPath = options.path;
      }
      return dotenvPath.endsWith(".vault") ? dotenvPath : `${dotenvPath}.vault`;
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path.join(os.homedir(), envPath.slice(1)) : envPath;
    }
    function _configVault(options) {
      _log("Loading env from encrypted .env.vault");
      const parsed = DotenvModule._parseVault(options);
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsed, options);
      return { parsed };
    }
    function configDotenv(options) {
      let dotenvPath = path.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      const debug = Boolean(options && options.debug);
      if (options) {
        if (options.path != null) {
          dotenvPath = _resolveHome(options.path);
        }
        if (options.encoding != null) {
          encoding = options.encoding;
        }
      }
      try {
        const parsed = DotenvModule.parse(fs.readFileSync(dotenvPath, { encoding }));
        let processEnv = process.env;
        if (options && options.processEnv != null) {
          processEnv = options.processEnv;
        }
        DotenvModule.populate(processEnv, parsed, options);
        return { parsed };
      } catch (e) {
        if (debug) {
          _debug(`Failed to load ${dotenvPath} ${e.message}`);
        }
        return { error: e };
      }
    }
    function config3(options) {
      const vaultPath = _vaultPath(options);
      if (_dotenvKey(options).length === 0) {
        return DotenvModule.configDotenv(options);
      }
      if (!fs.existsSync(vaultPath)) {
        _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`);
        return DotenvModule.configDotenv(options);
      }
      return DotenvModule._configVault(options);
    }
    function decrypt(encrypted, keyStr) {
      const key = Buffer.from(keyStr.slice(-64), "hex");
      let ciphertext = Buffer.from(encrypted, "base64");
      const nonce = ciphertext.slice(0, 12);
      const authTag = ciphertext.slice(-16);
      ciphertext = ciphertext.slice(12, -16);
      try {
        const aesgcm = crypto.createDecipheriv("aes-256-gcm", key, nonce);
        aesgcm.setAuthTag(authTag);
        return `${aesgcm.update(ciphertext)}${aesgcm.final()}`;
      } catch (error) {
        const isRange = error instanceof RangeError;
        const invalidKeyLength = error.message === "Invalid key length";
        const decryptionFailed = error.message === "Unsupported state or unable to authenticate data";
        if (isRange || invalidKeyLength) {
          const msg = "INVALID_DOTENV_KEY: It must be 64 characters long (or more)";
          throw new Error(msg);
        } else if (decryptionFailed) {
          const msg = "DECRYPTION_FAILED: Please check your DOTENV_KEY";
          throw new Error(msg);
        } else {
          console.error("Error: ", error.code);
          console.error("Error: ", error.message);
          throw error;
        }
      }
    }
    function populate(processEnv, parsed, options = {}) {
      const debug = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      if (typeof parsed !== "object") {
        throw new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
      }
      for (const key of Object.keys(parsed)) {
        if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
          if (override === true) {
            processEnv[key] = parsed[key];
          }
          if (debug) {
            if (override === true) {
              _debug(`"${key}" is already defined and WAS overwritten`);
            } else {
              _debug(`"${key}" is already defined and was NOT overwritten`);
            }
          }
        } else {
          processEnv[key] = parsed[key];
        }
      }
    }
    var DotenvModule = {
      configDotenv,
      _configVault,
      _parseVault,
      config: config3,
      decrypt,
      parse,
      populate
    };
    module2.exports.configDotenv = DotenvModule.configDotenv;
    module2.exports._configVault = DotenvModule._configVault;
    module2.exports._parseVault = DotenvModule._parseVault;
    module2.exports.config = DotenvModule.config;
    module2.exports.decrypt = DotenvModule.decrypt;
    module2.exports.parse = DotenvModule.parse;
    module2.exports.populate = DotenvModule.populate;
    module2.exports = DotenvModule;
  }
});

// load-tests/load-test.ts
var load_test_exports = {};
__export(load_test_exports, {
  config: () => config2,
  scenarios: () => scenarios
});
module.exports = __toCommonJS(load_test_exports);

// e2e/utils/configs/globalSetup.ts
var dotenv = __toESM(require_main());
var import_test = require("@playwright/test");
dotenv.config();
var O3_URL = `${process.env.TEST_ENVIRONMENT}` == "qa" ? `${process.env.O3_URL_QA}` : `${process.env.O3_URL_DEV}`;
var KEYCLOAK_URL = `${process.env.TEST_ENVIRONMENT}` == "qa" ? `${process.env.KEYCLOAK_URL_QA}` : `${process.env.KEYCLOAK_URL_DEV}`;
var api = async ({ playwright }, use) => {
  const ctx = await playwright.request.newContext({
    baseURL: `${process.env.O3_URL_DEV}/ws/rest/v1/`,
    httpCredentials: {
      username: process.env.O3_USERNAME ?? "",
      password: process.env.O3_PASSWORD ?? ""
    }
  });
  await use(ctx);
};
var test = import_test.test.extend({
  api: [api, { scope: "worker" }],
  page: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: "tests/storageState.json"
    });
    const page = await context.newPage();
    await use(page);
    await context.close();
  }
});

// load-tests/validate-demo-patients.ts
var import_test2 = require("@playwright/test");

// load-tests/utils.ts
async function loginOpenmrs(page) {
  await page.goto(`${O3_URL}`);
  await page.getByRole("textbox", { name: "Username" }).click();
  await page.getByRole("textbox", { name: "Username" }).fill("testFaimer");
  await page.getByRole("textbox", { name: "Password" }).click();
  await page.getByRole("textbox", { name: "Password" }).fill("Admin123");
  await page.getByRole("button", { name: "Log in" }).click();
  await page.locator("label").filter({ hasText: "Inpatient Ward" }).locator("span").first().click();
  await page.getByRole("button", { name: "Confirm" }).click();
}

// load-tests/validate-demo-patients.ts
async function runDemoPatientsTest(page) {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await loginOpenmrs(page);
  await page.getByTestId("searchPatientIcon").click();
  await page.getByTestId("patientSearchBar").click();
  await page.getByTestId("patientSearchBar").fill("bett");
  await (0, import_test2.expect)(page.getByRole("link", { name: "Betty Williams Female 52 yrs" })).toBeVisible();
}

// load-tests/validate-sample-patients.ts
var import_test3 = require("@playwright/test");
async function runSamplePatientsTest(page) {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await loginOpenmrs(page);
  await page.getByTestId("searchPatientIcon").click();
  await page.getByTestId("patientSearchBar").click();
  await page.getByTestId("patientSearchBar").fill("Devan");
  await (0, import_test3.expect)(page.getByRole("link", { name: "Devan Modi Male 65 yrs \xB7 01-" })).toBeVisible();
  await page.getByTestId("patientSearchBar").click();
  await page.getByTestId("patientSearchBar").fill("Flo");
  await (0, import_test3.expect)(page.getByRole("link", { name: "Florencia Klinger Female 65" })).toBeVisible();
  await page.getByTestId("patientSearchBar").click();
  await page.getByTestId("patientSearchBar").fill("Dai");
  await (0, import_test3.expect)(page.getByRole("link", { name: "Daichi Okada Male 56 yrs \xB7 01" })).toBeVisible();
  await page.getByTestId("patientSearchBar").click();
  await page.getByTestId("patientSearchBar").fill("Leon");
  await (0, import_test3.expect)(page.getByRole("link", { name: "Leon Wagner Male 7 days \xB7 20-" })).toBeVisible();
  await page.getByTestId("patientSearchBar").click();
  await page.getByTestId("patientSearchBar").fill("Daniel");
  await (0, import_test3.expect)(page.getByRole("link", { name: "Daniel Acosta Male 72 yrs \xB7" })).toBeVisible();
}

// load-tests/validate-result-viewer.ts
var import_test4 = require("@playwright/test");
async function runSamplePatientsResultViewerTest(page) {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await loginOpenmrs(page);
  await page.getByTestId("searchPatientIcon").click();
  await page.getByTestId("patientSearchBar").click();
  await page.getByTestId("patientSearchBar").fill("Dev");
  await (0, import_test4.expect)(page.getByRole("link", { name: "Devan Modi Male 65 yrs \xB7 01-" })).toBeVisible();
  await page.getByRole("link", { name: "Devan Modi Male 65 yrs \xB7 01-" }).click();
  await (0, import_test4.expect)(page.getByRole("link", { name: "Results" })).toBeVisible();
  await page.getByRole("link", { name: "Results" }).click();
  await (0, import_test4.expect)(page.getByRole("tab", { name: "Over time" })).toBeVisible();
  await page.getByRole("tab", { name: "Over time" }).click();
  await (0, import_test4.expect)(page.getByText("CT head (without contrast)").nth(1)).toBeVisible();
  await (0, import_test4.expect)(page.getByText("Haemoglobin").nth(2)).toBeVisible();
  await (0, import_test4.expect)(page.getByText("Serum sodium").nth(2)).toBeVisible();
}

// load-tests/load-test.ts
var config2 = {
  target: `${O3_URL}`,
  phases: [
    {
      duration: 60,
      arrivalRate: 1,
      maxVusers: 20,
      name: "Warm-up"
    },
    {
      duration: 60,
      arrivalRate: 1,
      rampTo: 5,
      maxVusers: 20,
      name: "Ramp-up to Peak Load"
    },
    {
      duration: 60,
      arrivalRate: 5,
      maxVusers: 20,
      name: "Peak Load"
    },
    {
      duration: 60,
      arrivalRate: 5,
      rampTo: 1,
      maxVusers: 20,
      name: "Cool Down"
    }
  ],
  engines: {
    playwright: {
      launchOptions: {
        headless: true,
        viewport: {
          width: 1920,
          height: 1080
        },
        args: ["--start-fullscreen", "--start-maximized"]
      },
      aggregateByName: true,
      extendedMetrics: true
    }
  }
};
var scenarios = [
  {
    engine: "playwright",
    name: "Login OpenMRS and validate if Demo Patients are present",
    testFunction: runDemoPatientsTest
  },
  {
    engine: "playwright",
    name: "Login OpenMRS and validate if all 5 Sample Patients are present",
    testFunction: runSamplePatientsTest
  },
  {
    engine: "playwright",
    name: "Validate if Sample Patients contain results",
    testFunction: runSamplePatientsResultViewerTest
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  config,
  scenarios
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL2RvdGVudi9wYWNrYWdlLmpzb24iLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2RvdGVudi9saWIvbWFpbi5qcyIsICIuLi9sb2FkLXRlc3QudHMiLCAiLi4vLi4vZTJlL3V0aWxzL2NvbmZpZ3MvZ2xvYmFsU2V0dXAudHMiLCAiLi4vdmFsaWRhdGUtZGVtby1wYXRpZW50cy50cyIsICIuLi91dGlscy50cyIsICIuLi92YWxpZGF0ZS1zYW1wbGUtcGF0aWVudHMudHMiLCAiLi4vdmFsaWRhdGUtcmVzdWx0LXZpZXdlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsie1xuICBcIm5hbWVcIjogXCJkb3RlbnZcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMTYuMy4xXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJMb2FkcyBlbnZpcm9ubWVudCB2YXJpYWJsZXMgZnJvbSAuZW52IGZpbGVcIixcbiAgXCJtYWluXCI6IFwibGliL21haW4uanNcIixcbiAgXCJ0eXBlc1wiOiBcImxpYi9tYWluLmQudHNcIixcbiAgXCJleHBvcnRzXCI6IHtcbiAgICBcIi5cIjoge1xuICAgICAgXCJ0eXBlc1wiOiBcIi4vbGliL21haW4uZC50c1wiLFxuICAgICAgXCJyZXF1aXJlXCI6IFwiLi9saWIvbWFpbi5qc1wiLFxuICAgICAgXCJkZWZhdWx0XCI6IFwiLi9saWIvbWFpbi5qc1wiXG4gICAgfSxcbiAgICBcIi4vY29uZmlnXCI6IFwiLi9jb25maWcuanNcIixcbiAgICBcIi4vY29uZmlnLmpzXCI6IFwiLi9jb25maWcuanNcIixcbiAgICBcIi4vbGliL2Vudi1vcHRpb25zXCI6IFwiLi9saWIvZW52LW9wdGlvbnMuanNcIixcbiAgICBcIi4vbGliL2Vudi1vcHRpb25zLmpzXCI6IFwiLi9saWIvZW52LW9wdGlvbnMuanNcIixcbiAgICBcIi4vbGliL2NsaS1vcHRpb25zXCI6IFwiLi9saWIvY2xpLW9wdGlvbnMuanNcIixcbiAgICBcIi4vbGliL2NsaS1vcHRpb25zLmpzXCI6IFwiLi9saWIvY2xpLW9wdGlvbnMuanNcIixcbiAgICBcIi4vcGFja2FnZS5qc29uXCI6IFwiLi9wYWNrYWdlLmpzb25cIlxuICB9LFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiZHRzLWNoZWNrXCI6IFwidHNjIC0tcHJvamVjdCB0ZXN0cy90eXBlcy90c2NvbmZpZy5qc29uXCIsXG4gICAgXCJsaW50XCI6IFwic3RhbmRhcmRcIixcbiAgICBcImxpbnQtcmVhZG1lXCI6IFwic3RhbmRhcmQtbWFya2Rvd25cIixcbiAgICBcInByZXRlc3RcIjogXCJucG0gcnVuIGxpbnQgJiYgbnBtIHJ1biBkdHMtY2hlY2tcIixcbiAgICBcInRlc3RcIjogXCJ0YXAgdGVzdHMvKi5qcyAtLTEwMCAtUnNwZWNcIixcbiAgICBcInByZXJlbGVhc2VcIjogXCJucG0gdGVzdFwiLFxuICAgIFwicmVsZWFzZVwiOiBcInN0YW5kYXJkLXZlcnNpb25cIlxuICB9LFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiZ2l0Oi8vZ2l0aHViLmNvbS9tb3Rkb3RsYS9kb3RlbnYuZ2l0XCJcbiAgfSxcbiAgXCJmdW5kaW5nXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL21vdGRvdGxhL2RvdGVudj9zcG9uc29yPTFcIixcbiAgXCJrZXl3b3Jkc1wiOiBbXG4gICAgXCJkb3RlbnZcIixcbiAgICBcImVudlwiLFxuICAgIFwiLmVudlwiLFxuICAgIFwiZW52aXJvbm1lbnRcIixcbiAgICBcInZhcmlhYmxlc1wiLFxuICAgIFwiY29uZmlnXCIsXG4gICAgXCJzZXR0aW5nc1wiXG4gIF0sXG4gIFwicmVhZG1lRmlsZW5hbWVcIjogXCJSRUFETUUubWRcIixcbiAgXCJsaWNlbnNlXCI6IFwiQlNELTItQ2xhdXNlXCIsXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBkZWZpbml0ZWx5dHlwZWQvZHRzbGludFwiOiBcIl4wLjAuMTMzXCIsXG4gICAgXCJAdHlwZXMvbm9kZVwiOiBcIl4xOC4xMS4zXCIsXG4gICAgXCJkZWNhY2hlXCI6IFwiXjQuNi4xXCIsXG4gICAgXCJzaW5vblwiOiBcIl4xNC4wLjFcIixcbiAgICBcInN0YW5kYXJkXCI6IFwiXjE3LjAuMFwiLFxuICAgIFwic3RhbmRhcmQtbWFya2Rvd25cIjogXCJeNy4xLjBcIixcbiAgICBcInN0YW5kYXJkLXZlcnNpb25cIjogXCJeOS41LjBcIixcbiAgICBcInRhcFwiOiBcIl4xNi4zLjBcIixcbiAgICBcInRhclwiOiBcIl42LjEuMTFcIixcbiAgICBcInR5cGVzY3JpcHRcIjogXCJeNC44LjRcIlxuICB9LFxuICBcImVuZ2luZXNcIjoge1xuICAgIFwibm9kZVwiOiBcIj49MTJcIlxuICB9LFxuICBcImJyb3dzZXJcIjoge1xuICAgIFwiZnNcIjogZmFsc2VcbiAgfVxufVxuIiwgImNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKVxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuY29uc3Qgb3MgPSByZXF1aXJlKCdvcycpXG5jb25zdCBjcnlwdG8gPSByZXF1aXJlKCdjcnlwdG8nKVxuY29uc3QgcGFja2FnZUpzb24gPSByZXF1aXJlKCcuLi9wYWNrYWdlLmpzb24nKVxuXG5jb25zdCB2ZXJzaW9uID0gcGFja2FnZUpzb24udmVyc2lvblxuXG5jb25zdCBMSU5FID0gLyg/Ol58XilcXHMqKD86ZXhwb3J0XFxzKyk/KFtcXHcuLV0rKSg/Olxccyo9XFxzKj98Olxccys/KShcXHMqJyg/OlxcXFwnfFteJ10pKid8XFxzKlwiKD86XFxcXFwifFteXCJdKSpcInxcXHMqYCg/OlxcXFxgfFteYF0pKmB8W14jXFxyXFxuXSspP1xccyooPzojLiopPyg/OiR8JCkvbWdcblxuLy8gUGFyc2Ugc3JjIGludG8gYW4gT2JqZWN0XG5mdW5jdGlvbiBwYXJzZSAoc3JjKSB7XG4gIGNvbnN0IG9iaiA9IHt9XG5cbiAgLy8gQ29udmVydCBidWZmZXIgdG8gc3RyaW5nXG4gIGxldCBsaW5lcyA9IHNyYy50b1N0cmluZygpXG5cbiAgLy8gQ29udmVydCBsaW5lIGJyZWFrcyB0byBzYW1lIGZvcm1hdFxuICBsaW5lcyA9IGxpbmVzLnJlcGxhY2UoL1xcclxcbj8vbWcsICdcXG4nKVxuXG4gIGxldCBtYXRjaFxuICB3aGlsZSAoKG1hdGNoID0gTElORS5leGVjKGxpbmVzKSkgIT0gbnVsbCkge1xuICAgIGNvbnN0IGtleSA9IG1hdGNoWzFdXG5cbiAgICAvLyBEZWZhdWx0IHVuZGVmaW5lZCBvciBudWxsIHRvIGVtcHR5IHN0cmluZ1xuICAgIGxldCB2YWx1ZSA9IChtYXRjaFsyXSB8fCAnJylcblxuICAgIC8vIFJlbW92ZSB3aGl0ZXNwYWNlXG4gICAgdmFsdWUgPSB2YWx1ZS50cmltKClcblxuICAgIC8vIENoZWNrIGlmIGRvdWJsZSBxdW90ZWRcbiAgICBjb25zdCBtYXliZVF1b3RlID0gdmFsdWVbMF1cblxuICAgIC8vIFJlbW92ZSBzdXJyb3VuZGluZyBxdW90ZXNcbiAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL14oWydcImBdKShbXFxzXFxTXSopXFwxJC9tZywgJyQyJylcblxuICAgIC8vIEV4cGFuZCBuZXdsaW5lcyBpZiBkb3VibGUgcXVvdGVkXG4gICAgaWYgKG1heWJlUXVvdGUgPT09ICdcIicpIHtcbiAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXFxcXG4vZywgJ1xcbicpXG4gICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xcXFxyL2csICdcXHInKVxuICAgIH1cblxuICAgIC8vIEFkZCB0byBvYmplY3RcbiAgICBvYmpba2V5XSA9IHZhbHVlXG4gIH1cblxuICByZXR1cm4gb2JqXG59XG5cbmZ1bmN0aW9uIF9wYXJzZVZhdWx0IChvcHRpb25zKSB7XG4gIGNvbnN0IHZhdWx0UGF0aCA9IF92YXVsdFBhdGgob3B0aW9ucylcblxuICAvLyBQYXJzZSAuZW52LnZhdWx0XG4gIGNvbnN0IHJlc3VsdCA9IERvdGVudk1vZHVsZS5jb25maWdEb3RlbnYoeyBwYXRoOiB2YXVsdFBhdGggfSlcbiAgaWYgKCFyZXN1bHQucGFyc2VkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBNSVNTSU5HX0RBVEE6IENhbm5vdCBwYXJzZSAke3ZhdWx0UGF0aH0gZm9yIGFuIHVua25vd24gcmVhc29uYClcbiAgfVxuXG4gIC8vIGhhbmRsZSBzY2VuYXJpbyBmb3IgY29tbWEgc2VwYXJhdGVkIGtleXMgLSBmb3IgdXNlIHdpdGgga2V5IHJvdGF0aW9uXG4gIC8vIGV4YW1wbGU6IERPVEVOVl9LRVk9XCJkb3RlbnY6Ly86a2V5XzEyMzRAZG90ZW52Lm9yZy92YXVsdC8uZW52LnZhdWx0P2Vudmlyb25tZW50PXByb2QsZG90ZW52Oi8vOmtleV83ODkwQGRvdGVudi5vcmcvdmF1bHQvLmVudi52YXVsdD9lbnZpcm9ubWVudD1wcm9kXCJcbiAgY29uc3Qga2V5cyA9IF9kb3RlbnZLZXkob3B0aW9ucykuc3BsaXQoJywnKVxuICBjb25zdCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuXG4gIGxldCBkZWNyeXB0ZWRcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIHRyeSB7XG4gICAgICAvLyBHZXQgZnVsbCBrZXlcbiAgICAgIGNvbnN0IGtleSA9IGtleXNbaV0udHJpbSgpXG5cbiAgICAgIC8vIEdldCBpbnN0cnVjdGlvbnMgZm9yIGRlY3J5cHRcbiAgICAgIGNvbnN0IGF0dHJzID0gX2luc3RydWN0aW9ucyhyZXN1bHQsIGtleSlcblxuICAgICAgLy8gRGVjcnlwdFxuICAgICAgZGVjcnlwdGVkID0gRG90ZW52TW9kdWxlLmRlY3J5cHQoYXR0cnMuY2lwaGVydGV4dCwgYXR0cnMua2V5KVxuXG4gICAgICBicmVha1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvLyBsYXN0IGtleVxuICAgICAgaWYgKGkgKyAxID49IGxlbmd0aCkge1xuICAgICAgICB0aHJvdyBlcnJvclxuICAgICAgfVxuICAgICAgLy8gdHJ5IG5leHQga2V5XG4gICAgfVxuICB9XG5cbiAgLy8gUGFyc2UgZGVjcnlwdGVkIC5lbnYgc3RyaW5nXG4gIHJldHVybiBEb3RlbnZNb2R1bGUucGFyc2UoZGVjcnlwdGVkKVxufVxuXG5mdW5jdGlvbiBfbG9nIChtZXNzYWdlKSB7XG4gIGNvbnNvbGUubG9nKGBbZG90ZW52QCR7dmVyc2lvbn1dW0lORk9dICR7bWVzc2FnZX1gKVxufVxuXG5mdW5jdGlvbiBfd2FybiAobWVzc2FnZSkge1xuICBjb25zb2xlLmxvZyhgW2RvdGVudkAke3ZlcnNpb259XVtXQVJOXSAke21lc3NhZ2V9YClcbn1cblxuZnVuY3Rpb24gX2RlYnVnIChtZXNzYWdlKSB7XG4gIGNvbnNvbGUubG9nKGBbZG90ZW52QCR7dmVyc2lvbn1dW0RFQlVHXSAke21lc3NhZ2V9YClcbn1cblxuZnVuY3Rpb24gX2RvdGVudktleSAob3B0aW9ucykge1xuICAvLyBwcmlvcml0aXplIGRldmVsb3BlciBkaXJlY3RseSBzZXR0aW5nIG9wdGlvbnMuRE9URU5WX0tFWVxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLkRPVEVOVl9LRVkgJiYgb3B0aW9ucy5ET1RFTlZfS0VZLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gb3B0aW9ucy5ET1RFTlZfS0VZXG4gIH1cblxuICAvLyBzZWNvbmRhcnkgaW5mcmEgYWxyZWFkeSBjb250YWlucyBhIERPVEVOVl9LRVkgZW52aXJvbm1lbnQgdmFyaWFibGVcbiAgaWYgKHByb2Nlc3MuZW52LkRPVEVOVl9LRVkgJiYgcHJvY2Vzcy5lbnYuRE9URU5WX0tFWS5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIHByb2Nlc3MuZW52LkRPVEVOVl9LRVlcbiAgfVxuXG4gIC8vIGZhbGxiYWNrIHRvIGVtcHR5IHN0cmluZ1xuICByZXR1cm4gJydcbn1cblxuZnVuY3Rpb24gX2luc3RydWN0aW9ucyAocmVzdWx0LCBkb3RlbnZLZXkpIHtcbiAgLy8gUGFyc2UgRE9URU5WX0tFWS4gRm9ybWF0IGlzIGEgVVJJXG4gIGxldCB1cmlcbiAgdHJ5IHtcbiAgICB1cmkgPSBuZXcgVVJMKGRvdGVudktleSlcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpZiAoZXJyb3IuY29kZSA9PT0gJ0VSUl9JTlZBTElEX1VSTCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSU5WQUxJRF9ET1RFTlZfS0VZOiBXcm9uZyBmb3JtYXQuIE11c3QgYmUgaW4gdmFsaWQgdXJpIGZvcm1hdCBsaWtlIGRvdGVudjovLzprZXlfMTIzNEBkb3RlbnYub3JnL3ZhdWx0Ly5lbnYudmF1bHQ/ZW52aXJvbm1lbnQ9ZGV2ZWxvcG1lbnQnKVxuICAgIH1cblxuICAgIHRocm93IGVycm9yXG4gIH1cblxuICAvLyBHZXQgZGVjcnlwdCBrZXlcbiAgY29uc3Qga2V5ID0gdXJpLnBhc3N3b3JkXG4gIGlmICgha2V5KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJTlZBTElEX0RPVEVOVl9LRVk6IE1pc3Npbmcga2V5IHBhcnQnKVxuICB9XG5cbiAgLy8gR2V0IGVudmlyb25tZW50XG4gIGNvbnN0IGVudmlyb25tZW50ID0gdXJpLnNlYXJjaFBhcmFtcy5nZXQoJ2Vudmlyb25tZW50JylcbiAgaWYgKCFlbnZpcm9ubWVudCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSU5WQUxJRF9ET1RFTlZfS0VZOiBNaXNzaW5nIGVudmlyb25tZW50IHBhcnQnKVxuICB9XG5cbiAgLy8gR2V0IGNpcGhlcnRleHQgcGF5bG9hZFxuICBjb25zdCBlbnZpcm9ubWVudEtleSA9IGBET1RFTlZfVkFVTFRfJHtlbnZpcm9ubWVudC50b1VwcGVyQ2FzZSgpfWBcbiAgY29uc3QgY2lwaGVydGV4dCA9IHJlc3VsdC5wYXJzZWRbZW52aXJvbm1lbnRLZXldIC8vIERPVEVOVl9WQVVMVF9QUk9EVUNUSU9OXG4gIGlmICghY2lwaGVydGV4dCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgTk9UX0ZPVU5EX0RPVEVOVl9FTlZJUk9OTUVOVDogQ2Fubm90IGxvY2F0ZSBlbnZpcm9ubWVudCAke2Vudmlyb25tZW50S2V5fSBpbiB5b3VyIC5lbnYudmF1bHQgZmlsZS5gKVxuICB9XG5cbiAgcmV0dXJuIHsgY2lwaGVydGV4dCwga2V5IH1cbn1cblxuZnVuY3Rpb24gX3ZhdWx0UGF0aCAob3B0aW9ucykge1xuICBsZXQgZG90ZW52UGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnLmVudicpXG5cbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5wYXRoICYmIG9wdGlvbnMucGF0aC5sZW5ndGggPiAwKSB7XG4gICAgZG90ZW52UGF0aCA9IG9wdGlvbnMucGF0aFxuICB9XG5cbiAgLy8gTG9jYXRlIC5lbnYudmF1bHRcbiAgcmV0dXJuIGRvdGVudlBhdGguZW5kc1dpdGgoJy52YXVsdCcpID8gZG90ZW52UGF0aCA6IGAke2RvdGVudlBhdGh9LnZhdWx0YFxufVxuXG5mdW5jdGlvbiBfcmVzb2x2ZUhvbWUgKGVudlBhdGgpIHtcbiAgcmV0dXJuIGVudlBhdGhbMF0gPT09ICd+JyA/IHBhdGguam9pbihvcy5ob21lZGlyKCksIGVudlBhdGguc2xpY2UoMSkpIDogZW52UGF0aFxufVxuXG5mdW5jdGlvbiBfY29uZmlnVmF1bHQgKG9wdGlvbnMpIHtcbiAgX2xvZygnTG9hZGluZyBlbnYgZnJvbSBlbmNyeXB0ZWQgLmVudi52YXVsdCcpXG5cbiAgY29uc3QgcGFyc2VkID0gRG90ZW52TW9kdWxlLl9wYXJzZVZhdWx0KG9wdGlvbnMpXG5cbiAgbGV0IHByb2Nlc3NFbnYgPSBwcm9jZXNzLmVudlxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnByb2Nlc3NFbnYgIT0gbnVsbCkge1xuICAgIHByb2Nlc3NFbnYgPSBvcHRpb25zLnByb2Nlc3NFbnZcbiAgfVxuXG4gIERvdGVudk1vZHVsZS5wb3B1bGF0ZShwcm9jZXNzRW52LCBwYXJzZWQsIG9wdGlvbnMpXG5cbiAgcmV0dXJuIHsgcGFyc2VkIH1cbn1cblxuZnVuY3Rpb24gY29uZmlnRG90ZW52IChvcHRpb25zKSB7XG4gIGxldCBkb3RlbnZQYXRoID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICcuZW52JylcbiAgbGV0IGVuY29kaW5nID0gJ3V0ZjgnXG4gIGNvbnN0IGRlYnVnID0gQm9vbGVhbihvcHRpb25zICYmIG9wdGlvbnMuZGVidWcpXG5cbiAgaWYgKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5wYXRoICE9IG51bGwpIHtcbiAgICAgIGRvdGVudlBhdGggPSBfcmVzb2x2ZUhvbWUob3B0aW9ucy5wYXRoKVxuICAgIH1cbiAgICBpZiAob3B0aW9ucy5lbmNvZGluZyAhPSBudWxsKSB7XG4gICAgICBlbmNvZGluZyA9IG9wdGlvbnMuZW5jb2RpbmdcbiAgICB9XG4gIH1cblxuICB0cnkge1xuICAgIC8vIFNwZWNpZnlpbmcgYW4gZW5jb2RpbmcgcmV0dXJucyBhIHN0cmluZyBpbnN0ZWFkIG9mIGEgYnVmZmVyXG4gICAgY29uc3QgcGFyc2VkID0gRG90ZW52TW9kdWxlLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhkb3RlbnZQYXRoLCB7IGVuY29kaW5nIH0pKVxuXG4gICAgbGV0IHByb2Nlc3NFbnYgPSBwcm9jZXNzLmVudlxuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMucHJvY2Vzc0VudiAhPSBudWxsKSB7XG4gICAgICBwcm9jZXNzRW52ID0gb3B0aW9ucy5wcm9jZXNzRW52XG4gICAgfVxuXG4gICAgRG90ZW52TW9kdWxlLnBvcHVsYXRlKHByb2Nlc3NFbnYsIHBhcnNlZCwgb3B0aW9ucylcblxuICAgIHJldHVybiB7IHBhcnNlZCB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAoZGVidWcpIHtcbiAgICAgIF9kZWJ1ZyhgRmFpbGVkIHRvIGxvYWQgJHtkb3RlbnZQYXRofSAke2UubWVzc2FnZX1gKVxuICAgIH1cblxuICAgIHJldHVybiB7IGVycm9yOiBlIH1cbiAgfVxufVxuXG4vLyBQb3B1bGF0ZXMgcHJvY2Vzcy5lbnYgZnJvbSAuZW52IGZpbGVcbmZ1bmN0aW9uIGNvbmZpZyAob3B0aW9ucykge1xuICBjb25zdCB2YXVsdFBhdGggPSBfdmF1bHRQYXRoKG9wdGlvbnMpXG5cbiAgLy8gZmFsbGJhY2sgdG8gb3JpZ2luYWwgZG90ZW52IGlmIERPVEVOVl9LRVkgaXMgbm90IHNldFxuICBpZiAoX2RvdGVudktleShvcHRpb25zKS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gRG90ZW52TW9kdWxlLmNvbmZpZ0RvdGVudihvcHRpb25zKVxuICB9XG5cbiAgLy8gZG90ZW52S2V5IGV4aXN0cyBidXQgLmVudi52YXVsdCBmaWxlIGRvZXMgbm90IGV4aXN0XG4gIGlmICghZnMuZXhpc3RzU3luYyh2YXVsdFBhdGgpKSB7XG4gICAgX3dhcm4oYFlvdSBzZXQgRE9URU5WX0tFWSBidXQgeW91IGFyZSBtaXNzaW5nIGEgLmVudi52YXVsdCBmaWxlIGF0ICR7dmF1bHRQYXRofS4gRGlkIHlvdSBmb3JnZXQgdG8gYnVpbGQgaXQ/YClcblxuICAgIHJldHVybiBEb3RlbnZNb2R1bGUuY29uZmlnRG90ZW52KG9wdGlvbnMpXG4gIH1cblxuICByZXR1cm4gRG90ZW52TW9kdWxlLl9jb25maWdWYXVsdChvcHRpb25zKVxufVxuXG5mdW5jdGlvbiBkZWNyeXB0IChlbmNyeXB0ZWQsIGtleVN0cikge1xuICBjb25zdCBrZXkgPSBCdWZmZXIuZnJvbShrZXlTdHIuc2xpY2UoLTY0KSwgJ2hleCcpXG4gIGxldCBjaXBoZXJ0ZXh0ID0gQnVmZmVyLmZyb20oZW5jcnlwdGVkLCAnYmFzZTY0JylcblxuICBjb25zdCBub25jZSA9IGNpcGhlcnRleHQuc2xpY2UoMCwgMTIpXG4gIGNvbnN0IGF1dGhUYWcgPSBjaXBoZXJ0ZXh0LnNsaWNlKC0xNilcbiAgY2lwaGVydGV4dCA9IGNpcGhlcnRleHQuc2xpY2UoMTIsIC0xNilcblxuICB0cnkge1xuICAgIGNvbnN0IGFlc2djbSA9IGNyeXB0by5jcmVhdGVEZWNpcGhlcml2KCdhZXMtMjU2LWdjbScsIGtleSwgbm9uY2UpXG4gICAgYWVzZ2NtLnNldEF1dGhUYWcoYXV0aFRhZylcbiAgICByZXR1cm4gYCR7YWVzZ2NtLnVwZGF0ZShjaXBoZXJ0ZXh0KX0ke2Flc2djbS5maW5hbCgpfWBcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zdCBpc1JhbmdlID0gZXJyb3IgaW5zdGFuY2VvZiBSYW5nZUVycm9yXG4gICAgY29uc3QgaW52YWxpZEtleUxlbmd0aCA9IGVycm9yLm1lc3NhZ2UgPT09ICdJbnZhbGlkIGtleSBsZW5ndGgnXG4gICAgY29uc3QgZGVjcnlwdGlvbkZhaWxlZCA9IGVycm9yLm1lc3NhZ2UgPT09ICdVbnN1cHBvcnRlZCBzdGF0ZSBvciB1bmFibGUgdG8gYXV0aGVudGljYXRlIGRhdGEnXG5cbiAgICBpZiAoaXNSYW5nZSB8fCBpbnZhbGlkS2V5TGVuZ3RoKSB7XG4gICAgICBjb25zdCBtc2cgPSAnSU5WQUxJRF9ET1RFTlZfS0VZOiBJdCBtdXN0IGJlIDY0IGNoYXJhY3RlcnMgbG9uZyAob3IgbW9yZSknXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKVxuICAgIH0gZWxzZSBpZiAoZGVjcnlwdGlvbkZhaWxlZCkge1xuICAgICAgY29uc3QgbXNnID0gJ0RFQ1JZUFRJT05fRkFJTEVEOiBQbGVhc2UgY2hlY2sgeW91ciBET1RFTlZfS0VZJ1xuICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZylcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3I6ICcsIGVycm9yLmNvZGUpXG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvcjogJywgZXJyb3IubWVzc2FnZSlcbiAgICAgIHRocm93IGVycm9yXG4gICAgfVxuICB9XG59XG5cbi8vIFBvcHVsYXRlIHByb2Nlc3MuZW52IHdpdGggcGFyc2VkIHZhbHVlc1xuZnVuY3Rpb24gcG9wdWxhdGUgKHByb2Nlc3NFbnYsIHBhcnNlZCwgb3B0aW9ucyA9IHt9KSB7XG4gIGNvbnN0IGRlYnVnID0gQm9vbGVhbihvcHRpb25zICYmIG9wdGlvbnMuZGVidWcpXG4gIGNvbnN0IG92ZXJyaWRlID0gQm9vbGVhbihvcHRpb25zICYmIG9wdGlvbnMub3ZlcnJpZGUpXG5cbiAgaWYgKHR5cGVvZiBwYXJzZWQgIT09ICdvYmplY3QnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdPQkpFQ1RfUkVRVUlSRUQ6IFBsZWFzZSBjaGVjayB0aGUgcHJvY2Vzc0VudiBhcmd1bWVudCBiZWluZyBwYXNzZWQgdG8gcG9wdWxhdGUnKVxuICB9XG5cbiAgLy8gU2V0IHByb2Nlc3MuZW52XG4gIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHBhcnNlZCkpIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHByb2Nlc3NFbnYsIGtleSkpIHtcbiAgICAgIGlmIChvdmVycmlkZSA9PT0gdHJ1ZSkge1xuICAgICAgICBwcm9jZXNzRW52W2tleV0gPSBwYXJzZWRba2V5XVxuICAgICAgfVxuXG4gICAgICBpZiAoZGVidWcpIHtcbiAgICAgICAgaWYgKG92ZXJyaWRlID09PSB0cnVlKSB7XG4gICAgICAgICAgX2RlYnVnKGBcIiR7a2V5fVwiIGlzIGFscmVhZHkgZGVmaW5lZCBhbmQgV0FTIG92ZXJ3cml0dGVuYClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfZGVidWcoYFwiJHtrZXl9XCIgaXMgYWxyZWFkeSBkZWZpbmVkIGFuZCB3YXMgTk9UIG92ZXJ3cml0dGVuYClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwcm9jZXNzRW52W2tleV0gPSBwYXJzZWRba2V5XVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBEb3RlbnZNb2R1bGUgPSB7XG4gIGNvbmZpZ0RvdGVudixcbiAgX2NvbmZpZ1ZhdWx0LFxuICBfcGFyc2VWYXVsdCxcbiAgY29uZmlnLFxuICBkZWNyeXB0LFxuICBwYXJzZSxcbiAgcG9wdWxhdGVcbn1cblxubW9kdWxlLmV4cG9ydHMuY29uZmlnRG90ZW52ID0gRG90ZW52TW9kdWxlLmNvbmZpZ0RvdGVudlxubW9kdWxlLmV4cG9ydHMuX2NvbmZpZ1ZhdWx0ID0gRG90ZW52TW9kdWxlLl9jb25maWdWYXVsdFxubW9kdWxlLmV4cG9ydHMuX3BhcnNlVmF1bHQgPSBEb3RlbnZNb2R1bGUuX3BhcnNlVmF1bHRcbm1vZHVsZS5leHBvcnRzLmNvbmZpZyA9IERvdGVudk1vZHVsZS5jb25maWdcbm1vZHVsZS5leHBvcnRzLmRlY3J5cHQgPSBEb3RlbnZNb2R1bGUuZGVjcnlwdFxubW9kdWxlLmV4cG9ydHMucGFyc2UgPSBEb3RlbnZNb2R1bGUucGFyc2Vcbm1vZHVsZS5leHBvcnRzLnBvcHVsYXRlID0gRG90ZW52TW9kdWxlLnBvcHVsYXRlXG5cbm1vZHVsZS5leHBvcnRzID0gRG90ZW52TW9kdWxlXG4iLCAiaW1wb3J0IHtPM19VUkx9IGZyb20gXCIuLi9lMmUvdXRpbHMvY29uZmlncy9nbG9iYWxTZXR1cFwiO1xuaW1wb3J0IHtydW5EZW1vUGF0aWVudHNUZXN0fSBmcm9tIFwiLi92YWxpZGF0ZS1kZW1vLXBhdGllbnRzXCI7XG5pbXBvcnQge3J1blNhbXBsZVBhdGllbnRzVGVzdH0gZnJvbSBcIi4vdmFsaWRhdGUtc2FtcGxlLXBhdGllbnRzXCI7XG5pbXBvcnQge3J1blNhbXBsZVBhdGllbnRzUmVzdWx0Vmlld2VyVGVzdH0gZnJvbSBcIi4vdmFsaWRhdGUtcmVzdWx0LXZpZXdlclwiO1xuXG5leHBvcnQgY29uc3QgY29uZmlnID0ge1xuICAgIHRhcmdldDogYCR7TzNfVVJMfWAsXG4gICAgcGhhc2VzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiA2MCxcbiAgICAgICAgICAgIGFycml2YWxSYXRlOiAxLFxuICAgICAgICAgICAgbWF4VnVzZXJzOiAyMCxcbiAgICAgICAgICAgIG5hbWU6ICdXYXJtLXVwJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZHVyYXRpb246IDYwLFxuICAgICAgICAgICAgYXJyaXZhbFJhdGU6IDEsXG4gICAgICAgICAgICByYW1wVG86IDUsXG4gICAgICAgICAgICBtYXhWdXNlcnM6IDIwLFxuICAgICAgICAgICAgbmFtZTogJ1JhbXAtdXAgdG8gUGVhayBMb2FkJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZHVyYXRpb246IDYwLFxuICAgICAgICAgICAgYXJyaXZhbFJhdGU6IDUsXG4gICAgICAgICAgICBtYXhWdXNlcnM6IDIwLFxuICAgICAgICAgICAgbmFtZTogJ1BlYWsgTG9hZCcsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiA2MCxcbiAgICAgICAgICAgIGFycml2YWxSYXRlOiA1LFxuICAgICAgICAgICAgcmFtcFRvOiAxLFxuICAgICAgICAgICAgbWF4VnVzZXJzOiAyMCxcbiAgICAgICAgICAgIG5hbWU6ICdDb29sIERvd24nLFxuICAgICAgICB9LFxuICAgIF0sXG4gICAgZW5naW5lczoge1xuICAgICAgICBwbGF5d3JpZ2h0OiB7XG4gICAgICAgICAgICBsYXVuY2hPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgaGVhZGxlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgdmlld3BvcnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE5MjAsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMTA4MFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYXJnczogWyctLXN0YXJ0LWZ1bGxzY3JlZW4nLCAnLS1zdGFydC1tYXhpbWl6ZWQnXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFnZ3JlZ2F0ZUJ5TmFtZTogdHJ1ZSxcbiAgICAgICAgICAgIGV4dGVuZGVkTWV0cmljczogdHJ1ZVxuICAgICAgICB9XG4gICAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBzY2VuYXJpb3MgPSBbXG4gICAge1xuICAgICAgICBlbmdpbmU6ICdwbGF5d3JpZ2h0JyxcbiAgICAgICAgbmFtZTogJ0xvZ2luIE9wZW5NUlMgYW5kIHZhbGlkYXRlIGlmIERlbW8gUGF0aWVudHMgYXJlIHByZXNlbnQnLFxuICAgICAgICB0ZXN0RnVuY3Rpb246IHJ1bkRlbW9QYXRpZW50c1Rlc3QsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGVuZ2luZTogJ3BsYXl3cmlnaHQnLFxuICAgICAgICBuYW1lOiAnTG9naW4gT3Blbk1SUyBhbmQgdmFsaWRhdGUgaWYgYWxsIDUgU2FtcGxlIFBhdGllbnRzIGFyZSBwcmVzZW50JyxcbiAgICAgICAgdGVzdEZ1bmN0aW9uOiBydW5TYW1wbGVQYXRpZW50c1Rlc3QsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGVuZ2luZTogJ3BsYXl3cmlnaHQnLFxuICAgICAgICBuYW1lOiAnVmFsaWRhdGUgaWYgU2FtcGxlIFBhdGllbnRzIGNvbnRhaW4gcmVzdWx0cycsXG4gICAgICAgIHRlc3RGdW5jdGlvbjogcnVuU2FtcGxlUGF0aWVudHNSZXN1bHRWaWV3ZXJUZXN0LFxuICAgIH1cbl07XG5cbiIsICJpbXBvcnQgKiBhcyBkb3RlbnYgZnJvbSAnZG90ZW52JztcbmltcG9ydCB7XG4gIEFQSVJlcXVlc3RDb250ZXh0LFxuICBQYWdlLFxuICBQbGF5d3JpZ2h0V29ya2VyQXJncyxcbiAgV29ya2VyRml4dHVyZSxcbiAgcmVxdWVzdCxcbiAgdGVzdCBhcyBiYXNlXG59XG4gIGZyb20gJ0BwbGF5d3JpZ2h0L3Rlc3QnO1xuXG5kb3RlbnYuY29uZmlnKCk7XG5cbmV4cG9ydCBjb25zdCBPM19VUkwgPSBgJHtwcm9jZXNzLmVudi5URVNUX0VOVklST05NRU5UfWAgPT0gJ3FhJyA/IGAke3Byb2Nlc3MuZW52Lk8zX1VSTF9RQX1gIDogYCR7cHJvY2Vzcy5lbnYuTzNfVVJMX0RFVn1gO1xuZXhwb3J0IGNvbnN0IEtFWUNMT0FLX1VSTCA9IGAke3Byb2Nlc3MuZW52LlRFU1RfRU5WSVJPTk1FTlR9YCA9PSAncWEnID8gYCR7cHJvY2Vzcy5lbnYuS0VZQ0xPQUtfVVJMX1FBfWAgOiBgJHtwcm9jZXNzLmVudi5LRVlDTE9BS19VUkxfREVWfWA7XG5cbmFzeW5jIGZ1bmN0aW9uIGdsb2JhbFNldHVwKCkge1xuICBjb25zdCByZXF1ZXN0Q29udGV4dCA9IGF3YWl0IHJlcXVlc3QubmV3Q29udGV4dCgpO1xuICBjb25zdCB0b2tlbiA9IEJ1ZmZlci5mcm9tKGAke3Byb2Nlc3MuZW52Lk8zX1VTRVJOQU1FfToke3Byb2Nlc3MuZW52Lk8zX1BBU1NXT1JEfWApLnRvU3RyaW5nKFxuICAgICdiYXNlNjQnLFxuICApO1xuICBhd2FpdCByZXF1ZXN0Q29udGV4dC5wb3N0KGAke3Byb2Nlc3MuZW52Lk8zX1VSTF9ERVZ9L3dzL3Jlc3QvdjEvc2Vzc2lvbmAsIHtcbiAgICBkYXRhOiB7XG4gICAgICBzZXNzaW9uTG9jYXRpb246ICcnLFxuICAgICAgbG9jYWxlOiAnZW4nLFxuICAgIH0sXG4gICAgaGVhZGVyczoge1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIEF1dGhvcml6YXRpb246IGBCYXNpYyAke3Rva2VufWAsXG4gICAgfSxcbiAgfSk7XG4gIGF3YWl0IHJlcXVlc3RDb250ZXh0LnN0b3JhZ2VTdGF0ZSh7IHBhdGg6ICd0ZXN0cy9zdG9yYWdlU3RhdGUuanNvbicgfSk7XG4gIGF3YWl0IHJlcXVlc3RDb250ZXh0LmRpc3Bvc2UoKTtcbn1cblxuZXhwb3J0IGNvbnN0IGFwaTogV29ya2VyRml4dHVyZTxBUElSZXF1ZXN0Q29udGV4dCwgUGxheXdyaWdodFdvcmtlckFyZ3M+ID0gYXN5bmMgKHsgcGxheXdyaWdodCB9LCB1c2UpID0+IHtcbiAgY29uc3QgY3R4ID0gYXdhaXQgcGxheXdyaWdodC5yZXF1ZXN0Lm5ld0NvbnRleHQoe1xuICAgIGJhc2VVUkw6IGAke3Byb2Nlc3MuZW52Lk8zX1VSTF9ERVZ9L3dzL3Jlc3QvdjEvYCxcbiAgICBodHRwQ3JlZGVudGlhbHM6IHtcbiAgICAgIHVzZXJuYW1lOiBwcm9jZXNzLmVudi5PM19VU0VSTkFNRSA/PyBcIlwiLFxuICAgICAgcGFzc3dvcmQ6IHByb2Nlc3MuZW52Lk8zX1BBU1NXT1JEID8/IFwiXCIsXG4gICAgfSxcbiAgfSk7XG5cbiAgYXdhaXQgdXNlKGN0eCk7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIEN1c3RvbVRlc3RGaXh0dXJlcyB7XG4gIGxvZ2luQXNBZG1pbjogUGFnZTtcbiAgcGFnZTogUGFnZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDdXN0b21Xb3JrZXJGaXh0dXJlcyB7XG4gIGFwaTogQVBJUmVxdWVzdENvbnRleHQ7XG59XG5cbmV4cG9ydCBjb25zdCB0ZXN0ID0gYmFzZS5leHRlbmQ8Q3VzdG9tVGVzdEZpeHR1cmVzLCBDdXN0b21Xb3JrZXJGaXh0dXJlcz4oe1xuICBhcGk6IFthcGksIHsgc2NvcGU6ICd3b3JrZXInIH1dLFxuICBwYWdlOiBhc3luYyAoeyBicm93c2VyIH0sIHVzZSkgPT4ge1xuICAgIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBicm93c2VyLm5ld0NvbnRleHQoe1xuICAgICAgc3RvcmFnZVN0YXRlOiAndGVzdHMvc3RvcmFnZVN0YXRlLmpzb24nLFxuICAgIH0pO1xuICAgIGNvbnN0IHBhZ2UgPSBhd2FpdCBjb250ZXh0Lm5ld1BhZ2UoKTtcbiAgICBhd2FpdCB1c2UocGFnZSk7XG4gICAgYXdhaXQgY29udGV4dC5jbG9zZSgpO1xuICB9LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGdsb2JhbFNldHVwO1xuIiwgImltcG9ydCB7ZXhwZWN0LCBQYWdlfSBmcm9tICdAcGxheXdyaWdodC90ZXN0JztcbmltcG9ydCB7bG9naW5PcGVubXJzfSBmcm9tIFwiLi91dGlsc1wiO1xuXG5cbi8vIExvZ2luIE9wZW5NUlMgYW5kIHZhbGlkYXRlIGlmIERlbW8gUGF0aWVudHMgYXJlIHByZXNlbnRcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBydW5EZW1vUGF0aWVudHNUZXN0KHBhZ2U6IFBhZ2UpIHtcbiAgICBhd2FpdCBwYWdlLnNldFZpZXdwb3J0U2l6ZSh7d2lkdGg6IDE5MjAsIGhlaWdodDogMTA4MH0pO1xuXG4gICAgYXdhaXQgbG9naW5PcGVubXJzKHBhZ2UpO1xuXG4gICAgYXdhaXQgcGFnZS5nZXRCeVRlc3RJZCgnc2VhcmNoUGF0aWVudEljb24nKS5jbGljaygpO1xuICAgIGF3YWl0IHBhZ2UuZ2V0QnlUZXN0SWQoJ3BhdGllbnRTZWFyY2hCYXInKS5jbGljaygpO1xuICAgIGF3YWl0IHBhZ2UuZ2V0QnlUZXN0SWQoJ3BhdGllbnRTZWFyY2hCYXInKS5maWxsKCdiZXR0Jyk7XG4gICAgYXdhaXQgZXhwZWN0KHBhZ2UuZ2V0QnlSb2xlKCdsaW5rJywge25hbWU6ICdCZXR0eSBXaWxsaWFtcyBGZW1hbGUgNTIgeXJzJ30pKS50b0JlVmlzaWJsZSgpO1xufVxuIiwgImltcG9ydCB7TzNfVVJMfSBmcm9tIFwiLi4vZTJlL3V0aWxzL2NvbmZpZ3MvZ2xvYmFsU2V0dXBcIjtcbmltcG9ydCB7UGFnZX0gZnJvbSBcIkBwbGF5d3JpZ2h0L3Rlc3RcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvZ2luT3Blbm1ycyhwYWdlOiBQYWdlKSB7XG4gICAgYXdhaXQgcGFnZS5nb3RvKGAke08zX1VSTH1gKTtcbiAgICBhd2FpdCBwYWdlLmdldEJ5Um9sZSgndGV4dGJveCcsIHtuYW1lOiAnVXNlcm5hbWUnfSkuY2xpY2soKTtcbiAgICBhd2FpdCBwYWdlLmdldEJ5Um9sZSgndGV4dGJveCcsIHtuYW1lOiAnVXNlcm5hbWUnfSkuZmlsbCgndGVzdEZhaW1lcicpO1xuICAgIGF3YWl0IHBhZ2UuZ2V0QnlSb2xlKCd0ZXh0Ym94Jywge25hbWU6ICdQYXNzd29yZCd9KS5jbGljaygpO1xuICAgIGF3YWl0IHBhZ2UuZ2V0QnlSb2xlKCd0ZXh0Ym94Jywge25hbWU6ICdQYXNzd29yZCd9KS5maWxsKCdBZG1pbjEyMycpO1xuICAgIGF3YWl0IHBhZ2UuZ2V0QnlSb2xlKCdidXR0b24nLCB7bmFtZTogJ0xvZyBpbid9KS5jbGljaygpO1xuICAgIGF3YWl0IHBhZ2UubG9jYXRvcignbGFiZWwnKS5maWx0ZXIoe2hhc1RleHQ6ICdJbnBhdGllbnQgV2FyZCd9KS5sb2NhdG9yKCdzcGFuJykuZmlyc3QoKS5jbGljaygpO1xuICAgIGF3YWl0IHBhZ2UuZ2V0QnlSb2xlKCdidXR0b24nLCB7bmFtZTogJ0NvbmZpcm0nfSkuY2xpY2soKTtcbn1cblxuIiwgImltcG9ydCB7ZXhwZWN0LCBQYWdlfSBmcm9tICdAcGxheXdyaWdodC90ZXN0JztcbmltcG9ydCB7bG9naW5PcGVubXJzfSBmcm9tIFwiLi91dGlsc1wiO1xuXG5cbi8vIExvZ2luIE9wZW5NUlMgYW5kIHZhbGlkYXRlIGlmIGFsbCA1IFNhbXBsZSBQYXRpZW50cyBhcmUgcHJlc2VudFxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJ1blNhbXBsZVBhdGllbnRzVGVzdChwYWdlOiBQYWdlKSB7XG4gICAgYXdhaXQgcGFnZS5zZXRWaWV3cG9ydFNpemUoe3dpZHRoOiAxOTIwLCBoZWlnaHQ6IDEwODB9KTtcblxuICAgIGF3YWl0IGxvZ2luT3Blbm1ycyhwYWdlKTtcblxuICAgIGF3YWl0IHBhZ2UuZ2V0QnlUZXN0SWQoJ3NlYXJjaFBhdGllbnRJY29uJykuY2xpY2soKTtcbiAgICBhd2FpdCBwYWdlLmdldEJ5VGVzdElkKCdwYXRpZW50U2VhcmNoQmFyJykuY2xpY2soKTtcbiAgICBhd2FpdCBwYWdlLmdldEJ5VGVzdElkKCdwYXRpZW50U2VhcmNoQmFyJykuZmlsbCgnRGV2YW4nKTtcbiAgICBhd2FpdCBleHBlY3QocGFnZS5nZXRCeVJvbGUoJ2xpbmsnLCB7IG5hbWU6ICdEZXZhbiBNb2RpIE1hbGUgNjUgeXJzIFx1MDBCNyAwMS0nIH0pKS50b0JlVmlzaWJsZSgpO1xuICAgIGF3YWl0IHBhZ2UuZ2V0QnlUZXN0SWQoJ3BhdGllbnRTZWFyY2hCYXInKS5jbGljaygpO1xuICAgIGF3YWl0IHBhZ2UuZ2V0QnlUZXN0SWQoJ3BhdGllbnRTZWFyY2hCYXInKS5maWxsKCdGbG8nKTtcbiAgICBhd2FpdCBleHBlY3QocGFnZS5nZXRCeVJvbGUoJ2xpbmsnLCB7IG5hbWU6ICdGbG9yZW5jaWEgS2xpbmdlciBGZW1hbGUgNjUnIH0pKS50b0JlVmlzaWJsZSgpO1xuICAgIGF3YWl0IHBhZ2UuZ2V0QnlUZXN0SWQoJ3BhdGllbnRTZWFyY2hCYXInKS5jbGljaygpO1xuICAgIGF3YWl0IHBhZ2UuZ2V0QnlUZXN0SWQoJ3BhdGllbnRTZWFyY2hCYXInKS5maWxsKCdEYWknKTtcbiAgICBhd2FpdCBleHBlY3QocGFnZS5nZXRCeVJvbGUoJ2xpbmsnLCB7IG5hbWU6ICdEYWljaGkgT2thZGEgTWFsZSA1NiB5cnMgXHUwMEI3IDAxJyB9KSkudG9CZVZpc2libGUoKTtcbiAgICBhd2FpdCBwYWdlLmdldEJ5VGVzdElkKCdwYXRpZW50U2VhcmNoQmFyJykuY2xpY2soKTtcbiAgICBhd2FpdCBwYWdlLmdldEJ5VGVzdElkKCdwYXRpZW50U2VhcmNoQmFyJykuZmlsbCgnTGVvbicpO1xuICAgIGF3YWl0IGV4cGVjdChwYWdlLmdldEJ5Um9sZSgnbGluaycsIHsgbmFtZTogJ0xlb24gV2FnbmVyIE1hbGUgNyBkYXlzIFx1MDBCNyAyMC0nIH0pKS50b0JlVmlzaWJsZSgpO1xuICAgIGF3YWl0IHBhZ2UuZ2V0QnlUZXN0SWQoJ3BhdGllbnRTZWFyY2hCYXInKS5jbGljaygpO1xuICAgIGF3YWl0IHBhZ2UuZ2V0QnlUZXN0SWQoJ3BhdGllbnRTZWFyY2hCYXInKS5maWxsKCdEYW5pZWwnKTtcbiAgICBhd2FpdCBleHBlY3QocGFnZS5nZXRCeVJvbGUoJ2xpbmsnLCB7IG5hbWU6ICdEYW5pZWwgQWNvc3RhIE1hbGUgNzIgeXJzIFx1MDBCNycgfSkpLnRvQmVWaXNpYmxlKCk7XG59XG4iLCAiaW1wb3J0IHtleHBlY3QsIFBhZ2V9IGZyb20gJ0BwbGF5d3JpZ2h0L3Rlc3QnO1xuaW1wb3J0IHtsb2dpbk9wZW5tcnN9IGZyb20gXCIuL3V0aWxzXCI7XG5cblxuLy8gVmFsaWRhdGUgaWYgU2FtcGxlIFBhdGllbnRzIGNvbnRhaW4gcmVzdWx0c1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJ1blNhbXBsZVBhdGllbnRzUmVzdWx0Vmlld2VyVGVzdChwYWdlOiBQYWdlKSB7XG4gICAgYXdhaXQgcGFnZS5zZXRWaWV3cG9ydFNpemUoe3dpZHRoOiAxOTIwLCBoZWlnaHQ6IDEwODB9KTtcblxuICAgIGF3YWl0IGxvZ2luT3Blbm1ycyhwYWdlKTtcblxuICAgIGF3YWl0IHBhZ2UuZ2V0QnlUZXN0SWQoJ3NlYXJjaFBhdGllbnRJY29uJykuY2xpY2soKTtcbiAgICBhd2FpdCBwYWdlLmdldEJ5VGVzdElkKCdwYXRpZW50U2VhcmNoQmFyJykuY2xpY2soKTtcbiAgICBhd2FpdCBwYWdlLmdldEJ5VGVzdElkKCdwYXRpZW50U2VhcmNoQmFyJykuZmlsbCgnRGV2Jyk7XG4gICAgYXdhaXQgZXhwZWN0KHBhZ2UuZ2V0QnlSb2xlKCdsaW5rJywge25hbWU6ICdEZXZhbiBNb2RpIE1hbGUgNjUgeXJzIFx1MDBCNyAwMS0nfSkpLnRvQmVWaXNpYmxlKCk7XG4gICAgYXdhaXQgcGFnZS5nZXRCeVJvbGUoJ2xpbmsnLCB7bmFtZTogJ0RldmFuIE1vZGkgTWFsZSA2NSB5cnMgXHUwMEI3IDAxLSd9KS5jbGljaygpO1xuICAgIGF3YWl0IGV4cGVjdChwYWdlLmdldEJ5Um9sZSgnbGluaycsIHtuYW1lOiAnUmVzdWx0cyd9KSkudG9CZVZpc2libGUoKTtcbiAgICBhd2FpdCBwYWdlLmdldEJ5Um9sZSgnbGluaycsIHtuYW1lOiAnUmVzdWx0cyd9KS5jbGljaygpO1xuICAgIGF3YWl0IGV4cGVjdChwYWdlLmdldEJ5Um9sZSgndGFiJywge25hbWU6ICdPdmVyIHRpbWUnfSkpLnRvQmVWaXNpYmxlKCk7XG4gICAgYXdhaXQgcGFnZS5nZXRCeVJvbGUoJ3RhYicsIHsgbmFtZTogJ092ZXIgdGltZScgfSkuY2xpY2soKTtcbiAgICBhd2FpdCBleHBlY3QocGFnZS5nZXRCeVRleHQoJ0NUIGhlYWQgKHdpdGhvdXQgY29udHJhc3QpJykubnRoKDEpKS50b0JlVmlzaWJsZSgpO1xuICAgIGF3YWl0IGV4cGVjdChwYWdlLmdldEJ5VGV4dCgnSGFlbW9nbG9iaW4nKS5udGgoMikpLnRvQmVWaXNpYmxlKCk7XG4gICAgYXdhaXQgZXhwZWN0KHBhZ2UuZ2V0QnlUZXh0KCdTZXJ1bSBzb2RpdW0nKS5udGgoMikpLnRvQmVWaXNpYmxlKCk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUEscUNBQUFBLFVBQUFDLFNBQUE7QUFBQSxJQUFBQSxRQUFBO0FBQUEsTUFDRSxNQUFRO0FBQUEsTUFDUixTQUFXO0FBQUEsTUFDWCxhQUFlO0FBQUEsTUFDZixNQUFRO0FBQUEsTUFDUixPQUFTO0FBQUEsTUFDVCxTQUFXO0FBQUEsUUFDVCxLQUFLO0FBQUEsVUFDSCxPQUFTO0FBQUEsVUFDVCxTQUFXO0FBQUEsVUFDWCxTQUFXO0FBQUEsUUFDYjtBQUFBLFFBQ0EsWUFBWTtBQUFBLFFBQ1osZUFBZTtBQUFBLFFBQ2YscUJBQXFCO0FBQUEsUUFDckIsd0JBQXdCO0FBQUEsUUFDeEIscUJBQXFCO0FBQUEsUUFDckIsd0JBQXdCO0FBQUEsUUFDeEIsa0JBQWtCO0FBQUEsTUFDcEI7QUFBQSxNQUNBLFNBQVc7QUFBQSxRQUNULGFBQWE7QUFBQSxRQUNiLE1BQVE7QUFBQSxRQUNSLGVBQWU7QUFBQSxRQUNmLFNBQVc7QUFBQSxRQUNYLE1BQVE7QUFBQSxRQUNSLFlBQWM7QUFBQSxRQUNkLFNBQVc7QUFBQSxNQUNiO0FBQUEsTUFDQSxZQUFjO0FBQUEsUUFDWixNQUFRO0FBQUEsUUFDUixLQUFPO0FBQUEsTUFDVDtBQUFBLE1BQ0EsU0FBVztBQUFBLE1BQ1gsVUFBWTtBQUFBLFFBQ1Y7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsTUFDQSxnQkFBa0I7QUFBQSxNQUNsQixTQUFXO0FBQUEsTUFDWCxpQkFBbUI7QUFBQSxRQUNqQiw0QkFBNEI7QUFBQSxRQUM1QixlQUFlO0FBQUEsUUFDZixTQUFXO0FBQUEsUUFDWCxPQUFTO0FBQUEsUUFDVCxVQUFZO0FBQUEsUUFDWixxQkFBcUI7QUFBQSxRQUNyQixvQkFBb0I7QUFB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QSxRQUNWLFVBQVU7QUFBQSxVQUNOLE9BQU87QUFBQSxVQUNQLFFBQVE7QUFBQSxRQUNaO0FBQUEsUUFDQSxNQUFNLENBQUMsc0JBQXNCLG1CQUFtQjtBQUFBLE1BQ3BEO0FBQUEsTUFDQSxpQkFBaUI7QUFBQSxNQUNqQixpQkFBaUI7QUFBQSxJQUNyQjtBQUFBLEVBQ0o7QUFDSjtBQUVPLElBQU0sWUFBWTtBQUFBLEVBQ3JCO0FBQUEsSUFDSSxRQUFRO0FBQUEsSUFDUixNQUFNO0FBQUEsSUFDTixjQUFjO0FBQUEsRUFDbEI7QUFBQSxFQUNBO0FBQUEsSUFDSSxRQUFRO0FBQUEsSUFDUixNQUFNO0FBQUEsSUFDTixjQUFjO0FBQUEsRUFDbEI7QUFBQSxFQUNBO0FBQUEsSUFDSSxRQUFRO0FBQUEsSUFDUixNQUFNO0FBQUEsSUFDTixjQUFjO0FBQUEsRUFDbEI7QUFDSjsiLAogICJuYW1lcyI6IFsiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiY29uZmlnIiwgImNvbmZpZyIsICJiYXNlIiwgImltcG9ydF90ZXN0IiwgImltcG9ydF90ZXN0IiwgImltcG9ydF90ZXN0IiwgImNvbmZpZyJdCn0K
