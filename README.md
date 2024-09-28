# 📚 Reader: Local Deployment Edition

This is an adapted version of [Jina AI's Reader](https://github.com/jina-ai/reader) for local deployment using Docker. 

## 🎯 What it does

It converts any URL to an LLM-friendly input with `http://127.0.0.1:3000/https://google.com`. Get improved output for your agent and RAG systems at no cost. This tool helps you prepare web content for Large Language Models, making it easier to process and analyze online information.

## 🚀 Key Features

- 🏠 Runs locally using Docker
- 🔑 No API keys required - works out of the box!
- 🖼️ Saves screenshots locally instead of uploading to Google Cloud Storage
- 📥 Provides download URLs for saved screenshots
- 🌐 Converts web content to LLM-friendly formats

## ⚠️ Limitations

- 📄 Currently does not support parsing PDFs

## 🐳 Docker Deployment

### Option 1: Using the pre-built image

1. Pull the latest image:
   ```bash
   docker pull ghcr.io/intergalacticalvariable/reader:latest
   ```

2. Run the container:
   
   Replace `/path/to/local-storage` with the directory where you want to store screenshots.
   
   ```bash
   docker run -p 3000:3000 -v /path/to/local-storage:/app/local-storage ghcr.io/intergalacticalvariable/reader:latest
   ```


### Option 2: Building the image locally

1. Clone the repository:
   ```bash
   git clone https://github.com/intergalacticalvariable/reader.git
   cd reader
   ```

2. Build the Docker image:
   ```bash
   docker build -t reader .
   ```

3. Run the container:
   ```bash
   docker run -p 3000:3000 -v /path/to/local-storage:/app/local-storage reader
   ```

## 🖥️ Usage

Once the Docker container is running, you can use curl to make requests. Here are examples for different response types:

1. 📝 Markdown (bypasses readability processing):
   ```bash
   curl -H "X-Respond-With: markdown" http://127.0.0.1:3000/https://google.com
   ```

2. 🌐 HTML (returns documentElement.outerHTML):
   ```bash
   curl -H "X-Respond-With: html" http://127.0.0.1:3000/https://google.com
   ```

3. 📄 Text (returns document.body.innerText):
   ```bash
   curl -H "X-Respond-With: text" http://127.0.0.1:3000/https://google.com
   ```

4. 📸 Screenshot (returns the URL of the webpage's screenshot):
   ```bash
   curl -H "X-Respond-With: screenshot" http://127.0.0.1:3000/https://google.com
   ```

## 🙏 Acknowledgements

This project is based on the excellent work done by multiple contributors:

1. The original [Jina AI Reader project](https://github.com/jina-ai/reader), which provided the foundation for this tool.

2. [Harsh Gupta's adaptation](https://github.com/hargup/reader), which served as the immediate basis for this local deployment version.


## 📜 License

This project is licensed under Apache-2.0 same as the original Jina AI Reader project.
