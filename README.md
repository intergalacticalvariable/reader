# Reader Clone which is deployable locally!

- Jina.ai 's reader API helps get better output from LLMs by converting URLs to LLM-friendly input. Though the version hosted on github cannot really be used by 3rd parties as it depends on multiple internal packages. This repo is a clone of the reader API without any of the internal dependencies which you can run locally and self-host.


## Install and Setup

You will need the following tools to run the project:
- Node v18 (The build fails for Node version >18)
- Firebase CLI (`npm install -g firebase-tools`)

To set up the project:

1. Clone the repository:
   ```bash
   git clone git@github.com:hargup/reader.git
   ```

2. Navigate to the backend functions directory:
   ```bash
   cd reader/backend/functions
   ```

3. Install the npm dependencies:
   ```bash
   npm install
   ```

## Usage

To run the express service:

1. In the `backend/functions` directory, start the service using nodemon:
   ```bash
   npx nodemon --watch ./src --exec "npm run build && node build/server.js"
   ```

2. Once the service is running, you can use curl to make requests. For example:
   ```bash
   curl -H "X-Respond-With: markdown" http://localhost:3000/https://example.com
   ```

This will fetch the content from https://example.com and return it in markdown format.

You can customize the request by changing the `X-Respond-With` header to other supported formats like `html`, `text`, `screenshot`, or `pageshot`.

## Docker Deployment

You can deploy the Reader service using Docker in two ways: by building the image yourself or by pulling the pre-built image from GitHub Packages.

### Option 1: Using the pre-built image

1. Pull the latest image from GitHub Packages:
   ```bash
   docker pull ghcr.io/intergalacticalvariable/reader:latest
   ```

2. Run the Docker container:
   ```bash
   docker run -p 3000:3000 ghcr.io/intergalacticalvariable/reader:latest
   ```

   This command runs the container and maps port 3000 of the container to port 3000 on your host machine.

3. The service should now be accessible at `http://localhost:3000`.

### Option 2: Building the image yourself

If you prefer to build the image yourself or need to make modifications:

1. Clone the repository:
   ```bash
   git clone https://github.com/intergalacticalvariable/reader.git
   cd reader
   ```

2. Build the Docker image:
   ```bash
   docker build -t reader .
   ```

3. Run the Docker container:
   ```bash
   docker run -p 3000:3000 reader
   ```

4. The service should now be accessible at `http://localhost:3000`.

You can customize the Docker deployment by modifying the Dockerfile in the project root directory.

## Usage

Once the Docker container is running, you can use curl to make requests. For example:

```bash
curl -H "X-Respond-With: markdown" http://localhost:3000/https://example.com
```

This will fetch the content from https://example.com and return it in markdown format.

You can customize the request by changing the `X-Respond-With` header to other supported formats like `html`, `text`, `screenshot`, or `pageshot`.

---

# Reader

Your LLMs deserve better input.

## Table of Contents
- [Features](#features)
- [Install and Setup](#install-and-setup)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Updates](#updates)
- [Contributing](#contributing)
- [License](#license)

## Features

Reader does two things:
- **Read**: It converts any URL to an **LLM-friendly** input with `https://r.jina.ai/https://your.url`. Get improved output for your agent and RAG systems at no cost.
- **Search**: It searches the web for a given query with `https://s.jina.ai/your+query`. This allows your LLMs to access the latest world knowledge from the web.

Check out [the live demo](https://jina.ai/reader#demo)

Or just visit these URLs (**Read**) https://r.jina.ai/https://github.com/jina-ai/reader, (**Search**) https://s.jina.ai/Who%20will%20win%202024%20US%20presidential%20election%3F and see yourself.

> Feel free to use Reader API in production. It is free, stable and scalable. We are maintaining it actively as one of the core products of Jina AI. [Check out rate limit](https://jina.ai/reader#pricing)

<img width="973" alt="image" src="https://github.com/jina-ai/reader/assets/2041322/2067c7a2-c12e-4465-b107-9a16ca178d41">
<img width="973" alt="image" src="https://github.com/jina-ai/reader/assets/2041322/675ac203-f246-41c2-b094-76318240159f">




## Updates

- **2024-07-15**: To restrict the results of `s.jina.ai` to certain domain/website, you can set e.g. `site=jina.ai` in the query parameters, which enables in-site search. For more options, [try our updated live-demo](https://jina.ai/reader/#apiform).
- **2024-07-01**: We have resolved a DDoS attack and other traffic abusing since June 27th. We also found a bug introduced on June 28th which may cause higher latency for some websites. The attack and the bug have been solved; if you have experienced high latency of r.jina.ai between June 27th-30th, it should back to normal now.
- **2024-05-30**: Reader can now read abitrary PDF from any URL! Check out [this PDF result from NASA.gov](https://r.jina.ai/https://www.nasa.gov/wp-content/uploads/2023/01/55583main_vision_space_exploration2.pdf) vs [the original](https://www.nasa.gov/wp-content/uploads/2023/01/55583main_vision_space_exploration2.pdf).
- **2024-05-15**: We introduced a new endpoint `s.jina.ai` that searches on the web and return top-5 results, each in a LLM-friendly format. [Read more about this new feature here](https://jina.ai/news/jina-reader-for-search-grounding-to-improve-factuality-of-llms).
- **2024-05-08**: Image caption is off by default for better latency. To turn it on, set `x-with-generated-alt: true` in the request header.
- **2024-05-03**: We finally resolved a DDoS attack since April 29th. Now our API is much more reliable and scalable than ever!
- **2024-04-24**: You now have more fine-grained control over Reader API [using headers](#using-request-headers), e.g. forwarding cookies, using HTTP proxy.
- **2024-04-15**: Reader now supports image reading! It captions all images at the specified URL and adds `Image [idx]: [caption]` as an alt tag (if they initially lack one). This enables downstream LLMs to interact with the images in reasoning, summarizing etc. [See example here](https://x.com/JinaAI_/status/1780094402071023926).

## Usage

### Using `r.jina.ai` for single URL fetching
Simply prepend `https://r.jina.ai/` to any URL. For example, to convert the URL `https://en.wikipedia.org/wiki/Artificial_intelligence` to an LLM-friendly input, use the following URL:

[https://r.jina.ai/https://en.wikipedia.org/wiki/Artificial_intelligence](https://r.jina.ai/https://en.wikipedia.org/wiki/Artificial_intelligence)

### [Using `r.jina.ai` for a full website fetching (Google Colab)](https://colab.research.google.com/drive/1uoBy6_7BhxqpFQ45vuhgDDDGwstaCt4P#scrollTo=5LQjzJiT9ewT)

### Using `s.jina.ai` for web search
Simply prepend `https://s.jina.ai/` to your search query. Note that if you are using this in the code, make sure to encode your search query first, e.g. if your query is `Who will win 2024 US presidential election?` then your url should look like:

[https://s.jina.ai/Who%20will%20win%202024%20US%20presidential%20election%3F](https://s.jina.ai/Who%20will%20win%202024%20US%20presidential%20election%3F)

Behind the scenes, Reader searches the web, fetches the top 5 results, visits each URL, and applies `r.jina.ai` to it. This is different from many `web search function-calling` in agent/RAG frameworks, which often return only the title, URL, and description provided by the search engine API. If you want to read one result more deeply, you have to fetch the content yourself from that URL. With Reader, `http://s.jina.ai` automatically fetches the content from the top 5 search result URLs for you (reusing the tech stack behind `http://r.jina.ai`). This means you don't have to handle browser rendering, blocking, or any issues related to JavaScript and CSS yourself.

### Using `s.jina.ai` for in-site search
Simply specify `site` in the query parameters such as:

```bash
curl 'https://s.jina.ai/When%20was%20Jina%20AI%20founded%3F?site=jina.ai&site=github.com'
```

### [Interactive Code Snippet Builder](https://jina.ai/reader#apiform)

We highly recommend using the code builder to explore different parameter combinations of the Reader API.

<a href="https://jina.ai/reader#apiform"><img width="973" alt="image" src="https://github.com/jina-ai/reader/assets/2041322/a490fd3a-1c4c-4a3f-a95a-c481c2a8cc8f"></a>


### Using request headers

As you have already seen above, one can control the behavior of the Reader API using request headers. Here is a complete list of supported headers.

- You can enable the image caption feature via the `x-with-generated-alt: true` header.
- You can ask the Reader API to forward cookies settings via the `x-set-cookie` header.
  - Note that requests with cookies will not be cached.
- You can bypass `readability` filtering via the `x-respond-with` header, specifically:
  - `x-respond-with: markdown` returns markdown *without* going through `reability`
  - `x-respond-with: html` returns `documentElement.outerHTML`
  - `x-respond-with: text` returns `document.body.innerText`
  - `x-respond-with: screenshot` returns the URL of the webpage's screenshot
- You can specify a proxy server via the `x-proxy-url` header.
- You can customize cache tolerance via the `x-cache-tolerance` header (integer in seconds).
- You can bypass the cached page (lifetime 3600s) via the `x-no-cache: true` header (equivalent of `x-cache-tolerance: 0`).
- If you already know the HTML structure of your target page, you may specify `x-target-selector` or `x-wait-for-selector` to direct the Reader API to focus on a specific part of the page.
  - By setting `x-target-selector` header to a CSS selector, the Reader API return the content within the matched element, instead of the full HTML. Setting this header is useful when the automatic content extraction fails to capture the desired content and you can manually select the correct target.
  - By setting `x-wait-for-selector` header to a CSS selector, the Reader API will wait until the matched element is rendered before returning the content. If you already specified `x-wait-for-selector`, this header can be omitted if you plan to wait for the same element.

### Using `r.jina.ai` for single page application (SPA) fetching
Many websites nowadays rely on JavaScript frameworks and client-side rendering. Usually known as Single Page Application (SPA). Thanks to [Puppeteer](https://github.com/puppeteer/puppeteer) and headless Chrome browser, Reader natively supports fetching these websites. However, due to specific approach some SPA are developed, there may be some extra precautions to take. 

#### SPAs with hash-based routing
By definition of the web standards, content come after `#` in a URL is not sent to the server. To mitigate this issue, use `POST` method with `url` parameter in body.

```bash
curl -X POST 'https://r.jina.ai/' -d 'url=https://example.com/#/route' 
```

#### SPAs with preloading contents
Some SPAs, or even some websites that are not strictly SPAs, may show preload contents before later loading the main content dynamically. In this case, Reader may be capturing the preload content instead of the main content. To mitigate this issue, here are some possible solutions:

##### Specifying `x-timeout` 
When timeout is explicitly specified, Reader will not attempt to return early and will wait for network idle until the timeout is reached. This is useful when the target website will eventually come to a network idle. 

```bash
curl 'https://example.com/' -H 'x-timeout: 30'
```

##### Specifying `x-wait-for-selector` 
When wait-for-selector is explicitly specified, Reader will wait for the appearance of the specified CSS selector until timeout is reached. This is useful when you know exactly what element to wait for. 

```bash
curl 'https://example.com/' -H 'x-wait-for-selector: #content'
```

### Streaming mode

Streaming mode is useful when you find that the standard mode provides an incomplete result. This is because the Reader will wait a bit longer until the page is *stablely* rendered. Use the accept-header to toggle the streaming mode:

```bash
curl -H "Accept: text/event-stream" https://r.jina.ai/https://en.m.wikipedia.org/wiki/Main_Page
```

The data comes in a stream; each subsequent chunk contains more complete information. **The last chunk should provide the most complete and final result.** If you come from LLMs, please note that it is a different behavior than the LLMs' text-generation streaming.

For example, compare these two curl commands below. You can see streaming one gives you complete information at last, whereas standard mode does not. This is because the content loading on this particular site is triggered by some js *after* the page is fully loaded, and standard mode returns the page "too soon".
```bash
curl -H 'x-no-cache: true' https://access.redhat.com/security/cve/CVE-2023-45853
curl -H "Accept: text/event-stream" -H 'x-no-cache: true' https://r.jina.ai/https://access.redhat.com/security/cve/CVE-2023-45853
```

> Note: `-H 'x-no-cache: true'` is used only for demonstration purposes to bypass the cache.

Streaming mode is also useful if your downstream LLM/agent system requires immediate content delivery or needs to process data in chunks to interleave I/O and LLM processing times. This allows for quicker access and more efficient data handling:

```text
Reader API:  streamContent1 ----> streamContent2 ----> streamContent3 ---> ... 
                          |                    |                     |
                          v                    |                     |
Your LLM:                 LLM(streamContent1)  |                     |
                                               v                     |
                                               LLM(streamContent2)   |
                                                                     v
                                                                     LLM(streamContent3)
```

Note that in terms of completeness: `... > streamContent3 > streamContent2 > streamContent1`, each subsequent chunk contains more complete information.

### JSON mode

This is still very early and the result is not really a "useful" JSON. It contains three fields `url`, `title` and `content` only. Nonetheless, you can use accept-header to control the output format:
```bash
curl -H "Accept: application/json" https://r.jina.ai/https://en.m.wikipedia.org/wiki/Main_Page
```

JSON mode is probably more useful in `s.jina.ai` than `r.jina.ai`. For `s.jina.ai` with JSON mode, it returns 5 results in a list, each in the structure of `{'title', 'content', 'url'}`.

### Generated alt

All images in that page that lack `alt` tag can be auto-captioned by a VLM (vision langauge model) and formatted as `!(Image [idx]: [VLM_caption])[img_URL]`. This should give your downstream text-only LLM *just enough* hints to include those images into reasoning, selecting, and summarization. Use the x-with-generated-alt header to toggle the streaming mode:

```bash
curl -H "X-With-Generated-Alt: true" https://r.jina.ai/https://en.m.wikipedia.org/wiki/Main_Page
```


## Contributing
We welcome contributions to Reader! Please see our [Contributing Guidelines](CONTRIBUTING.md) for more details on how to get started.

## License
This project is licensed under the [MIT License](LICENSE).