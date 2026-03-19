# Deployment to cPanel (Git Version Control)

If you are using the **cPanel Git Version Control** tool (as shown in your screenshot), follow these steps to make the **Deploy** button clickable and functional.

### 1. Fix the "Unclickable" Deploy Button

The button is disabled because of two reasons in your screenshot:

#### A. Missing `.cpanel.yml`
I have already created a `.cpanel.yml` file in your repository. This file tells cPanel where to move your files after they are pulled from the repository.

#### B. "Uncommitted changes exist"
This error happens if you (or the system) modified files directly on the server inside the repository folder. To fix this:
1.  Log in to your server via **SSH** (if available) or use the **Terminal** tool in cPanel.
2.  Navigate to your repository folder: `cd path/to/your/repo`
3.  Run this command to clear any local changes on the server:
    ```bash
    git reset --hard HEAD
    ```
4.  Refresh the cPanel Git page. The button should now be clickable.

---

### 2. How to Deploy a React App via Git

React apps (like this one) need to be **built** into static files before they can be served. cPanel's Git tool **does not** run `npm install` or `npm run build` automatically.

#### Option 1: Commit the `dist` folder (Easiest for Shared Hosting)
1.  Run `npm run build` on your local computer.
2.  Remove `dist` from your `.gitignore` file temporarily.
3.  Commit the `dist` folder to your repository.
4.  Push to your Git provider (GitHub/GitLab).
5.  In cPanel, click **Update from Remote**.
6.  Click **Deploy HEAD Commit**.
7.  Your site will now be live in `public_html`.

#### Option 2: Build on the Server (Advanced)
If your cPanel has **Node.js** and **SSH** access:
1.  Push your source code.
2.  In cPanel Terminal, run:
    ```bash
    npm install
    npm run build
    cp -R dist/* ~/public_html
    ```

---

### 3. Important: The `.htaccess` File
I have included a `.htaccess` file in the `public/` folder. When you build the app, it will be moved to the `dist/` folder. This file is **critical** for React apps on cPanel because it handles the "Page Refresh" (404) issue.
