# Static Portfolio

A portfolio website built with [Jekyll](https://jekyllrb.com/).

## Prerequisites

Before you begin, ensure you have the following installed:

- [Ruby](https://www.ruby-lang.org/en/downloads/) (version 2.5.0 or higher)
- [Bundler](https://bundler.io/) (`gem install bundler`)

## Local Development

1.  **Install Dependencies**

    Navigate to the project directory and install the required gems:

    ```bash
    bundle install
    ```

2.  **Run the Server**

    Start the local development server:

    ```bash
    bundle exec jekyll serve
    ```

    **Shortcut (WSL/Linux):**
    If you don't want to type long flags, use the included script:

    ```bash
    ./run.sh
    ```

    The site will be available at `http://localhost:4000/portfolio/`.

    > **Note:** If you change `_config.yml`, you must restart the server for changes to take effect.

## Deployment

### GitHub Pages

This site is configured to be easily deployed to [GitHub Pages](https://pages.github.com/).

1.  Push your changes to the repository on GitHub.
2.  Go to **Settings** > **Pages** in your repository.
3.  Select the branch (usually `main` or `master`) and folder (usually `/ (root)`) to deploy from.
4.  Your site will be live at `https://<username>.github.io/portfolio/`.

### Manual Build

To build the site for production (generates static files in `_site` folder):

```bash
bundle exec jekyll build
```
