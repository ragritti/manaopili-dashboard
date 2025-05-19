import chromium from "@sparticuz/chromium";
import puppeteerCore from "puppeteer-core";
import puppeteer from "puppeteer";

export const dynamic = "force-dynamic";

// Define the Chromium executable path for serverless environments
const CHROME_EXECUTABLE_PATH = await chromium.executablePath();
  // process.env.CHROME_EXECUTABLE_PATH || 
  // "https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar";

// Singleton browser instance
let browser;

/**
 * Get or create a browser instance
 * @returns {Promise<Browser>}
 */
async function getBrowser() {
  if (browser) return browser;

  try {
    if (process.env.NEXT_PUBLIC_VERCEL_ENVIRONMENT === "production") {
      // In production (serverless) environment
      browser = await puppeteerCore.launch({
        args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(CHROME_EXECUTABLE_PATH),
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
      });
    } else {
      // In development environment
      browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        headless: true,
      });
    }
    return browser;
  } catch (error) {
    console.error("Failed to launch browser:", error);
    throw error;
  }
}

/**
 * Check if a URL returns a 200 status code
 * @param {string} url - URL to check
 * @returns {Promise<boolean>} - True if page returns 200, false otherwise
 */
async function checkPageStatus(url) {
  let statusCode;
  let page;
  
  try {
    const browser = await getBrowser();
    page = await browser.newPage();
    
    // Set a reasonable timeout
    const response = await page.goto(url, { 
      waitUntil: "domcontentloaded",
      timeout: 15000 // 15 seconds timeout
    });
    
    statusCode = response && response.status() ? response.status() : 404;
  } catch (error) {
    console.error(`Error accessing page ${url}:`, error);
    statusCode = 404;
  } finally {
    // Make sure to close the page to avoid memory leaks
    if (page) {
      try {
        await page.close();
      } catch (error) {
        console.error("Error closing page:", error);
      }
    }
  }
  
  return statusCode === 200;
}

/**
 * API Route handler
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  
  if (!url) {
    return new Response(
      JSON.stringify({ error: "URL parameter is required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  
  try {
    const status = await checkPageStatus(url);
    
    return new Response(
      JSON.stringify({
        statusCode: status ? 200 : 404,
        is200: status,
        url: url,
      }),
      {
        status: 200, // Always return HTTP 200 from the API itself
        headers: { 
          "Content-Type": "application/json",
          "Cache-Control": "no-store, max-age=0"
        },
      }
    );
  } catch (error) {
    console.error("API error:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Failed to check URL status: " + error.message,
        statusCode: 500,
        is200: false,
        url: url
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}