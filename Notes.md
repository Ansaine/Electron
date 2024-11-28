# Thoery
   - Electron uses process model - (main and renderer processes) and IPC to communicate between them
   - How does preload scripts give more access to renderers? by sharing the global 'Window' interface.
# Prod 
   - Doesn't use context isolation, so contextBridge is not needed
   - Preload script is also not needed. Hence sandboxing is also not needed.

# Since electron version is 33, getting so many issues of imports
 -  The default behavior is to sandbox preload scripts for security reasons. So ES6 imports 
    are causing errors. Sandboxed scripts have limitations on the modules they can import

    solution - use commonjs for preload script. Also try 'sandbox: false,' in webPreferences

 -  Context isolation