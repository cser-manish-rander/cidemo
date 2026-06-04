# GitHub Secrets Demonstration

This is a bare-minimum repository designed to illustrate how **GitHub Secrets** work, how to access them inside GitHub Actions, and how GitHub automatically masks secret values in log outputs to prevent exposure.

---

## How it Works

The GitHub Actions workflow defined in [.github/workflows/demo.yml](.github/workflows/demo.yml) runs whenever you:
1. Push changes to the `main` branch.
2. Manually trigger the workflow using the **Workflow Dispatch** button in the Actions tab.

When the workflow runs, it attempts to load `MY_SECRET_TOKEN` from your repository's GitHub Secrets. It then:
- Validates whether the secret is set.
- Prints the value to demonstrate GitHub's **automatic log masking** (which replaces the secret with `***`).
- Prints the number of characters in the secret to prove it was successfully injected.

---

## Step-by-Step Guide

### 1. Store the Secret in GitHub
To make this workflow succeed, you must add `MY_SECRET_TOKEN` to your GitHub repository secrets:

1. Go to your repository page on GitHub.
2. Click on the **Settings** tab.
3. In the left sidebar, expand **Secrets and variables** and click on **Actions**.
4. Click on the **New repository secret** button.
5. Set the **Name** to:
   ```text
   MY_SECRET_TOKEN
   ```
6. Set the **Value** to any text (e.g., `SuperSecret123!`).
7. Click **Add secret**.

### 2. Push this project to your GitHub Repo
If you haven't initialized and pushed the code yet, run these commands in your local workspace:

```bash
git init
git add .
git commit -m "Initialize secrets demo project"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

### 3. Run and Verify the Action
Once the code is on GitHub and the secret is configured:

1. Click on the **Actions** tab on your GitHub repository page.
2. Select the **GitHub Secrets Demo** workflow in the left sidebar.
3. Click the **Run workflow** dropdown on the right side and click the green **Run workflow** button.
4. Wait a few seconds for the run to start, then click on the active run.
5. Click on the **demonstrate-secrets** job to view the logs.
6. Expand the **Verify and print secret** step. You will see:
   - `✅ SUCCESS: MY_SECRET_TOKEN is detected!`
   - `GitHub masked value: ***` (proving GitHub's masking works!)
   - `The length of the secret is: <X> characters.`
