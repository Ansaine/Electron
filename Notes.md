# Thoery
   - Electron uses process model - (main and renderer processes) and IPC to communicate between them

# Since electron version is 33, getting so many issues of imports
 -  The default behavior is to sandbox preload scripts for security reasons. So ES6 imports 
    are causing errors. Sandboxed scripts have limitations on the modules they can import

    solution - use commonjs for preload script. Also try 'sandbox: false,' in webPreferences

 - Context isolation