/**
 * Since ILST 25.3 (AUG 2021) new CORS updates for Chromium 88 are implemented in CEP. One byproduct of this is that iframes can no longer receive evalScript return values or access parent document contents, so the DEVELOPER context within bombino templates must be altered to use window.postMessage event chain in order to invoke evalScript and return values correctly.
 *
 * This particular file is specifically meant to work in tandem with Inventsable/workaround and the evalScript() method contained within.
 * If you find a bug, please report it to Inventsable/bombino (unless isolated to this particular template in which case feel free to issue one here)
 */
const DEBUG = false; // If you have multiple depths of iframes, setting DEBUG to true and tracing the event chain may help us debug.

/**
 * We don't need an event chain for PRODUCTION context. This code is specifically meant to assist DEVELOPER since we embed our localhost port via iframe within index-dev.html
 */
const CSI = new CSInterface();
if (DEBUG) {
  console.log("Booting runs now");
  console.log(window.location);
  console.log(window.location.origin);
}

/**
 * Global window listener should catch any children messages propagating upwards, then pass to a global evalScript
 */
window.addEventListener("message", (msg) => {
  if (DEBUG) {
    console.log("Outer shell receives message");
    console.log(msg);
  }
  if (msg.data && msg.data.evalScript) {
    evalScript(msg.data.evalScript).then((result) => {
      if (DEBUG) {
        console.log("RESULT:");
        console.log(result);
        console.log(msg.origin);
      }
      /**
       * This document should be barebones if index-dev.html has not been altered, so querying an iframe should be trivial
       */
      let target = document.querySelector("iframe");
      if (target && target.contentWindow) {
        // We then post a message back to the child with the result
        target.contentWindow.postMessage(
          {
            evalScriptResult: result,
          },
          msg.origin
        );
      } else {
        console.error("Could not find iframe");
      }
    });
  }
});

// Nearly identical to the vanilla evalScript from brutalism and cluecumber here, but using the full reference to host instead of CEP-Spy
async function evalScript(text, defs = {}) {
  if (window.__adobe_cep__) {
    return new Promise((resolve, reject) => {
      CSI.evalScript(`${text}`, (res) => {
        // For some reason this was returning errors in InDesign alone. No idea why
        if (
          /idsn/i.test(
            JSON.parse(window.__adobe_cep__.getHostEnvironment()).appName
          )
        ) {
          resolve(res);
        } else {
          resolve(this.isJson(res) ? JSON.parse(res) : res);
        }
      });
    });
  } else {
    console.error("evalScript() attempting to return at wrong depth");
    return null;
  }
}

// Automatic JSON parsing on certain host apps
function isJson(text) {
  try {
    JSON.parse(text);
    return true;
  } catch (err) {
    return false;
  }
}
