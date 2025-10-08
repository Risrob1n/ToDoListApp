# ToDoListApp
# TODO List Application

A simple TODO list application built with a .NET 8 Web API backend and an Angular 17 frontend.

## Tech Stack

-   **Backend:** .NET 8 Web API
-   **Frontend:** Angular 20 (Standalone Components)
-   **Database:** In-memory data storage (no database required)

---

## Prerequisites

Before you begin, you will need to have the following installed on your system:

-   [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0) (or newer)
-   [Node.js](https://nodejs.org/en) (v20.x LTS recommended)
-   [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)

---

## How to Run the Application

Follow these steps in order. It is recommended to use two separate terminal windows.

### 1. Run the Backend (.NET API)

The backend server must be running before you start the frontend.

```bash
# 1. Navigate to the API project folder
cd TodoApi

# 2. Restore the Nuget packages
dotnet restore

# 3. IMPORTANT: Trust the local HTTPS development certificate
# This one-time command is required to prevent SSL errors in the browser.
# You may be prompted to accept a security warning.
dotnet dev-certs https --trust

# 4. Run the API server
dotnet run
```

The API will now be running. The terminal will show the listening URL, typically `http://localhost:5193` (This may vary for your local system as the port number may vary, please note the port number).

### 2. Run the Frontend (Angular App)

In a **new terminal window**:

```bash
# 1. Navigate to the frontend project folder
cd todo-frontend

# 2. Install the npm packages
npm install

# 3. Run the Angular development server
ng serve
```

The frontend application will now be running. Open your browser and navigate to **http://localhost:4200**.

---

## Troubleshooting

### Port Conflict or API Connection Issues

If the .NET backend starts on a different port than `5193`, the frontend will not be able to connect to it.

1.  **Check the backend terminal output** to see which HTTP port it is using (e.g., ` Now listening on: http://localhost:5193 http://localhost:XXXX`).
2.  **Update the frontend configuration:** Open the file `todo-frontend\src\app\services\todo.service.ts` line 16 and change the `apiUrl` to match the correct port number(eg 5193). 
3.  Restart the Angular server (`ng serve`).````

---