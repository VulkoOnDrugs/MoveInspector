# 🎬 MoveInspector  

MoveInspector is a **React** app that fetches and displays movie details (overview, genres, cast, etc.) using **The Movie Database (TMDb) API**.  

## 🚀 Features  

- 🔍 Search for movies by title  
- 📖 View movie overview and details  
- 🎭 See genres and cast  
- 🖼️ Display movie posters  

## 📦 Installation  

1. **Clone the repository**  
   ```bash
   git clone https://github.com/VulkoOnDrugs/MoveInspector.git
   cd MoveInspector
   ```

2. **Install dependencies**  
   ```bash
   npm install  
   ```

3. **Get a TMDb API Key**  
   - Sign up at [The Movie Database](https://www.themoviedb.org/)  
   - Create an API key from your [TMDb API Settings](https://www.themoviedb.org/settings/api)  
   - Copy your API key  

4. **Configure API Keys**  
   - Create a `.env` file in the project root and add:  
     ```env
     REACT_APP_API_KEY=your_api_key_here
     REACT_APP_BASE_URL=https://api.themoviedb.org/3
     ```  
   - **Note:** In React, environment variables must start with `REACT_APP_` to be accessible.  

## ▶️ Usage  

Start the development server:  
```bash
npm start  
```

Then, open the app in your browser and search for movies! 🎬  

## 📜 License  

This project is licensed under the MIT License.  

---

Enjoy using **MoveInspector**! 🚀  
