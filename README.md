# ChatWrapped 💬
### Your Chats, Turned Into Stories.

ChatWrapped is a privacy-first chat analyzer that transforms your exported WhatsApp conversations into a beautiful, "Spotify Wrapped" style visual story. Discover your top friends, busiest hours, and "ghost" stats without ever compromising your data.

---

## 📊 What You'll Discover
* 🏆 **Leaderboard:** See who your most frequent contacts are.
* 📅 **Peak Hours:** Visualize your most active times of day and week.
* 👻 **Ghost Mode:** Insights into response times and chat lulls.
* 📈 **Message Trends:** See how your conversations have evolved over time.

---

## 🛠️ Tech Stack
This project is built using modern web technologies focused on speed and client-side security:

* **Framework:** [React.js](https://reactjs.org/) / [Next.js](https://nextjs.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Animations:** [Framer Motion](https://www.framer.com/motion/)
* **Parsing:** Custom JavaScript Regex-based parser for WhatsApp's `.txt` format.

---

## 💻 Local Development

If you want to run ChatWrapped locally or audit the code, follow these steps:

### Prerequisites
* Node.js (v18 or higher)
* npm or yarn

### Setup
1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/DhananjayBhosale/ChatWrapped.git](https://github.com/DhananjayBhosale/ChatWrapped.git)
    cd ChatWrapped
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```

---

## 🚀 How to Use
1.  **Export Chat:** WhatsApp Settings > Chat > Export Chat > **"Without Media"**.
2.  **Save File:** Save the `.txt` or `.zip` file to your device.
3.  **Drop & View:** Drag and drop the file into ChatWrapped to generate your story instantly.

---

## ❓ FAQ
* **Is my WhatsApp chat uploaded anywhere?** No. The processing happens entirely in your browser's memory.
* **Do I need to be online?** Only to load the initial website. The analysis logic works 100% offline.
* **Is this an official WhatsApp product?** No, this is an independent project and is not affiliated with WhatsApp or Meta.

---

## 🤝 Credits
This project was made possible thanks to:
* **Original Author:** [Dhananjay Bhosale (Dhananjay_tech)](https://github.com/DhananjayBhosale/ChatWrapped)
* **Contributor:** Made with ❤️ by Suman Dey

---

## 📄 License

MIT License

Copyright (c) 2025 Dhananjay Bhosale & Suman Dey

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
